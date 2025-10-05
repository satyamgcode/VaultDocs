<template>
  <div class="modal-wrapper">
    <!-- Overlay -->
    <div class="overlay" @click="$emit('close')"></div>

    <!-- Modal -->
    <div class="modal" @click.stop>
      <h3 class="modal-title">Delete Confirmation</h3>

      <p class="modal-text">
        Are you sure you want to delete
        <span class="highlight">"{{ item.name }}"</span>?
      </p>

      <div class="actions">
        <button class="btn" @click="$emit('close')">Cancel</button>
        <button class="btn danger" @click="$emit('confirm', item)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ item: Object })
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
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 1001; /* above overlay */
}

/* Title */
.modal-title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

/* Text */
.modal-text {
  margin: 0 0 20px;
  font-size: 14px;
  color: #555;
}

.highlight {
  font-weight: 600;
  color: #000;
}

/* Actions */
.actions {
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

.btn.danger {
  background: #e53935;
  color: white;
}

.btn.danger:hover {
  background: #c62828;
}
</style>
