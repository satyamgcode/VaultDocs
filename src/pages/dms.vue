<template>
  <div class="all-wrapper">
    <h1 class="title">Document Management System</h1>
    <div class="inside-wrapper">
      <FileToolbar
        :searchModel="search"
        @search="onSearch"
        @new-folder="openNewFolder"
        @upload="openUpload"
      />

      <div class="breadcrumbs">
        <span v-for="(b, i) in breadcrumbs" :key="b.id">
          <span @click="goToCrumb(b)">{{ b.name }}</span>
          <span v-if="i < breadcrumbs.length - 1"> / </span>
        </span>
      </div>

      <div
        style="display:flex; gap:12px; align-items:center; margin-bottom:8px;"
      >
        <label class="small">View:</label>
        <button class="button" @click="view='list'">List</button>
        <button class="button" @click="view='grid'">Grid</button>

        <label class="small" style="margin-left:12px">Filter by Type:</label>
        <select v-model="filters.type" class="input" style="width:140px">
          <option value="">All</option>
          <option value="folder">Folders</option>
          <option value="file">Files</option>
        </select>

        <!-- <label class="small">Checked Out:</label> -->
        <!-- <select v-model="filters.checkedOut" class="input" style="width:120px">
          <option value="">All</option>
          <option value="true">Checked Out</option>
          <option value="false">Available</option>
        </select> -->
      </div>

      <FileView
        class="file_view"
        :files="pagedFiles"
        :viewMode="view"
        :sort="sort"
        @open-folder="openFolder"
        @select="selectItem"
        @checkout="checkout"
        @checkin="checkin"
        @delete="remove"
        @rename="rename"
        @download="download"
        @sort-change="changeSort"
      />

      <div style="margin-top:10px; display:flex; gap:8px; align-items:center;">
        <div>Showing {{ filteredFiles.length }} items</div>
        <div style="flex:1"></div>
        <div>
          <button class="button" :disabled="page===1" @click="page--">
            Prev
          </button>
          <span style="margin:0 8px">Page {{ page }}</span>
          <button
            class="button"
            :disabled="page * pageSize >= filteredFiles.length"
            @click="page++"
          >
            Next
          </button>
        </div>
      </div>

      <!-- DetailsPane Modal -->
      <div v-if="selectedItem">
        <div class="overlay" @click="selectedItem = null"></div>
        <div class="modal">
          <DetailsPane
            :item="selectedItem"
            @add-note="addNote"
            @view-history="openHistory"
          />
        </div>
      </div>

      <!-- History Modal -->
      <VersionHistoryModal
        v-if="historyItem"
        :item="historyItem"
        @close="historyItem=null"
        @revert="revertTo"
      />

      <!-- Check-in Modal -->
      <div v-if="checkinItem">
        <div class="overlay" @click="checkinItem=null"></div>
        <div class="modal">
          <CheckInModal
            :item="checkinItem"
            @close="checkinItem=null"
            @submit="performCheckIn"
          />
        </div>
      </div>

      <!-- Upload Modal -->
      <UploadModal
        v-if="showUpload"
        :parentId="currentFolderId"
        @close="showUpload=false"
        @uploaded="refresh"
      />

      <DeleteModal
  v-if="deleteItem"
  :item="deleteItem"
  @close="deleteItem=null"
  @confirm="confirmDelete"
/>

<RenameModal
  v-if="renameItem"
  :item="renameItem"
  @close="renameItem=null"
  @confirm="confirmRename"
/>

<DownloadModal
  v-if="downloadItem"
  :item="downloadItem"
  @close="downloadItem=null"
  @confirm="confirmDownload"
/>

<CheckoutModal
  v-if="checkoutItem"
  :item="checkoutItem"
  :defaultUser="checkoutUser"
  @close="checkoutItem=null"
  @confirm="confirmCheckout"
/>


      <!-- New Folder Modal -->
      <div v-if="showNewFolder" class="overlay" @click="showNewFolder=false"></div>
      <div v-if="showNewFolder" class="modal clickFolderModal">
        <h3>Create Folder</h3>
        <input class="input CreateFolder" v-model="newFolderName" placeholder="Folder name" />
        <div style="margin-top:8px" class="actions">
          <button class="button" @click="showNewFolder=false">Cancel</button>
          <button class="button primary" @click="createFolder">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from './api'
import FileToolbar from '../components/dms/FileToolbar.vue'
import FileView from '../components/dms/FileView.vue'
import DetailsPane from '../components/dms/DetailPane.vue'
import VersionHistoryModal from '../components/dms/VersionHistoryModal.vue'
import CheckInModal from '../components/dms/CheckInModal.vue'
import UploadModal from '../components/dms/UploadModal.vue'
import DeleteModal from '../components/dms/DeleteModal.vue'
import RenameModal from '../components/dms/RenameModal.vue'
import DownloadModal from '../components/dms/DownloadModal.vue'
import CheckoutModal from '../components/dms/CheckoutModal.vue'


