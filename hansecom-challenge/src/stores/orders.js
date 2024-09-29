import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useOrdersStore = defineStore('orders', () => {
  const ordersStore = reactive({
    orders: []
  });

  return ordersStore;
});