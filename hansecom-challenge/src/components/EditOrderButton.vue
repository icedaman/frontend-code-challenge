<script setup>
defineProps({
  id: Number,
})
</script>

<template>
  <RouterLink :to="`/order/${id}/edit`" class="px-4 py-2 bg-yellow-500 rounded-lg text-white hover:bg-yellow-800">Edit</RouterLink>
</template>