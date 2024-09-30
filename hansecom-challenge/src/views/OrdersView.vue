<script setup>

import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useOrdersStore } from '@/stores/orders.js';
import OrdersTable from '@/components/OrdersTable.vue';

const router = useRouter();
const toast = useToast();

const store = useOrdersStore();

const handleEditOrder = (id) => {
  router.push(`/order/${id}/edit`);
}

const handleDeleteOrder = async (id) => {
  try {
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (confirm) {
      await axios.delete(`http://localhost:3333/orders/${id}`);
      toast.success("Order Successfully Deleted");
      router.push('/orders');
    }
  } catch (error) {
    console.error('Error deleting order', error);
    toast.error("Error Deleting Order");
  }
}


</script>

<template>
  <div class="px-48 py-2 bg-gray-200 min-h-screen">
    <OrdersTable :orders="store.orders" />
  </div>
</template>
