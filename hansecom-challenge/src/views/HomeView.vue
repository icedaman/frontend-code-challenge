<script setup>

import { onMounted, ref } from 'vue';
import axios from 'axios';
import {useOrdersStore} from '@/stores/orders.js'

// const state = ref({})

const store = useOrdersStore()

onMounted(async () => {
  // const response = await axios.get(`http://localhost:3333/order/3`);
  // state.value = response.data
  // console.log(`homeView response:  ${JSON.stringify(response)}`)
})
</script>

<template>
  {{ store.orders }}


</template>
