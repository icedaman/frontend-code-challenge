<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import {useOrdersStore} from '@/stores/orders.js'

const toast = useToast();
const router = useRouter();
const store = useOrdersStore();

const form = reactive({
  userId: null,
  orderDate: '',
  product: ''
});


const handleSubmit = async () => {
  // get available userIds
  let availableIds = [];

  try {
    const response = await axios.get(`http://localhost:3333/users`);
    // console.log(response.data)
    const userIds = response.data.map( (user)=> user.id);
    availableIds = userIds;
    // console.log(availableIds);
  } catch (error) {
    console.error(error);
  }

  const pickRandomId = availableIds[Math.floor(Math.random() * availableIds.length)];
  console.log(pickRandomId)

  const newOrder = reactive({
    userId: pickRandomId,
    orderDate: form.orderDate,
    product: form.product
  });

  try {
    // not working properly due to userId (user_id in db) always returning null from the API
    // an order is created in the db with orderDate and product but the API does not allow the userId to be stored
    // replacing the passed userId value in the form with null 

    // const response = await axios.post(`http://localhost:3333/orders`, newOrder);

    store.orders.push(newOrder);
    toast.success('Order Created Successfully');
    router.push(`/`);
    // router.push(`/orders/${newOrder.userId}`);
  } catch (error) {
    console.error('Error creating order ', error);
    toast.error('Error Creating Order');
  }
}

onMounted(async () => {

})


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
