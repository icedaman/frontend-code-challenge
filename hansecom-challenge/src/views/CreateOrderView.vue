<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useOrdersStore } from '@/stores/orders.js';
import { useUsersStore } from '@/stores/users.js';

const toast = useToast();
const router = useRouter();
const ordersStore = useOrdersStore();
const usersStore = useUsersStore();

const form = reactive({
  userId: null,
  orderDate: '',
  product: ''
});

const handleSubmit = async () => {
  // get available userIds
  let availableIds = [];

  availableIds = usersStore.users.map((user) => user.id);

  const selectedUserId = availableIds[Math.floor(Math.random() * availableIds.length)];

  const newOrder = reactive({
    id: Math.floor(Math.random() * 10000),
    userId: selectedUserId,
    orderDate: form.orderDate,
    product: form.product
  });

  try {
    // const response = await axios.post(`http://localhost:3333/orders`, newOrder);
    ordersStore.orders.push(newOrder);
    saveOrdersToLocalStorage();
    router.push(`/orders/${selectedUserId}`);
    toast.success('Order Created Successfully');
  } catch (error) {
    console.error('Error creating order ', error);
    toast.error('Error Creating Order');
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
  <section>
    <div class="m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Create Order</h2>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Order Date</label>
            <input type="date" id="orderDate" name="orderDate" v-model="form.orderDate"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Enter your orderDate" required />
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
