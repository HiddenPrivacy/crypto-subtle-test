import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RSA from '../views/RSA.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rsa',
    name: 'RSA',
    component: RSA
  }
]

const router = new VueRouter({
  routes
})

export default router
