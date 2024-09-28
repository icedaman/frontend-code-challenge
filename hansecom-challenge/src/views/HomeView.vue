<script setup>

import { onMounted, ref } from 'vue';
import axios from 'axios';

const state = ref({})

onMounted(async () => {
  const response = await axios.get(`http://localhost:3333/order/3`);
  state.value = response.data
  console.log(`homeView response:  ${JSON.stringify(response)}`)
})
</script>

<template>
  {{ state.id }}
</template>
