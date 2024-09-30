<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import SearchOrderForm from '@/components/SearchOrderForm.vue';
import { useRouter, useRoute } from 'vue-router';


const router = useRouter();
const route = useRoute();
const userId = route.params.id;

const emit = defineEmits(['deleteUser', 'editUser']);

// const props = defineProps({
//   users: {
//     type: Array,
//     required: true
//   }
// });

const searchFilter = ref('');
const orderDescending = ref(true);
const colToOrder = ref('');

const handleSearch = (searchInput) => {
  searchFilter.value = searchInput;
}

const sort = (colName) => {
  orderDescending.value = !orderDescending.value;
  colToOrder.value = colName;
}

const sortByCol = (columnName) => {
  let orders = props.orders;
  
  if(orderDescending.value){
    orders = orders.sort( (a, b) => a[columnName] > b[columnName] ? -1 : b[columnName] > a[columnName] ? 1 : 0);
  } else{
    orders = orders.sort( (a, b) => a[columnName] > b[columnName] ? 1 : b[columnName] > a[columnName] ? -1 : 0);
  }
  
  return orders;
}


//TODO
const deleteUser = (id) => {
  console.log(id)
  const newList = props.orders.filter(order =>order.id != id);
  console.log(newList)
}

const props = defineProps({
  orders: {
    type: Array,
    required: true
  }
})

const filteredOrders = computed( () => {
  let orders = props.orders;

  orders = sortByCol(colToOrder.value);
  orders = props.orders.filter( order => order.userId === Number(userId));
  
  if(searchFilter.value !== ''){
    orders = props.orders.filter( order => (
      // Number(order.id).includes(Number(searchFilter.value))
      (order.orderDate.includes(searchFilter.value) || 
      order.product.toLowerCase().includes(searchFilter.value.toLowerCase())) && 
      order.userId === Number(userId)
    ));
  }

  return orders;
})


</script>

<template>
  <p class="w-full text-center text-4xl text-slate-700 font-bold my-10">Orders List</p>
  <div class="bg-white relative border rounded-lg">
    <SearchOrderForm @search="handleSearch" />
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-4 py-3">User ID</th>
          <th class="px-4 py-3 cursor-pointer hover:bg-slate-300" @click="sort('id')">ID {{ orderDescending ? '&darr;' : '&uarr;' }}</th>
          <th class="px-4 py-3 cursor-pointer hover:bg-slate-300" @click="sort('product')">Product {{ orderDescending ? '&darr;' : '&uarr;' }}</th>
          <th class="px-4 py-3 cursor-pointer hover:bg-slate-300" @click="sort('orderDate')">Order Date {{ orderDescending ? '&darr;' : '&uarr;' }}</th>
          <th class="px-4 py-3 text-center">Update Order</th>
          <th class="px-4 py-3 text-center">Delete Order</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order.id" class="border-b">
          <td class="px-4 py-3 font-medium text-gray-900">{{ order.userId }}</td>
          <td class="px-4 py-3 font-medium text-gray-900">{{ order.id }}</td>
          <td class="px-4 py-3">{{ order.product }}</td>
          <td class="px-4 py-3">{{ order.orderDate }}</td>
          <td class="text-center text-white">
            <RouterLink :to='"/order/" + order.id + "/edit"' class="px-4 py-2 bg-yellow-600 rounded-lg">Edit</RouterLink>
          </td>
          <td class="text-center text-white">
            <button @click="deleteUser(order.id)" class="px-4 py-2 bg-red-700 rounded-lg">X</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>