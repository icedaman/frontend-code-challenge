<script setup>
import { useOrdersStore } from '@/stores/orders.js';
import { onMounted } from 'vue';
import { useToast } from 'vue-toastification';

defineProps({
  id: Number,
})

const ordersStore = useOrdersStore();
const toast = useToast();

const handleDeleteOrder = async (id) => {
  try {
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (confirm) {
      //await axios.delete(`http://localhost:3333/orders/${id}`);
      const newOrdersArr = ordersStore.orders.filter(order => order.id !== id);
      ordersStore.orders = newOrdersArr;
      saveOrdersToLocalStorage();
      toast.success("Order Successfully Deleted");
    }
  } catch (error) {
    console.error('Error deleting order', error);
    toast.error("Error Deleting Order");
  }
}

const saveOrdersToLocalStorage = () => {
  localStorage.setItem('orders', JSON.stringify(ordersStore.orders));
}

</script>

<template>
  <button @click="handleDeleteOrder(id)" class="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-800">
    X
  </button>
</template>