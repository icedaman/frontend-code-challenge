<script setup>

import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const state = reactive({
  users: [],
  isLoading: true
});

const handleEditUser = (id) => {
  router.push(`/user/${id}/edit`)
}

const handleDeleteUser = async (id) => {
  try {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (confirm) {
      await axios.delete(`http://localhost:3333/users/${id}`);
      toast.success("User Successfully Deleted");
      router.push('/users');
    }
  } catch (error) {
    console.error('Error deleting user', error);
    toast.error("Error Deleting User");
  }
}

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3333/users`);
    state.users = response.data;
  } catch (error) {
    console.error('Error fetching users', error);
  } finally {
    state.isLoading = false;
  }
})
</script>

<template>
  <div v-for="user in state.users" :key="user.id"
    class="grid grid-cols-3 bg-slate-500 text-white text-2xl font-semibold mx-auto">
    <div class="p-2">
      <h1>{{ user.fullName }}</h1>
      <h2>{{ user.email }}</h2>
    </div>
    <div class="p-4">
      <button @click="handleEditUser(user.id)">Edit</button>
    </div>
    <div class="p-4">
      <button @click="handleDeleteUser(user.id)">X</button>
    </div>
  </div>
</template>
