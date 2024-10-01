<script setup>
import { onMounted, h } from 'vue';
import ReusableTable from '@/components/ReusableTable.vue';
import { useUsersStore } from '@/stores/users.js';
import { getUsers } from '@/api/index.js';
import EditUserButton from '@/components/EditUserButton.vue';
import OrdersButton from '@/components/OrdersButton.vue';
import DeleteUserButton from '@/components/DeleteUserButton.vue';

const usersStore = useUsersStore();

const columnsUsers = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: '',
    header: 'View',
    cell: ({ row }) => h(OrdersButton, { id: row.original.id }),
    enableSorting: false,
  },
  {
    accessorKey: '',
    header: 'Update',
    cell: ({ row }) => h(EditUserButton, { id: row.original.id }),
    enableSorting: false,
  },
  {
    accessorKey: '',
    header: 'Delete',
    cell: ({ row }) => h(DeleteUserButton, { id: row.original.id }),
    enableSorting: false,
  },
];

onMounted(async () => {
  usersStore.users = await getUsers();
})

</script>

<template>
  <div class="2xl:px-48 py-2">
    <p class="w-full text-center text-4xl text-black font-bold my-10">Users List</p>
    <ReusableTable :data="usersStore.users" :columns="columnsUsers" />
  </div>
</template>
