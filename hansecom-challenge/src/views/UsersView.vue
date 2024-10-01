<script setup>
import { onMounted } from 'vue';
import UsersTable from '@/components/UsersTable.vue';
import { useUsersStore } from '@/stores/users.js';
import { getUsers, deleteUser } from '@/api/index.js';

const usersStore = useUsersStore();

const handleDeleteUser = async (id) => {
  const users = await deleteUser(id, usersStore.users);
  usersStore.users = users;
}

onMounted(async () => {
  usersStore.users = await getUsers();
})

</script>

<template>
  <div class="px-48 py-2 ">
    <UsersTable :users="usersStore.users" @userDeleted="handleDeleteUser" />
  </div>
</template>
