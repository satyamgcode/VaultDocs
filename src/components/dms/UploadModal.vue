<template>
  <div>
    <div
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      @click="closeModal"
      aria-hidden="true"
    ></div>

    <div
      class="fixed left-1/2 top-1/2 z-[999] -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl p-6 shadow-xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-title"
      @click.stop
    >
      <h3 id="upload-title" class="text-lg font-semibold text-gray-800 mb-4">
        Upload File
      </h3>

      <div
        ref="fileDropRef"
        tabindex="0"
        role="button"
        aria-label="File upload dropzone — press Enter or Space to browse"
        @click="triggerFileInput"
        @dragenter.prevent="isDragging = true"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
        @keydown.enter.prevent="triggerFileInput"
        @keydown.space.prevent="triggerFileInput"
        :class="[
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer mb-4 transition-colors outline-none focus:ring-2',
          isDragging
            ? 'border-green-600 bg-green-50 focus:ring-green-200'
            : 'border-gray-300 hover:border-green-500 focus:ring-green-200',
        ]"
      >
        <input
          ref="fileInput"
          type="file"
          class="sr-only"
          @change="onFileChange"
          aria-hidden="true"
        />

        <div v-if="!file" class="text-gray-600 text-sm select-none">
          <div class="text-3xl mb-2">📁</div>
          <p>
            Drag & drop file here or
            <span class="text-green-600 font-medium"> browse</span>
          </p>
        </div>

        <div v-else class="flex flex-col items-center text-gray-800 text-sm">
          <div class="text-2xl mb-1">✅</div>
          <p class="truncate max-w-[80%]">{{ file.name }}</p>
          <button
            type="button"
            @click.stop="removeFile"
            class="mt-2 text-xs text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <input
        v-model="tags"
        type="text"
        placeholder="Tags (comma separated)"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 text-sm mb-4"
      />

      <div class="flex justify-end gap-3">
        <button
          type="button"
          class="px-4 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 transition disabled:opacity-50"
          @click="upload"
          :disabled="!file || isUploading"
        >
          <span v-if="isUploading">Uploading...</span>
          <span v-else>Upload</span>
        </button>

        <button
          type="button"
          class="px-4 py-2 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition"
          @click="closeModal"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import api from "../../api";

// props & emits
const props = defineProps({
  parentId: { type: [Number, String], default: null },
});
const emit = defineEmits(["close", "uploaded"]);

// local state
const file = ref(null);
const tags = ref("");
const isDragging = ref(false);
const isUploading = ref(false);
const fileInput = ref(null);
const fileDropRef = ref(null);

// open the native file picker
function triggerFileInput() {
  // reset the input value to allow re-selecting the same file
  if (fileInput.value) fileInput.value.value = "";
  fileInput.value?.click();
}

// handle native input change
function onFileChange(e) {
  const f = e.target?.files?.[0] ?? null;
  file.value = f;
}

// handle drop
function onDrop(e) {
  const f = e.dataTransfer?.files?.[0] ?? null;
  if (f) file.value = f;
  isDragging.value = false;
}

// remove file selection
function removeFile() {
  file.value = null;
  if (fileInput.value) fileInput.value.value = "";
}

// create payload and upload
async function upload() {
  if (!file.value) {
    // guard
    alert("Please select a file");
    return;
  }

  isUploading.value = true;
  try {
    const fileName = file.value.name;
    const ext = fileName.includes(".") ? fileName.split(".").pop() : "";

    const payload = {
      name: fileName,
      type: "file",
      fileType: ext,
      parentId: props.parentId ?? null,
      checkedOutBy: null,
      createdBy: "me@example.com",
      createdAt: new Date().toISOString(),
      metadata: { tags: tags.value },
      versions: [
        {
          note: "Initial upload",
          note_at: new Date().toISOString(),
          note_id: 1,
          uploadedBy: "me@example.com",
          versionId: 1,
        },
      ],
    };

    await api.createFile(payload);
    emit("uploaded");
    closeModal();
  } catch (err) {
    // basic error handling — surface a friendly message
    console.error("Upload error", err);
    alert("Upload failed. Check console for details.");
  } finally {
    isUploading.value = false;
  }
}

// reset internal state
function resetState() {
  file.value = null;
  tags.value = "";
  isDragging.value = false;
  isUploading.value = false;
  if (fileInput.value) fileInput.value.value = "";
}

// close (reset + notify parent)
function closeModal() {
  resetState();
  emit("close");
}

// close on ESC
function onKeyDown(e) {
  if (e.key === "Escape") closeModal();
}

onMounted(() => {
  document.addEventListener("keydown", onKeyDown);
  // focus drop area for keyboard users
  setTimeout(() => fileDropRef.value?.focus(), 0);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeyDown);
});
</script>

<style scoped>
/* tiny keyframe used for the modal open animation */
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
.animate-fadeIn {
  animation: fadeIn 0.22s ease forwards;
}
</style>
