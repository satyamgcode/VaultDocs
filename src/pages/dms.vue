<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../api.js";
import FileToolbar from "../components/dms/FileToolbar.vue";
import FileView from "../components/dms/FileView.vue";
import DetailsPane from "../components/dms/DetailPane.vue";
import VersionHistoryModal from "../components/dms/VersionHistoryModal.vue";
import CheckInModal from "../components/dms/CheckInModal.vue";
import UploadModal from "../components/dms/UploadModal.vue";
import DeleteModal from "../components/dms/DeleteModal.vue";
import RenameModal from "../components/dms/RenameModal.vue";
import DownloadModal from "../components/dms/DownloadModal.vue";
import CheckoutModal from "../components/dms/CheckoutModal.vue";
import Navbar from "../components/common/Header.vue";

const files = ref([]);
const search = ref("");
const view = ref("list");
const sort = ref({ by: "name", dir: "asc" });
const filters = ref({ type: "", checkedOut: "" });
const page = ref(1);
const pageSize = 10;

const deleteItem = ref(null);
const renameItem = ref(null);
const downloadItem = ref(null);
const checkoutItem = ref(null);
const checkoutUser = ref("me@example.com"); // default user for checkout modal

const selectedItem = ref(null);
const historyItem = ref(null);
const checkinItem = ref(null);
const showUpload = ref(false);
const showNewFolder = ref(false);
const newFolderName = ref("");
const currentFolderId = ref(null); // null means root

async function refresh() {
  const res = await api.getFiles();
  files.value = res.data;
  buildBreadcrumbs();
}
onMounted(refresh);

function pathFor(item) {
  return `/files?parentId=${
    item && item.parentId !== undefined ? item.parentId : ""
  }`;
}

const filteredFiles = computed(() => {
  const q = search.value.trim().toLowerCase();
  let f = files.value.filter((x) => x.parentId === currentFolderId.value);
  if (filters.value.type) f = f.filter((x) => x.type === filters.value.type);
  if (filters.value.checkedOut === "true")
    f = f.filter((x) => !!x.checkedOutBy);
  if (filters.value.checkedOut === "false")
    f = f.filter((x) => !x.checkedOutBy);
  if (q) {
    f = f.filter((x) => {
      const tags = (x.metadata?.tags || "").toLowerCase();
      const author = (x.createdBy || "").toLowerCase();
      return (
        x.name.toLowerCase().includes(q) ||
        tags.includes(q) ||
        author.includes(q)
      );
    });
  }
  // folders first
  f.sort((a, b) => {
    if (a.type === b.type) {
      const v = (a[sort.value.by] || "")
        .toString()
        .localeCompare((b[sort.value.by] || "").toString(), undefined, {
          numeric: true,
        });
      return sort.value.dir === "asc" ? v : -v;
    }
    return a.type === "folder" ? -1 : 1;
  });
  return f;
});

const pagedFiles = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filteredFiles.value.slice(start, start + pageSize);
});

function onSearch(q) {
  search.value = q;
  page.value = 1;
}

function openFolder(item) {
  if (item.type === "folder") {
    currentFolderId.value = item.id;
    selectedItem.value = null;
    buildBreadcrumbs();
  } else {
    selectedItem.value = item;
  }
}

function buildBreadcrumbs() {
  const crumbs = [];
  let id = currentFolderId.value;
  while (id !== null) {
    const f = files.value.find((x) => x.id === id);
    if (!f) break;
    crumbs.unshift({ id: f.id, name: f.name });
    id = f.parentId;
  }
  crumbs.unshift({ id: null, name: "Root" });
  breadcrumbs.value = crumbs;
}
const breadcrumbs = ref([{ id: null, name: "Root" }]);
function goToCrumb(crumb) {
  currentFolderId.value = crumb.id;
  selectedItem.value = null;
  buildBreadcrumbs();
}

function selectItem(item) {
  selectedItem.value = item;
}

function checkin(item) {
  if (!item.checkedOutBy) {
    alert("Not checked out");
    return;
  }
  checkinItem.value = item;
}

async function performCheckIn({ itemId, summary }) {
  const item = files.value.find((x) => x.id === itemId);
  if (!item) return;
  const versions = item.versions || [];
  const newNote = {
    note: summary,
    note_at: new Date().toISOString(),
    note_id: versions.length + 1,
    uploadedBy: item.checkedOutBy || "unknown",
    versionId: versions.length + 1,
  };
  await api.patchFile(itemId, {
    checkedOutBy: null,
    versions: [...versions, newNote],
  });
  checkinItem.value = null;
  await refresh();
}

