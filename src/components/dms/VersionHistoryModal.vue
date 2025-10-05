<template>
  <div>
    <!-- Overlay -->
    <div class="overlay" @click="$emit('close')"></div>

    <!-- Modal -->
    <div class="modal">
      <h3>Version History - {{ item.name }}</h3>

      <ul class="version-list">
        <li v-for="v in item.versions || []" :key="v.versionId" class="version-item">
          <div class="version-header">
            <strong>V{{ v.versionId }}</strong> — {{ v.note }}
            <span class="small">by {{ v.uploadedBy }} at {{ formatDate(v.note_at) }}</span>
          </div>

          <div class="actions">
            <button class="button primary" @click="downloadVersion(v)">Download</button>
            <button class="button secondary" @click="revert(v)">Revert to this</button>
          </div>
        </li>
      </ul>

      <div class="actions modal-footer">
        <button class="button secondary" @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ item: Object })
const emit = defineEmits(['close', 'revert'])

function downloadVersion(v) {
  alert('(mock) downloading version ' + v.versionId)
}

function revert(v) {
  if (!confirm(`Revert ${props.item.name} to version ${v.versionId}?`)) return
  emit('revert', { itemId: props.item.id, versionId: v.versionId })
}

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
  width: 520px;
  max-width: 95%;
  background: #fff;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: fadeIn 0.25s ease;
}

.modal h3 {
  margin: 0 0 16px;
  font-size: 18px;
  font-weight: 600;
  color: #222;
}

/* ===== Version List ===== */
.version-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
}

.version-item {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
}

.version-header {
  font-size: 14px;
  margin-bottom: 8px;
}

.version-header .small {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
}

/* ===== Actions ===== */
.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.modal-footer {
  justify-content: flex-end;
  margin-top: 14px;
}

.button {
  padding: 7px 14px;
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
