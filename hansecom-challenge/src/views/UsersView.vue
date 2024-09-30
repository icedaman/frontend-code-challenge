<script setup>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import UsersTable from '@/components/UsersTable.vue';

const toast = useToast();

const state = reactive({
  users: [],
  isLoading: true
});

const getUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:3333/users`);
    state.users = response.data;
  } catch (error) {
    console.error('Error fetching users', error);
  } finally {
    state.isLoading = false;
  }
}

const handleDeleteUser = async (id) => {
  try {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (confirm) {
      await axios.delete(`http://localhost:3333/users/${id}`);
      toast.success("User Successfully Deleted");
    }
  } catch (error) {
    console.error('Error deleting user', error);
    toast.error("Error Deleting User");
  }

  getUsers();
}

onMounted(async () => {
  getUsers();
})

</script>

<template>
  <div class="px-48 py-2 ">
    <UsersTable :users="state.users" @deleteUser="handleDeleteUser" />
  </div>
</template>
