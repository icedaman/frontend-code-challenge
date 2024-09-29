<script setup>

import { RouterLink } from 'vue-router';
import { onMounted, ref } from 'vue';
// import {useOrdersStore} from '@/stores/orders.js';

// const store = useOrdersStore();

// onMounted(async () => {
  // const response = await axios.get(`http://localhost:3333/order/3`);
  // state.value = response.data
  // console.log(`homeView response:  ${JSON.stringify(response)}`)
// })

</script>

<template>
  <RouterLink to="/users">Users</RouterLink>
  <!-- <RouterLink to="/orders">Orders</RouterLink> -->
</template>
