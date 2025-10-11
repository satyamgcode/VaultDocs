<template>
  <div>
    <!-- ===== List View ===== -->
    <div v-if="viewMode === 'list'">
      <table class="min-w-full border border-green-200 text-sm text-left">
        <thead class="bg-green-200 text-green-700 uppercase text-xs font-semibold">
          <tr>
            <th @click="sort('name')" class="px-4 py-3 cursor-pointer hover:bg-green-300">Name</th>
            <th @click="sort('type')" class="px-4 py-3 cursor-pointer hover:bg-green-300">Type</th>
            <th @click="sort('fileType')" class="px-4 py-3 cursor-pointer hover:bg-green-300">File Type</th>
            <th @click="sort('createdBy')" class="px-4 py-3 cursor-pointer hover:bg-green-300">Created By</th>
            <th class="px-4 py-3">Tags</th>
            <th @click="sort('checkedOutBy')" class="px-4 py-3 cursor-pointer hover:bg-green-300">Checked Out</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
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

    <!-- ===== Grid View ===== -->
    <div
      v-else
      class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mt-3"
    >
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
        class="bg-white p-5 rounded-xl shadow-md text-center transform transition duration-200 hover:-translate-y-1 hover:shadow-lg"
      />
    </div>
  </div>
</template>

<script setup>
import FileItem from './FileItem.vue'

const props = defineProps({
  files: { type: Array, default: () => [] },
  viewMode: String
})

const emit = defineEmits([
  'open-folder',
  'select',
  'checkout',
  'checkin',
  'delete',
  'rename',
  'download',
  'sort-change'
])

function sort(by) {
  emit('sort-change', { by })
}
</script>
