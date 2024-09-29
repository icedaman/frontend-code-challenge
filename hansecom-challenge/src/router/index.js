import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateUserView from '../views/CreateUserView.vue'
import UsersView from '../views/UsersView.vue'
import EditUserView from '@/views/EditUserView.vue'
import CreateOrderView from '@/views/CreateOrderView.vue'
import OrdersView from '@/views/OrdersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create-user',
      name: 'create-user',
      component: CreateUserView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/user/:id/edit',
      name: 'edit-user',
      component: EditUserView
    },
    {
      path: '/create-order',
      name: 'create-order',
      component: CreateOrderView
    },
    {
      path: '/orders/:id',
      name: 'order',
      component: OrdersView
    },
  ]
})

export default router