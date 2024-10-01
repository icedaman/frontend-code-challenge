<script setup>
import { useUsersStore } from '@/stores/users.js';
import { deleteUser } from '@/api/index.js';

defineProps({
  id: Number,
})

const usersStore = useUsersStore();

const handleDeleteUser = async (id) => {
  const users = await deleteUser(id, usersStore.users);
  usersStore.users = users;
 }

</script>

<template>
  <button @click="handleDeleteUser(id)" class="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-800">
    X
  </button>
</template>