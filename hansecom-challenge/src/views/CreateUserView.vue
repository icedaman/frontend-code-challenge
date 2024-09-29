<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

const form = reactive({
  fullName: '',
  email: '',
  password: ''
});

const handleSubmit = async () => {
  const newUser = reactive({
    fullName: form.fullName,
    email: form.email,
    password: form.password
  });

  try {
    const response = await axios.post(`http://localhost:3333/users`, newUser);
    toast.success('User Created Successfully');
    console.log(response)
  } catch (error) {
    console.error('Error creating user ', error);
  }
}



</script>

<template>
  <section class="bg-green-50">
    <div class="m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Create User</h2>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Full Name</label>
            <input type="text" id="fullName" name="fullName" v-model="form.fullName"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Enter your full name" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Email</label>
            <input type="text" id="email" name="email" v-model="form.email" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Enter your email" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Password</label>
            <input type="password" id="password" name="password" v-model="form.password"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Choose a password" required />
          </div>
          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white text-2xl font-semibold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
