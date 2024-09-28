<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();
const router = useRouter();

const form = reactive({
  userId: null,
  orderDate: '',
  product: ''
});

const handleSubmit = async () => {
  const newOrder = reactive({
    userId: Number(form.userId),
    orderDate: form.orderDate,
    product: form.product
  });

  try {
    await axios.post(`http://localhost:3333/orders`, newOrder);
     console.log(`newOrder: ${JSON.stringify(newOrder)}`)
    toast.success('Order Created Successfully');
    router.push(`/orders/${newOrder.userId}`);
  } catch (error) {
    console.error('Error creating order ', error);
    toast.error('Error Creating Order');
  }
}

</script>

<template>
  <section class="bg-green-50">
    <div class="m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Create Order</h2>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">User ID</label>
            <input type="number" id="userId" name="userId" v-model="form.userId"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="User ID" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Order Date</label>
            <input type="date" id="orderDate" name="orderDate" v-model="form.orderDate" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Enter your orderDate" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Product Name</label>
            <input type="text" id="productName" name="productName" v-model="form.product"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Choose a product" required />
          </div>
          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white text-2xl font-semibold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit">
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
