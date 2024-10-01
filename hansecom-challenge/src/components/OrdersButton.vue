<script setup>
defineProps({
  id: Number,
})
</script>

<template>
  <RouterLink :to="`/orders/${id}`" class="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-800">Orders
  </RouterLink>
</template>