<template>
  <div class="details-card">
    <h3 class="title">Details: {{ item.name }}</h3>

    <div class="details-content">
      <!-- Left column -->
      <div class="details-column">
        <p><strong>Type:</strong> {{ item.type }}</p>
        <p><strong>File Type:</strong> {{ item.fileType || '-' }}</p>
        <p><strong>Created By:</strong> {{ item.createdBy }}</p>
        <p><strong>Created At:</strong> {{ formatDate(item.createdAt) }}</p>
        <!-- <p><strong>Checked Out:</strong> {{ item.checkedOutBy || 'No' }}</p> -->

        <p><strong>Tags:</strong>
          <span class="chip" v-for="t in tagsList" :key="t">{{ t }}</span>
        </p>
      </div>

      <!-- Right column -->
      <div class="details-column">
        <h4 class="subtitle">Notes / Log</h4>
        <ul class="notes-list">
          <li v-for="v in versionsSorted" :key="v.note_id">
            <div>
              <strong>#{{ v.versionId || v.note_id }}</strong> — {{ v.note }}
              <span class="note-meta">
                by {{ v.uploadedBy }} at {{ formatDate(v.note_at) }}
              </span>
            </div>
          </li>
        </ul>

        <div class="note-input-section">
          <input
            class="input"
            v-model="note"
            placeholder="Add a note (will add to versions metadata)"
          />
          <div class="actions">
            <button class="button primary" @click="addNote">Add Note</button>
            <button class="button secondary" @click="$emit('view-history', item)">
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({ item: Object })
const emit = defineEmits(['add-note', 'view-history'])
const note = ref('')

const tagsList = computed(() =>
  (props.item.metadata?.tags || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
)

const versionsSorted = computed(() =>
  (props.item.versions || [])
    .slice()
    .sort((a, b) => (b.versionId || b.note_id) - (a.versionId || a.note_id))
)

function addNote() {
  if (!note.value.trim()) {
    alert('note required')
    return
  }
  emit('add-note', props.item, note.value.trim())
  note.value = ''
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
.details-card {
  margin-top: 16px;
  padding: 16px 20px;
  border-top: 1px dashed #ddd;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 600;
  color: #222;
}

.details-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.details-column {
  flex: 1;
  min-width: 240px;
  font-size: 14px;
  color: #444;
}

.subtitle {
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.chip {
  display: inline-block;
  margin: 2px 6px 2px 0;
  padding: 4px 10px;
  background: #e5f0ff;
  color: #2563eb;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.notes-list {
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
}
.notes-list li {
  padding: 6px 0;
  border-bottom: 1px solid #f1f1f1;
  font-size: 13px;
}
.note-meta {
  font-size: 12px;
  color: #666;
  margin-left: 4px;
}

.note-input-section {
  margin-top: 10px;
}

.input {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 14px;
  outline: none;
  transition: border 0.2s ease;
}
.input:focus {
  border-color: #3b82f6;
}

.actions {
  margin-top: 8px;
  display: flex;
  gap: 10px;
}

.button {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background 0.2s ease, transform 0.1s ease;
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
