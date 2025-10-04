<template>
  <div class="modal-wrapper">
    <!-- Overlay -->
    <div class="overlay" @click="$emit('close')"></div>

    <!-- Modal -->
    <div class="modal" @click.stop>
      <h3 class="modal-title">Rename "{{ item.name }}"</h3>

      <input
        class="input"
        v-model="localName"
        placeholder="Enter new name"
      />

      <div class="actions">
        <button class="btn" @click="$emit('close')">Cancel</button>
        <button
          class="btn primary"
          @click="$emit('confirm', { item, name: localName })"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ item: Object })
const localName = ref('')

watch(
  () => props.item,
  val => {
    localName.value = val ? val.name : ''
  },
  { immediate: true }
)
</script>

<style scoped>
/* Wrapper ensures perfect centering */
.modal-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Overlay sits behind modal */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

/* Modal box */
.modal {
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1001; /* above overlay */
}

/* Title */
.modal-title {
  margin-bottom: 14px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

/* Input */
.input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}
.input:focus {
  border-color: #3b82f6;
}

/* Actions */
.actions {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* Buttons */
.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background: #e0e0e0;
  transition: background 0.2s;
}

.btn:hover {
  background: #d5d5d5;
}

.btn.primary {
  background: #3b82f6;
  color: #fff;
}

.btn.primary:hover {
  background: #2563eb;
}
</style>
