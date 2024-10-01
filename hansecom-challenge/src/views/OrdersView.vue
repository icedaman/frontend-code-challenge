<script setup>

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useOrdersStore } from '@/stores/orders.js';
import OrdersTable from '@/components/OrdersTable.vue';

const router = useRouter();
const toast = useToast();

const ordersStore = useOrdersStore();


const handleDeleteOrder = async (id) => {
  try {
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (confirm) {
      //await axios.delete(`http://localhost:3333/orders/${id}`);
      const newOrdersArr = ordersStore.orders.filter(order => order.id !== id);
      ordersStore.orders = newOrdersArr;
      saveOrdersToLocalStorage();
      toast.success("Order Successfully Deleted");
      router.push('/users');
    }
  } catch (error) {
    console.error('Error deleting order', error);
    toast.error("Error Deleting Order");
  }
}

onMounted(() => {
  const savedOrders = JSON.parse(localStorage.getItem('orders'));

  if (savedOrders) {
    ordersStore.orders = savedOrders;
  }
})

const saveOrdersToLocalStorage = () => {
  localStorage.setItem('orders', JSON.stringify(ordersStore.orders));
}

</script>

<template>
  <div class="px-48 py-2 bg-gray-200 min-h-screen">
    <OrdersTable :orders="ordersStore.orders" @orderDeleted="handleDeleteOrder" />
  </div>
</template>
