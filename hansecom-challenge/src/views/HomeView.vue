<script setup>

import { onMounted } from 'vue';
import axios from 'axios';

onMounted(async () => {
  const response = await axios.get(`http://localhost:3333/users`);
  console.log(response.data)
})
</script>

<template>

</template>
