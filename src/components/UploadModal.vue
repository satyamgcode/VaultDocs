<template>
  <div>
    <!-- Overlay -->
    <div class="overlay" @click="$emit('close')"></div>

    <!-- Modal -->
    <div class="modal" @click.stop>
      <h3>Upload File</h3>

      <!-- File picker (styled drag & drop) -->
      <div
        class="file-drop"
        @click="triggerFileInput"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
        :class="{ 'dragging': isDragging }"
      >
        <input
          ref="fileInput"
          type="file"
          class="hidden-input"
          @change="onFileChange"
        />
        <div v-if="!file" class="placeholder">
          <span class="icon">📁</span>
          <p>Drag & drop file here or <span class="browse">browse</span></p>
        </div>
        <div v-else class="file-info">
          <span class="icon">✅</span>
          <p>{{ file.name }}</p>
        </div>
      </div>

      <!-- Optional tags -->
      <input
        type="text"
        class="input"
        v-model="tags"
        placeholder="Tags (comma separated)"
      />

      <!-- Actions -->
      <div class="actions">
        <button class="button primary" @click="upload" :disabled="!file">
          Upload
        </button>
        <button class="button secondary" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api'

const props = defineProps({ parentId: [Number, null] })
const emit = defineEmits(['close', 'uploaded'])

const file = ref(null)
const tags = ref('')
const isDragging = ref(false)
const fileInput = ref(null)

function triggerFileInput() {
  fileInput.value?.click()
}

function onFileChange(e) {
  file.value = e.target.files[0] || null
}

function onDrop(e) {
  const droppedFile = e.dataTransfer.files[0]
  if (droppedFile) {
    file.value = droppedFile
  }
  isDragging.value = false
}

async function upload() {
  if (!file.value) {
    alert('Please select a file')
    return
  }

  const fileName = file.value.name
  const ext = fileName.includes('.') ? fileName.split('.').pop() : ''

  const payload = {
    name: fileName,
    type: 'file',
    fileType: ext,
    parentId: props.parentId === undefined ? null : props.parentId,
    checkedOutBy: null,
    createdBy: 'me@example.com',
    createdAt: new Date().toISOString(),
    metadata: { tags: tags.value },
    versions: [
      {
        note: 'Initial upload',
        note_at: new Date().toISOString(),
        note_id: 1,
        uploadedBy: 'me@example.com',
        versionId: 1
      }
    ]
  }

  await api.createFile(payload)
  emit('uploaded')
  emit('close')
}
</script>

<style scoped>
/* ===== Overlay ===== */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  z-index: 999;
}

/* ===== Modal ===== */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  max-width: 95%;
  background: #fff;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: fadeIn 0.25s ease;
}

.modal h3 {
  margin: 0 0 14px;
  font-size: 18px;
  font-weight: 600;
  color: #222;
}

/* ===== File Drop ===== */
.file-drop {
  border: 2px dashed #d1d5db;
  border-radius: 10px;
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 14px;
  transition: border-color 0.2s, background 0.2s;
}

.file-drop.dragging {
  border-color: #2563eb;
  background: #f3f6ff;
}

.file-drop .placeholder {
  font-size: 14px;
  color: #6b7280;
}

.file-drop .placeholder .icon {
  font-size: 28px;
  display: block;
  margin-bottom: 6px;
}

.file-drop .placeholder .browse {
  color: #2563eb;
  font-weight: 500;
}

.file-drop .file-info {
  font-size: 14px;
  color: #111827;
}

.file-drop .file-info .icon {
  font-size: 22px;
  margin-right: 6px;
  vertical-align: middle;
}

/* Hidden input */
.hidden-input {
  display: none;
}

/* ===== Inputs ===== */
.input {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  border-color: #2563eb;
  outline: none;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

/* ===== Actions ===== */
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}

.button {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.button.primary {
  background: #2563eb;
  color: #fff;
}

.button.primary:hover {
  background: #1d4ed8;
}

.button.secondary {
  background: #f3f4f6;
  color: #374151;
}

.button.secondary:hover {
  background: #e5e7eb;
}

/* ===== Animation ===== */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -46%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>