const files = ref([])
const search = ref('')
const view = ref('list')
const sort = ref({ by: 'name', dir: 'asc' })
const filters = ref({ type: '', checkedOut: '' })
const page = ref(1)
const pageSize = 10

const deleteItem = ref(null)
const renameItem = ref(null)
const downloadItem = ref(null)
const checkoutItem = ref(null)
const checkoutUser = ref('me@example.com') // default user for checkout modal


const selectedItem = ref(null)
const historyItem = ref(null)
const checkinItem = ref(null)
const showUpload = ref(false)
const showNewFolder = ref(false)
const newFolderName = ref('')
const currentFolderId = ref(null) // null means root

async function refresh() {
  const res = await api.getFiles()
  files.value = res.data
  buildBreadcrumbs()
}
onMounted(refresh)

function pathFor(item) {
  return `/files?parentId=${
    item && item.parentId !== undefined ? item.parentId : ''
  }`
}

const filteredFiles = computed(() => {
  const q = search.value.trim().toLowerCase()
  let f = files.value.filter((x) => x.parentId === currentFolderId.value)
  if (filters.value.type) f = f.filter((x) => x.type === filters.value.type)
  if (filters.value.checkedOut === 'true')
    f = f.filter((x) => !!x.checkedOutBy)
  if (filters.value.checkedOut === 'false')
    f = f.filter((x) => !x.checkedOutBy)
  if (q) {
    f = f.filter((x) => {
      const tags = (x.metadata?.tags || '').toLowerCase()
      const author = (x.createdBy || '').toLowerCase()
      return (
        x.name.toLowerCase().includes(q) ||
        tags.includes(q) ||
        author.includes(q)
      )
    })
  }
  // folders first
  f.sort((a, b) => {
    if (a.type === b.type) {
      const v = (a[sort.value.by] || '')
        .toString()
        .localeCompare((b[sort.value.by] || '').toString(), undefined, {
          numeric: true
        })
      return sort.value.dir === 'asc' ? v : -v
    }
    return a.type === 'folder' ? -1 : 1
  })
  return f
})

const pagedFiles = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredFiles.value.slice(start, start + pageSize)
})

function onSearch(q) {
  search.value = q
  page.value = 1
}

function openFolder(item) {
  if (item.type === 'folder') {
    currentFolderId.value = item.id
    selectedItem.value = null
    buildBreadcrumbs()
  } else {
    selectedItem.value = item
  }
}

function buildBreadcrumbs() {
  const crumbs = []
  let id = currentFolderId.value
  while (id !== null) {
    const f = files.value.find((x) => x.id === id)
    if (!f) break
    crumbs.unshift({ id: f.id, name: f.name })
    id = f.parentId
  }
  crumbs.unshift({ id: null, name: 'Root' })
  breadcrumbs.value = crumbs
}
const breadcrumbs = ref([{ id: null, name: 'Root' }])
function goToCrumb(crumb) {
  currentFolderId.value = crumb.id
  selectedItem.value = null
  buildBreadcrumbs()
}

function selectItem(item) {
  selectedItem.value = item
}

function checkin(item) {
  if (!item.checkedOutBy) {
    alert('Not checked out')
    return
  }
  checkinItem.value = item
}

async function performCheckIn({ itemId, summary }) {
  const item = files.value.find((x) => x.id === itemId)
  if (!item) return
  const versions = item.versions || []
  const newNote = {
    note: summary,
    note_at: new Date().toISOString(),
    note_id: versions.length + 1,
    uploadedBy: item.checkedOutBy || 'unknown',
    versionId: versions.length + 1
  }
  await api.patchFile(itemId, {
    checkedOutBy: null,
    versions: [...versions, newNote]
  })
  checkinItem.value = null
  await refresh()
}

async function addNote(item, noteText) {
  const itemRef = files.value.find((x) => x.id === item.id)
  const versions = itemRef.versions || []
  const newNote = {
    note: noteText,
    note_at: new Date().toISOString(),
    note_id: versions.length + 1,
    uploadedBy: 'me@example.com',
    versionId: versions.length + 1
  }
  await api.patchFile(item.id, { versions: [...versions, newNote] })
  await refresh()
}

function remove(item) {
  deleteItem.value = item
}

function rename(item) {
  renameItem.value = item
}

function download(item) {
  downloadItem.value = item
}

