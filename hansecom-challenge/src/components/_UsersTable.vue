<script setup>
import { ref, computed } from 'vue';
import SearchUserForm from '@/components/SearchUserForm.vue';

const emit = defineEmits(['userDeleted']);

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
});

const searchFilter = ref('');
const orderDescending = ref(true);
const colToOrder = ref('');

const handleSearch = (searchInput) => {
  searchFilter.value = searchInput;
}

const sort = (colName) => {
  orderDescending.value = !orderDescending.value;
  colToOrder.value = colName;
}

const sortByCol = (columnName) => {
  let users = props.users;
  
  if(orderDescending.value){
    users = users.sort( (a, b) => a[columnName] > b[columnName] ? -1 : b[columnName] > a[columnName] ? 1 : 0);
  } else{
    users = users.sort( (a, b) => a[columnName] > b[columnName] ? 1 : b[columnName] > a[columnName] ? -1 : 0);
  }
  
  return users;
}

const filteredUsers = computed( () => {
  let users = props.users;
  
  users = sortByCol(colToOrder.value);

  if(searchFilter.value !== ''){
    users = props.users.filter( user => (
      user.fullName.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchFilter.value.toLowerCase())
    ));
  }

  return users;
})

const deleteUser = (id) => {
  emit('userDeleted', id );
}

</script>

<template>
  <p class="w-full text-center text-4xl text-slate-700 font-bold my-10">Users List</p>
  <div class="bg-white relative border rounded-lg">
    <SearchUserForm @search="handleSearch" />
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-4 py-3 cursor-pointer hover:bg-slate-300" @click="sort('id')">ID {{ orderDescending ? '&darr;' : '&uarr;' }}</th>
          <th class="px-4 py-3 cursor-pointer hover:bg-slate-300" @click="sort('fullName')">Full Name {{ orderDescending ? '&darr;' : '&uarr;' }}</th>
          <th class="px-4 py-3 cursor-pointer hover:bg-slate-300" @click="sort('email')">Email {{ orderDescending ? '&darr;' : '&uarr;' }}</th>
          <th class="px-4 py-3 text-center">Update User</th>
          <th class="px-4 py-3 text-center">Delete User</th>
          <th class="px-4 py-3 text-center">User Orders</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id" class="border-b">
          <td class="px-4 py-3 font-medium text-gray-900">{{ user.id }}</td>
          <td class="px-4 py-3 font-medium text-gray-900">{{ user.fullName }}</td>
          <td class="px-4 py-3">{{ user.email }}</td>
          <td class="text-center text-white">
            <RouterLink :to='"/user/" + user.id + "/edit"' class="px-4 py-2 bg-yellow-600 rounded-lg">Edit</RouterLink>
          </td>
          <td class="text-center text-white">
            <button @click="deleteUser(user.id)" class="px-4 py-2 bg-red-700 rounded-lg">X</button>
          </td>
          <td class="text-center text-white">
            <RouterLink :to='"/orders/" + user.id' class="px-4 py-2 bg-blue-700 rounded-lg">Orders</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>