<template>
  <div>
    <!-- Overlay -->
    <div class="overlay" @click="$emit('close')"></div>

    <!-- Modal -->
    <div class="modal">
      <h3 class="modal-title">Check In - {{ item.name }}</h3>
      <p class="modal-subtitle">Mock: upload replaced with adding a change summary</p>

      <textarea
        class="input"
        v-model="summary"
        placeholder="Change summary (required)"
        rows="4"
      ></textarea>

      <div class="actions">
        <button class="button primary" @click="submit">Submit</button>
        <button class="button secondary" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({ item: Object })
const emit = defineEmits(['close','submit'])
const summary = ref('')

function submit() {
  if (!summary.value.trim()) {
    alert('Summary required')
    return
  }
  emit('submit', { itemId: props.item.id, summary: summary.value.trim() })
}
</script>

<style scoped>
/* Overlay background */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(2px);
  z-index: 10;
}

/* Modal container */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  width: 420px;
  max-width: 90%;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  z-index: 20;
  animation: fadeIn 0.25s ease-out;
}

/* Title and subtitle */
.modal-title {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 600;
  color: #222;
}

.modal-subtitle {
  font-size: 13px;
  color: #666;
  margin-bottom: 14px;
}

/* Textarea input */
.input {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  outline: none;
  resize: none;
  transition: border 0.2s ease;
}
.input:focus {
  border-color: #3b82f6; /* blue accent */
}

/* Actions */
.actions {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* Buttons */
.button {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}
.button:active {
  transform: scale(0.97);
}

/* Primary (submit) button */
.button.primary {
  background: #3b82f6;
  color: #fff;
}
.button.primary:hover {
  background: #2563eb;
}

/* Secondary (cancel) button */
.button.secondary {
  background: #f3f4f6;
  color: #333;
}
.button.secondary:hover {
  background: #e5e7eb;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -48%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>