function checkout(item) {
  if (item.checkedOutBy) {
    alert('Already checked out')
    return
  }
  checkoutItem.value = item
}


function openHistory(item) {
  historyItem.value = item
}

async function revertTo({ itemId, versionId }) {
  const item = files.value.find((x) => x.id === itemId)
  if (!item) return
  const versions = item.versions || []
  const newNote = {
    note: `Reverted to version ${versionId}`,
    note_at: new Date().toISOString(),
    note_id: versions.length + 1,
    uploadedBy: 'me@example.com',
    versionId: versions.length + 1
  }
  await api.patchFile(itemId, { versions: [...versions, newNote] })
  await refresh()
  historyItem.value = null
}

function changeSort({ by }) {
  if (sort.value.by === by)
    sort.value.dir = sort.value.dir === 'asc' ? 'desc' : 'asc'
  else {
    sort.value.by = by
    sort.value.dir = 'asc'
  }
}

function openUpload() {
  showUpload.value = true
}
function openNewFolder() {
  showNewFolder.value = true
}

async function confirmDelete(item) {
  await api.deleteFile(item.id)
  deleteItem.value = null
  await refresh()
}

async function confirmRename({ item, name }) {
  await api.patchFile(item.id, { name })
  renameItem.value = null
  await refresh()
}

function confirmDownload(item) {
  alert(`(mock) Downloading ${item.name}`)
  downloadItem.value = null
}

async function confirmCheckout({ item, user }) {
  await api.patchFile(item.id, { checkedOutBy: user })
  checkoutItem.value = null
  await refresh()
}


async function createFolder() {
  if (!newFolderName.value) {
    alert('name required')
    return
  }
  const payload = {
    name: newFolderName.value,
    type: 'folder',
    parentId: currentFolderId.value,
    checkedOutBy: null,
    createdBy: 'me@example.com',
    createdAt: new Date().toISOString(),
    metadata: { tags: '' },
    versions: []
  }
  await api.createFile(payload)
  newFolderName.value = ''
  showNewFolder.value = false
  await refresh()
}
</script>

<style>

.title{
  text-align: center;
  margin: 20px 0;
}
.all-wrapper{
  width: 100vw ;
 }

.inside-wrapper{
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
}

.file_view{
  min-height: 400px;
}

/* ===== Toolbar ===== */
.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  background: #f9fafb;
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

/* ===== Breadcrumbs ===== */
.breadcrumbs {
  margin: 10px 0 16px;
  font-size: 14px;
  color: #374151;
}

.breadcrumbs span {
  cursor: pointer;
  color: rgb(34, 34, 34);
  transition: color 0.2s;
  font-weight: 500;
}

.breadcrumbs span:hover {
  color: #1d4ed8;
}

/* ===== Table ===== */
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 14px;
  font-size: 14px;
}

.table thead {
  background: #f3f4f6;
}

.table th,
.table td {
  border: 1px solid #e5e7eb;
  padding: 8px 10px;
  text-align: left;
}

.table th.sortable {
  cursor: pointer;
  user-select: none;
}

.table th.sortable:hover {
  background: #e5e7eb;
}

/* ===== Grid View ===== */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
}

/* ===== Card ===== */
.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

/* ===== Chips (Tags) ===== */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.chip {
  background: #e0f2fe;
  color: #0369a1;
  padding: 3px 8px;
  font-size: 12px;
  border-radius: 14px;
  white-space: nowrap;
}

/* ===== Buttons ===== */
.button {
  background: #f3f4f6;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:hover:not(:disabled) {
  background: #e5e7eb;
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button.primary {
  background: #2563eb;
  color: #fff;
}

.button.primary:hover {
  background: #1d4ed8;
}

.button.danger {
  background: #dc2626;
  color: #fff;
}

.button.danger:hover {
  background: #b91c1c;
}

/* ===== Inputs & Selects ===== */
.input {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.CreateFolder{
  width: 100%;
  margin-bottom: 12px;
}

.input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

/* ===== Overlay & Modal ===== */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(2px);
  z-index: 999;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  max-width: 95%;
  background: #fff;
  border-radius: 12px;
  padding: 18px 22px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  z-index: 1000;
  animation: fadeIn 0.25s ease;
}

.clickFolderModal{
  width: 320px;
}

.modal h3 {
  margin: 0 0 12px;
  font-size: 17px;
  font-weight: 600;
  color: #222;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 10px;
}

/* ===== Small Text ===== */
.small {
  font-size: 12px;
  color: #6b7280;
}

/* ===== Animation ===== */
@keyframes fadeIn {
  from { opacity: 0; transform: translate(-50%, -46%); }
  to { opacity: 1; transform: translate(-50%, -50%); }
}


</style>

