<script setup>
import { onMounted, ref, computed } from 'vue';
import SearchForm from '@/components/SearchForm.vue';

const emit = defineEmits(['deleteUser']);

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
});

const searchFilter = ref('');

const handleSearch = (searchInput) => {
  searchFilter.value = searchInput;
}

const filteredUsers = computed( () => {
  if(searchFilter.value !== ''){
    return props.users.filter(user => (
      user.fullName.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchFilter.value.toLowerCase())
    ));
  }
  return props.users;
})

const deleteUser = (id) => {
  emit('deleteUser', id );
}
</script>

<template>
  <p class="w-full text-center text-4xl text-slate-700 font-bold my-10">Users List</p>
  <div class="bg-white relative border rounded-lg">
    <SearchForm @search="handleSearch" />
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-4 py-3">ID</th>
          <th class="px-4 py-3">Full Name</th>
          <th class="px-4 py-3">Email</th>
          <th class="px-4 py-3 text-center">Edit</th>
          <th class="px-4 py-3 text-center">Delete</th>
          <th class="px-4 py-3 text-center">Orders</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id" class="border-b">
          <td class="px-4 py-3 font-medium text-gray-900">{{ user.id }}</td>
          <td class="px-4 py-3 font-medium text-gray-900">{{ user.fullName }}</td>
          <td class="px-4 py-3">{{ user.email }}</td>
          <td class="text-center text-white">
            <RouterLink :to='"/orders/" + user.id' class="px-4 py-2 bg-yellow-600 rounded-lg">Edit User</RouterLink>
          </td>
          <td class="text-center text-white">
            <button @click="deleteUser(user.id)" class="px-4 py-2 bg-red-700 rounded-lg">Delete User</button>
          </td>
          <td class="text-center text-white">
            <RouterLink :to='"/orders/" + user.id' class="px-4 py-2 bg-blue-700 rounded-lg">Orders</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>