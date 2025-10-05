<template>
  <!-- Table Row View -->
  <tr v-if="list" class="file-row">
    <td @click="onClick" class="file-name hover-cell name-cell">
      <div>
        <strong v-if="item.type === 'folder'">📁</strong>
        <strong v-else>📄</strong>
        <span class="file-label">{{ item.name }}</span>
        <div v-if="item.type === 'file'" class="file-subtype">
          ({{ item.fileType || 'file' }})
        </div>
      </div>
      <!-- Edit icon on hover -->
      <span class="edit-icon" @click.stop="$emit('rename', item)">
        ✏️
      </span>

    </td>
    <td>{{ item.type }}</td>
    <td>{{ item.fileType || '-' }}</td>
    <td>
      <div class="file-meta">
        {{ item.createdBy || '-' }}<br />
        <span class="small">{{ formatDate(item.createdAt) }}</span>
      </div>
    </td>
    <td>
      <div class="chips">
        <span class="chip" v-for="t in tagsList" :key="t">{{ t }}</span>
      </div>
    </td>
    <td>{{ item.checkedOutBy || '-' }}</td>
    <td>
      <div class="actions">
        <!-- <button class="button small" @click="$emit('rename', item)">Rename</button> -->
        <button class="button small danger" @click="$emit('delete', item)">Delete</button>
        <button v-if="item.type === 'folder'" class="button small" @click="$emit('open-folder', item)">
          Open
        </button>
        <button v-if="item.type === 'file'" class="button small" @click="$emit('download', item)">
          Download
        </button>
        <!-- <button v-if="item.type === 'file' && !item.checkedOutBy" class="button small" @click="$emit('checkout', item)">
          Check Out
        </button>
        <button v-if="item.type === 'file' && item.checkedOutBy" class="button small" @click="$emit('checkin', item)">
          Check In
        </button> -->
      </div>

    </td>
  </tr>

  <!-- Card View -->
  <div v-else class="file-card hover-card" @dblclick="onClick">
    <!-- Edit icon on hover (top-right) -->
    <span class="edit-icon-grid" @click.stop="$emit('rename', item)">✏️</span>

    <!-- Header -->
    <div class="file-card-header">
      <div class="file-icon">
        <span v-if="item.type === 'folder'" class="icon">📁</span>
        <span v-else class="icon">📄</span>
      </div>
      <div class="file-card-title">
        <div class="file-name">{{ item.name }}</div>
        <div class="file-type small">
          {{ item.fileType ? item.fileType + ' file' : item.type }}
        </div>
      </div>
    </div>

    <!-- Details -->
    <div class="file-card-details">
      <div><strong>Created By:</strong> {{ item.createdBy || '-' }}</div>
      <div><strong>Status:</strong> {{ item.checkedOutBy ? 'Locked' : 'Available' }}</div>
      <div><strong>Created:</strong> {{ formatDate(item.createdAt) }}</div>
    </div>

    <!-- Tags -->
    <div class="chips" v-if="tagsList.length">
      <span class="chip" v-for="t in tagsList" :key="t">{{ t }}</span>
    </div>

    <!-- Actions -->
    <div class="file-card-actions">
      <!-- <button class="button small" @click.stop="$emit('rename', item)">Rename</button> -->
      <button class="button small danger" @click.stop="$emit('delete', item)">Delete</button>
      <button v-if="item.type === 'folder'" class="button small" @click="$emit('open-folder', item)">
        Open
      </button>
      <button v-if="item.type === 'file'" class="button small" @click="$emit('download', item)">
        Download
      </button>
      <button v-if="item.type === 'file' && !item.checkedOutBy" class="button small" @click="$emit('checkout', item)">
        Check Out
      </button>
      <button v-if="item.type === 'file' && item.checkedOutBy" class="button small" @click="$emit('checkin', item)">
        Check In
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: Object,
  list: { type: Boolean, default: true }
})
const emit = defineEmits([
  'open-folder',
  'select',
  'checkout',
  'checkin',
  'delete',
  'rename',
  'download'
])

function onClick() {
  if (props.item.type === 'folder') emit('open-folder', props.item)
  else emit('select', props.item)
}

const tagsList = computed(() => {
  const raw = props.item.metadata?.tags || ''
  return raw.split(',').map(s => s.trim()).filter(Boolean)
})

function formatDate(d) {
  if (!d) return ''
  try {
    return new Date(d).toLocaleString()
  } catch (e) {
    return d
  }
}
</script>

<style scoped>
/* --- Table Row View --- */
.file-row td {
  padding: 10px;
  vertical-align: top;
  /* border-bottom: 1px solid #f1f1f1; */
  border-bottom: none;
  border-left: none;
  border-right: none;
  font-size: 14px;
  color: #333;
}

.hover-cell {
  position: relative;
}
.name-cell{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.edit-icon {
  margin-left: 8px;
  font-size: 14px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.hover-cell:hover .edit-icon {
  opacity: 1;
}

.file-name {
  cursor: pointer;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-label {
  margin-left: 6px;
  max-width: 10px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-subtype {
  font-size: 12px;
  color: #666;
  margin-left: 20px;
}

.file-meta {
  font-size: 13px;
  color: #555;
}

/* --- Card View --- */
.file-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 18px;
  background: #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.07);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 16px;
  min-width: 250px;
  position: relative;
}

.file-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

/* Hover edit icon for card */
.edit-icon-grid {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 14px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.hover-card:hover .edit-icon-grid {
  opacity: 1;
}

/* Header */
.file-card-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.file-icon {
  font-size: 28px;
  margin-right: 12px;
}

.file-card-title {
  flex: 1;
}

.file-name {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
}

.file-type {
  color: #6b7280;
  font-size: 13px;
}

/* Details */
.file-card-details {
  font-size: 13px;
  color: #444;
  margin-bottom: 12px;
  line-height: 1.5;
}

/* Chips */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.chip {
  background: #eef2ff;
  color: #3b82f6;
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 500;
}

/* Actions */
.file-card-actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
}

.button {
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.button:hover {
  background: #f3f4f6;
}

.button:active {
  transform: scale(0.97);
}

.button.small {
  font-size: 12px;
  padding: 5px 12px;
}

.button.danger {
  background: #fee2e2;
  color: #dc2626;
}

.button.danger:hover {
  background: #fecaca;
}
</style>
