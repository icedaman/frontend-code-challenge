<script setup>
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <div class="bg-gray-200 min-h-screen">
    <Navbar />
    <RouterView />
  </div>
</template>
