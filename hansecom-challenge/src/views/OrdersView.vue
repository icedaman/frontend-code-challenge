<script setup>

import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const router = useRouter();
const route = useRoute();
const toast = useToast();

const userId = route.params.id;

const state = reactive({
  orders: [],
  isLoading: true
});

const o = ref({});

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

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3333/orders/${userId}`);
    state.orders = response.data;
    // o.value = response.data;
    console.log(userId)
    console.log(response)
  } catch (error) {
    console.error('Error fetching orders', error);
  } finally {
    state.isLoading = false;
  }
})
</script>

<template>
 <h1>{{ state.orders }}</h1>
</template>
