<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
  <div class="text-center p-24  ">
    <p class="text-5xl font-bold text-black">Welcome to my Code Challenge</p>
    <p class="text-3xl font-semibold pt-10 text-slate-800">Let's get started!</p>
    <RouterLink to="/create-user" class="align-center justify-center contents">
      <button
        class="text-3xl font-semibold mt-14 px-16 py-24 bg-green-400 p-20 align-middle rounded-full text-white hover:bg-green-700 hover:scale-75 transition-all duration-500 ease-in-out hover:shadow-lime-700 shadow-2xl hover:text-3xl">
        Create User
      </button>
    </RouterLink>
  </div>
</template>
