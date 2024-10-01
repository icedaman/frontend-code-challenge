<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useOrdersStore } from '@/stores/orders.js';

const ordersStore = useOrdersStore();
const toast = useToast();
const router = useRouter();
const route = useRoute();

const orderId = route.params.id;
const ordersFilteredById = ordersStore.orders.filter(order => order.id === Number(orderId));

const form = reactive({
  product: '',
  orderDate: '',
});

const updateOrder = (editedOrder) => {
  const newOrdersArr = ordersStore.orders.filter(order => order.id !== Number(orderId));
  newOrdersArr.push(editedOrder);
  ordersStore.orders = newOrdersArr;
  return newOrdersArr.find(order => order.id === Number(orderId));
}

const getOrderOfUser = () => ordersStore.orders.find(order => {
  if (order.id === Number(orderId)) {
    return order;
  } 
})

const handleSubmit = async () => {
  const editedOrder = reactive({
    id: ordersFilteredById[0].id,
    userId: ordersFilteredById[0].userId,
    product: form.product,
    orderDate: form.orderDate,
  });

  try {
    //await axios.put(`http://localhost:3333/order/${orderId}/edit`, editedOrder);
    await updateOrder(editedOrder);
    saveOrdersToLocalStorage();
    toast.success('Order Updated Successfully');
    const orderOfUser = getOrderOfUser();
    router.push('/orders/'+orderOfUser.userId);
  } catch (error) {
    console.error('Error updating order ', error);
    toast.error('Error Updating Order');
  }
}

onMounted(() => {
  const savedOrders = JSON.parse(localStorage.getItem('orders'));

  if (savedOrders) {
    ordersStore.orders = savedOrders;
  }

  form.product = ordersFilteredById[0].product;
  form.orderDate = ordersFilteredById[0].orderDate;
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
          <h2 class="text-3xl text-center font-semibold mb-6">Edit Order</h2>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Product Name</label>
            <input type="text" id="product" name="product" v-model="form.product"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Enter the product name" minlength="4"
              maxlength="20" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Order Date</label>
            <input type="date" id="orderDate" name="orderDate" v-model="form.orderDate"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Enter the order date" required />
          </div>
          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white text-2xl font-semibold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit">
              Update Order
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>