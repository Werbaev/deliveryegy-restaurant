import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'Product-definition',
    component: () => import('../views/home/components/Definition.vue')
  }
  // {
  //   path: '/product/:id',
  //   name: 'product-id',
  //   component: () => import('../views/products/index.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