async function addNote(item, noteText) {
  const itemRef = files.value.find((x) => x.id === item.id);
  const versions = itemRef.versions || [];
  const newNote = {
    note: noteText,
    note_at: new Date().toISOString(),
    note_id: versions.length + 1,
    uploadedBy: "me@example.com",
    versionId: versions.length + 1,
  };
  await api.patchFile(item.id, { versions: [...versions, newNote] });
  await refresh();
}

function remove(item) {
  deleteItem.value = item;
}

function rename(item) {
  renameItem.value = item;
}

function download(item) {
  downloadItem.value = item;
}

function checkout(item) {
  if (item.checkedOutBy) {
    alert("Already checked out");
    return;
  }
  checkoutItem.value = item;
}

function openHistory(item) {
  historyItem.value = item;
}

async function revertTo({ itemId, versionId }) {
  const item = files.value.find((x) => x.id === itemId);
  if (!item) return;
  const versions = item.versions || [];
  const newNote = {
    note: `Reverted to version ${versionId}`,
    note_at: new Date().toISOString(),
    note_id: versions.length + 1,
    uploadedBy: "me@example.com",
    versionId: versions.length + 1,
  };
  await api.patchFile(itemId, { versions: [...versions, newNote] });
  await refresh();
  historyItem.value = null;
}

function changeSort({ by }) {
  if (sort.value.by === by)
    sort.value.dir = sort.value.dir === "asc" ? "desc" : "asc";
  else {
    sort.value.by = by;
    sort.value.dir = "asc";
  }
}

function openUpload() {
  showUpload.value = true;
}
function openNewFolder() {
  showNewFolder.value = true;
}

async function confirmDelete(item) {
  await api.deleteFile(item.id);
  deleteItem.value = null;
  await refresh();
}

async function confirmRename({ item, name }) {
  await api.patchFile(item.id, { name });
  renameItem.value = null;
  await refresh();
}

function confirmDownload(item) {
  alert(`(mock) Downloading ${item.name}`);
  downloadItem.value = null;
}

async function confirmCheckout({ item, user }) {
  await api.patchFile(item.id, { checkedOutBy: user });
  checkoutItem.value = null;
  await refresh();
}

async function createFolder() {
  if (!newFolderName.value) {
    alert("name required");
    return;
  }
  const payload = {
    name: newFolderName.value,
    type: "folder",
    parentId: currentFolderId.value,
    checkedOutBy: null,
    createdBy: "me@example.com",
    createdAt: new Date().toISOString(),
    metadata: { tags: "" },
    versions: [],
  };
  await api.createFile(payload);
  newFolderName.value = "";
  showNewFolder.value = false;
  await refresh();
}
</script>

