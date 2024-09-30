<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useOrdersStore } from '@/stores/orders.js';

const store = reactive(useOrdersStore());
const toast = useToast();
const router = useRouter();
const route = useRoute();

const orderId = route.params.id;
const order =  store.orders.filter(order => order.id === Number(orderId));

const form = reactive({
  product: '',
  orderDate: '',
});

const updateOrder = (editedOrder) => {
  const newOrdersArr = store.orders.filter(order => order.id !== Number(orderId));
  newOrdersArr.push(editedOrder);
  store.orders = newOrdersArr;
  return newOrdersArr.find(order => order.id === Number(orderId));
}

const handleSubmit = async () => {
  const editedOrder = reactive({
    id: order[0].id,
    userId: order[0].userId,
    product: form.product,
    orderDate: form.orderDate,
  });

  try {
    //await axios.put(`http://localhost:3333/order/${orderId}/edit`, editedOrder);
    await updateOrder(editedOrder);
    toast.success('Order Updated Successfully');
    router.push('/users/');
  } catch (error) {
    console.error('Error updating order ', error);
    toast.error('Error Updating Order');
  }
}

onMounted(()=> {
  form.product  = order[0].product;
  form.orderDate  = order[0].orderDate;
})

</script>

<template>
  <section>
    <div class="m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Edit Order</h2>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Product Name</label>
            <input
              type="text"
              id="product"
              name="product"
              v-model="form.product"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Enter the product name"
              required
            />
          </div> 
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Order Date</label>
            <input
              type="date"
              id="orderDate"
              name="orderDate"
              v-model="form.orderDate"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Enter the order date"
              required
            />
          </div>
          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white text-2xl font-semibold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Order
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>