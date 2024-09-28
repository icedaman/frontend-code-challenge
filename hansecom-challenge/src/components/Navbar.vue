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
      <div class="grid grid-cols-6 gap-4 p-10 rounded-lg text-center">
          <RouterLink
            to="/"
            :class="`${isActiveLink('/') ? 'bg-green-900 text-white' : 'hover:bg-gray-900 hover:text-white bg-slate-200'} text-2xl font-bold px-3 py-2 rounded-lg shadow-md`"
            >Home
          </RouterLink>        
          <RouterLink
            to="/create-user"
            :class="`${isActiveLink('/create-user') ? 'bg-green-900 text-white' : 'hover:bg-gray-900 hover:text-white bg-slate-200'} text-2xl font-bold px-3 py-2 rounded-lg shadow-md`"
            >Create User
          </RouterLink>        
          <RouterLink
            to="/users"
            :class="`${isActiveLink('/users') ? 'bg-green-900 text-white' : 'hover:bg-gray-900 hover:text-white bg-slate-200'} text-2xl font-bold px-3 py-2 rounded-lg shadow-md`"
            >Show Users
          </RouterLink>             
          <RouterLink
            to="/create-order"
            :class="`${isActiveLink('/create-order') ? 'bg-green-900 text-white' : 'hover:bg-gray-900 hover:text-white bg-slate-200'} text-2xl font-bold px-3 py-2 rounded-lg shadow-md`"
            >Create Order
          </RouterLink>        
          <RouterLink
            to="/show-orders"
            :class="`${isActiveLink('/show-orders') ? 'bg-green-900 text-white' : 'hover:bg-gray-900 hover:text-white bg-slate-200'} text-2xl font-bold px-3 py-2 rounded-lg shadow-md`"
            >Show Orders
          </RouterLink>        
      </div>
    </div>
  </nav>
</template>