<template>
  <Navbar />
  <div class="max-w-[90vw] mx-auto pb-6 mt-24 rounded-lg shadow-lg mb-10 border border-gray-200">
    <h1 class="text-center text-lg font-semibold text-white bg-green-500 py-4 rounded-t-lg">
      Document Management System
    </h1>

    <div class="max-w-[85vw] mx-auto px-4 py-6">
      <!-- Toolbar -->
      <FileToolbar
        :searchModel="search"
        @search="onSearch"
        @new-folder="openNewFolder"
        @upload="openUpload"
      />

      <!-- Breadcrumbs -->
      <div class="mt-4 mb-4 px-3 py-2 rounded text-sm font-semibold text-emerald-700">
        <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
          <template v-for="(b, i) in breadcrumbs" :key="b.id">
            <button @click="goToCrumb(b)" class="text-emerald-800 hover:underline text-sm">
              {{ b.name }}
            </button>
            <span v-if="i < breadcrumbs.length - 1" class="text-gray-400">/</span>
          </template>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
        <div class="flex items-center gap-3">
          <label class="text-sm font-bold text-emerald-800 mr-2">View :</label>

          <div class="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              @click="view = 'list'"
              :class="view === 'list' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
              class="px-3 py-2 flex items-center gap-2 font-medium text-sm transition focus:outline-none"
            >
              <img src="../assets/icons/listview.svg" alt="List View" class="w-4 h-4" />
            </button>

            <button
              @click="view = 'grid'"
              :class="view === 'grid' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
              class="px-3 py-2 flex items-center gap-2 font-medium text-sm transition focus:outline-none"
            >
              <img src="../assets/icons/gridView.svg" alt="Grid View" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <label class="text-sm font-bold text-emerald-800">Filter by Type:</label>
          <select v-model="filters.type" class="border border-emerald-300 px-2 py-1 rounded-lg cursor-pointer w-36">
            <option value="">All</option>
            <option value="folder">Folders</option>
            <option value="file">Files</option>
          </select>
        </div>
      </div>

      <!-- File view -->
      <div :class="['file_view', 'min-h-[400px]']">
        <FileView
          class="w-full"
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
      </div>

      <!-- Footer / Pagination -->
      <div class="mt-3 flex flex-col md:flex-row items-center gap-3">
        <div class="text-sm font-semibold text-emerald-700">
          Showing <span class="text-emerald-900 text-base font-bold">{{ filteredFiles.length }}</span> items
        </div>

        <div class="flex-1"></div>

        <div class="flex items-center gap-2">
          <button
            class="text-sm font-medium bg-emerald-100 px-3 py-1 rounded-lg text-emerald-700 disabled:opacity-50"
            :disabled="page === 1"
            @click="page--"
          >
            Prev
          </button>

          <span class="mx-3 font-semibold text-emerald-800 text-sm">Page {{ page }}</span>

          <button
            class="text-sm font-medium bg-emerald-100 px-3 py-1 rounded-lg text-emerald-700 disabled:opacity-50"
            :disabled="page * pageSize >= filteredFiles.length"
            @click="page++"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Details Pane Modal -->
      <transition name="fade">
        <div v-if="selectedItem">
          <div class="fixed inset-0 bg-black/45 backdrop-blur-sm z-[60]" @click="selectedItem = null"></div>
          <div class="fixed left-1/2 top-1/2 z-[70] -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl p-5 shadow-2xl">
            <DetailsPane :item="selectedItem" @add-note="addNote" @view-history="openHistory" />
          </div>
        </div>
      </transition>

      <!-- History Modal -->
      <VersionHistoryModal
        v-if="historyItem"
        :item="historyItem"
        @close="historyItem = null"
        @revert="revertTo"
      />

      <!-- Check-in Modal -->
      <transition name="fade">
        <div v-if="checkinItem">
          <div class="fixed inset-0 bg-black/45 backdrop-blur-sm z-[60]" @click="checkinItem = null"></div>
          <div class="fixed left-1/2 top-1/2 z-[70] -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl p-5 shadow-2xl">
            <CheckInModal :item="checkinItem" @close="checkinItem = null" @submit="performCheckIn" />
          </div>
        </div>
      </transition>

      <!-- Upload Modal -->
      <transition name="fade">
        <div v-if="showUpload">
          <div class="fixed inset-0 bg-black/45 backdrop-blur-sm z-[60]" @click="showUpload = false"></div>
          <div >
            <UploadModal :parentId="currentFolderId" @close="showUpload = false" @uploaded="refresh" />
          </div>
        </div>
      </transition>

      <!-- Delete Modal -->
      <DeleteModal
        v-if="deleteItem"
        :item="deleteItem"
        @close="deleteItem = null"
        @confirm="confirmDelete"
      />

      <!-- Rename Modal -->
      <RenameModal
        v-if="renameItem"
        :item="renameItem"
        @close="renameItem = null"
        @confirm="confirmRename"
      />

      <!-- Download Modal -->
      <DownloadModal
        v-if="downloadItem"
        :item="downloadItem"
        @close="downloadItem = null"
        @confirm="confirmDownload"
      />

      <!-- Checkout Modal -->
      <CheckoutModal
        v-if="checkoutItem"
        :item="checkoutItem"
        :defaultUser="checkoutUser"
        @close="checkoutItem = null"
        @confirm="confirmCheckout"
      />

      <!-- New Folder Modal -->
      <transition name="fade">
        <div v-if="showNewFolder">
          <div class="fixed inset-0 bg-black/45 backdrop-blur-sm z-[60]" @click="showNewFolder = false"></div>
          <div class="fixed left-1/2 top-1/2 z-[70] -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-xl p-5 shadow-2xl">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Create Folder</h3>
            <input
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
              v-model="newFolderName"
              placeholder="Folder name"
            />
            <div class="mt-4 flex justify-end gap-2">
              <button class="px-3 py-1 rounded-md bg-gray-100 text-sm" @click="showNewFolder = false">Cancel</button>
              <button class="px-3 py-1 rounded-md bg-emerald-600 text-white text-sm" @click="createFolder">Create</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
