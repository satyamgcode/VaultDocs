<template>
  <div class="toolbar">
    <input
      class="input search-box"
      placeholder="Search by name, tag or email..."
      v-model="q"
      @input="emitSearch"
    />
    <div class="toolbar-actions">
      <button class="button primary" @click="$emit('new-folder')">+ New Folder</button>
      <button class="button secondary" @click="$emit('upload')">⬆ Upload</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({ searchModel: String })
const emit = defineEmits(['search', 'new-folder', 'upload'])
const q = ref(props.searchModel || '')
watch(() => props.searchModel, v => (q.value = v))
function emitSearch() {
  emit('search', q.value)
}
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-bottom: 14px;
  gap: 12px;
}

.search-box {
  flex: 1;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  transition: border 0.2s ease;
}
.search-box:focus {
  border-color: #3b82f6;
}

.toolbar-actions {
  display: flex;
  gap: 10px;
}

.button {
  border: none;
  padding: 8px 14px;
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

.button.primary {
  background: #3b82f6;
  color: #fff;
}
.button.primary:hover {
  background: #2563eb;
}

.button.secondary {
  background: #f3f4f6;
  color: #333;
}
.button.secondary:hover {
  background: #e5e7eb;
}
</style>
