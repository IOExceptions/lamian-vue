import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home.vue')
const Menu = () => import('../views/Menu.vue')
const Cart = () => import('../views/Cart.vue')
const Profile = () => import('../views/Profile.vue')

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: Home },
  { path: '/menu', name: 'menu', component: Menu },
  { path: '/cart', name: 'cart', component: Cart },
  { path: '/me', name: 'me', component: Profile },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

export default router