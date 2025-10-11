<template>
  <div class="flex items-center gap-4 py-4 bg-white justify-between">
    <input
      class="flex flex-grow border border-green-500 rounded-md px-3 py-2 text-sm font-semibold text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 max-w-[500px]"
      placeholder="Search by name, tag or email..."
      v-model="q"
      @input="emitSearch"
    />
    <div class="toolbar-actions">
      <button class="bg-green-500 text-white text-sm font-semibold rounded-md px-4 py-2" @click="$emit('new-folder')">+ New Folder</button>
      <button class="bg-green-200 text-gray-800 text-sm font-semibold rounded-md px-4 py-2" @click="$emit('upload')">⬆ Upload</button>
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
