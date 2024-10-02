<script setup>
const emit = defineEmits(['search']);

const handleSearchInput = (e) => {
  emit('search' , e.target.value);
}
</script>

<template>
  <form class="py-3 px-4 flex items-center">
    <label class=" sr-only">Search</label>
    <div class="relative w-full">
      <input type="text" placeholder="Search by Name or Email" @input="handleSearchInput" class="bg-gray-50 border border-gray-300 text-gray-900 text-left px-4 py-2 rounded-lg">
    </div>
  </form>
</template>