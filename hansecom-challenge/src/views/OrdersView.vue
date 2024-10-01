<script setup>
import { onMounted, h, computed } from 'vue';
import { useOrdersStore } from '@/stores/orders.js';
import ReusableTable from '@/components/ReusableTable.vue';
import DeleteOrderButton from '@/components/DeleteOrderButton.vue';
import EditOrderButton from '@/components/EditOrderButton.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const ordersStore = useOrdersStore();
const userId = route.params.id;

const columnsOrders = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'userId',
    header: 'User ID',
  },
  {
    accessorKey: 'product',
    header: 'Product',
  },
  {
    accessorKey: 'orderDate',
    header: 'Order Date',
  },
  {
    accessorKey: '',
    header: 'Update',
    cell: ({ row }) => h(EditOrderButton, { id: row.original.id }),
    enableSorting: false,
  },
  {
    accessorKey: '',
    header: 'Delete',
    cell: ({ row }) => h(DeleteOrderButton, { id: row.original.id }),
    enableSorting: false,
  },
];

const ordersfilteredByUserId = computed(() => {
  const ordersById = ordersStore.orders.filter(order => order.userId === Number(userId));
  return ordersById;
})

onMounted(() => {
  const savedOrders = JSON.parse(localStorage.getItem('orders'));

  if (savedOrders) {
    ordersStore.orders =  savedOrders;
  }
})

</script>

<template>
  <div class="2xl:px-48 py-2">
    <p class="w-full text-center text-4xl text-black font-bold my-10">Orders List</p>
    <ReusableTable :data="ordersfilteredByUserId" :columns="columnsOrders" />
  </div>
</template>
