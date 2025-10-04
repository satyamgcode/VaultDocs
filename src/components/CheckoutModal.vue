<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal" @click.stop>
      <h3 class="modal-title">Check Out "{{ item.name }}"</h3>

      <p class="modal-text">Enter your email to check out this file.</p>

      <input 
        class="input" 
        v-model="localUser" 
        type="email"
        placeholder="Enter your email"
      />

      <div class="actions">
        <button 
          class="button primary" 
          @click="$emit('confirm', { item, user: localUser })"
        >
          Check Out
        </button>
        <button class="button secondary" @click="$emit('close')">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  item: Object,
  defaultUser: String
})

const localUser = ref(props.defaultUser || '')

watch(
  () => props.item,
  () => {
    localUser.value = props.defaultUser || ''
  }
)
</script>

<style scoped>
/* Backdrop (centers modal using flex) */
.modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

/* Modal */
.modal {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

/* Title */
.modal-title {
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

/* Text */
.modal-text {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 12px;
}

/* Input */
.input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 16px;
}

/* Actions */
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* Buttons */
.button {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
}
.button.primary {
  background: #3b82f6;
  color: #fff;
}
.button.secondary {
  background: #f3f4f6;
  color: #374151;
}
</style>
