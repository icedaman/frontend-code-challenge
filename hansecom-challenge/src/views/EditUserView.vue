<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();
const router = useRouter();
const route = useRoute();

const userId = route.params.id;

const form = reactive({
  fullName: '',
  email: '',
  password: ''
});

const state = reactive({
  user: {},
  isLoading: true
});

const handleSubmit = async () => {
  const editedUser = reactive({
    fullName: form.fullName,
    email: form.email,
    password: form.password
  });

  try {
    await axios.put(`http://localhost:3333/user/${userId}/edit`, editedUser);
    toast.success('User Updated Successfully');
    router.push('/users');
  } catch (error) {
    console.error('Error updating user ', error);
    toast.error('Error Updating User');
  }
}

onMounted( async ()=> {
  console.log(userId)
  try {
    const response = await axios.get(`http://localhost:3333/user/${userId}`);
    state.user = response.data;
    form.fullName = state.user.full_name;
    form.email = state.user.email;
  } catch (error) {
    console.error('Error fetching users ', error);
  } finally {
    state.isLoading = false;
  }
});

</script>

<template>
  <section class="bg-green-50">
    <div class="m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Edit User</h2>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              v-model="form.fullName"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Enter your full name"
              required
            />
          </div> 
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              v-model="form.email"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Enter your email"
              required
            />
          </div> 
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              v-model="form.password"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Choose a password"
              required
            />
          </div>  
          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white text-2xl font-semibold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Edit User
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
