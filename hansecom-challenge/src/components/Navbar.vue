<script setup>
import { RouterLink, useRoute } from 'vue-router';

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
}

</script>

<template>
  <nav class="bg-green-600 border-b border-green-500">
    <div class="mx-auto">
      <div class="grid grid-cols-3 gap-4 p-10 px-56 rounded-lg text-center">
        <RouterLink to="/create-user"
          :class="`${isActiveLink('/create-user') ? 'bg-green-900 text-white' : 'hover:bg-gray-900 hover:text-white bg-slate-200'} text-2xl font-bold px-3 py-2 rounded-lg shadow-xl`">
          Create User
        </RouterLink>
        <RouterLink to="/users"
          :class="`${isActiveLink('/users') ? 'bg-green-900 text-white' : 'hover:bg-gray-900 hover:text-white bg-slate-200'} text-2xl font-bold px-3 py-2 rounded-lg shadow-xl`">
          Show Users
        </RouterLink>
        <RouterLink to="/create-order"
          :class="`${isActiveLink('/create-order') ? 'bg-green-900 text-white' : 'hover:bg-gray-900 hover:text-white bg-slate-200'} text-2xl font-bold px-3 py-2 rounded-lg shadow-xl`">
          Create Order
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
