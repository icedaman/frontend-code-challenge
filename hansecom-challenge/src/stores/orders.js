import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useOrdersStore = defineStore('orders', () => {
  const ordersStore = reactive({
    orders: []
  });

  return ordersStore;
})


// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })
