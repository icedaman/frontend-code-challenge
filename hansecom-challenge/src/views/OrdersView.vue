<script setup>

import { onMounted, reactive, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useOrdersStore } from '@/stores/orders.js';
import OrdersTable from '@/components/OrdersTable.vue';

const router = useRouter();
const toast = useToast();

const store = useOrdersStore();

const handleDeleteOrder = async (id) => {
  console.log(id)
  try {
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (confirm) {
      //await axios.delete(`http://localhost:3333/orders/${id}`);
      const newOrdersArr = store.orders.filter(order => order.id !== id);
      store.orders = newOrdersArr;
      toast.success("Order Successfully Deleted");
      router.push('/users');
    }
  } catch (error) {
    console.error('Error deleting order', error);
    toast.error("Error Deleting Order");
  }
}

onMounted(()=>{
  watchEffect(()=> console.log(store.orders))
})
</script>

<template>
  <div class="px-48 py-2 bg-gray-200 min-h-screen">
    <OrdersTable :orders="store.orders" @orderDeleted="handleDeleteOrder" />
  </div>
</template>
