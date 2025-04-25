import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/admin-stock',
      name: 'adminStock',
      // route level code-splitting
      // this generates a separate chunk (admin-stock.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AdminStockView.vue'),
    },
    {
      path: '/product-details',
      name: 'productDetails',
      // route level code-splitting
      // this generates a separate chunk (admin-stock.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProductDetailsView.vue'),
    },
    {
      path: '/tires',
      name: 'tires',
      component: () => import('../views/TiresView.vue'),
    },
    {
      path: '/tires/:id',
      name: 'tireId',
      component: () => import('../views/TireIDView.vue'),
    },
  ],
})

export default router
