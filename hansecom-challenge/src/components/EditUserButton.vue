<script setup>
defineProps({
  id: Number,
})
</script>

<template>
  <RouterLink :to="`/user/${id}/edit`" class="px-4 py-2 bg-yellow-600 rounded-lg text-white hover:bg-yellow-800">Edit</RouterLink>
</template>