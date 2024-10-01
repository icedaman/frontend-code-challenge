import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', () => {
  const usersStore = reactive({
    users: []
  });

  return usersStore;
});