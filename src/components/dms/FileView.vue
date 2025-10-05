<template>
  <div>
    <!-- List View -->
    <div v-if="viewMode==='list'">
      <table class="table">
        <thead>
          <tr>
            <th @click="sort('name')" class="sortable">Name</th>
            <th @click="sort('type')" class="sortable">Type</th>
            <th @click="sort('fileType')" class="sortable">File Type</th>
            <th @click="sort('createdBy')" class="sortable">Created By</th>
            <th>Tags</th>
            <th @click="sort('checkedOutBy')" class="sortable">Checked Out</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <FileItem
            v-for="f in files"
            :key="f.id"
            :item="f"
            :list="true"
            @open-folder="$emit('open-folder', $event)"
            @select="$emit('select', $event)"
            @checkout="$emit('checkout', $event)"
            @checkin="$emit('checkin', $event)"
            @delete="$emit('delete', $event)"
            @rename="$emit('rename', $event)"
            @download="$emit('download', $event)"
          />
        </tbody>
      </table>
    </div>

    <!-- Grid View -->
    <div v-else class="grid">
      <FileItem
        v-for="f in files"
        :key="f.id"
        :item="f"
        :list="false"
        @open-folder="$emit('open-folder', $event)"
        @select="$emit('select', $event)"
        @checkout="$emit('checkout', $event)"
        @checkin="$emit('checkin', $event)"
        @delete="$emit('delete', $event)"
        @rename="$emit('rename', $event)"
        @download="$emit('download', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import FileItem from './FileItem.vue'
const props = defineProps({ files: { type: Array, default: ()=>[] }, viewMode: String })
const emit = defineEmits(['open-folder','select','checkout','checkin','delete','rename','download','sort-change'])
function sort(by) { emit('sort-change', { by }) }
</script>

<style scoped>
/* ===== Table Styling ===== */

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.table th, .table td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid #eaeaea;
}

.table th {
  background: #f9fafb;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;
}

.table th.sortable:hover {
  background: #f0f4f8;
}

.table tbody tr:nth-child(even) {
  background: #fafafa;
}

.table tbody tr:hover {
  background: #f5f9ff;
}

/* ===== Grid Styling ===== */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 12px;
}

.grid .file-card {
  background: #fff;
  padding: 18px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.08);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.grid .file-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
</style>