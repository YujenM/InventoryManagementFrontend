// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../../pages/landing.vue'
import AdminLogin from '../../pages/AdminLogin.vue'
import AdminSignup from '../../pages/AdminSignup.vue'
import UserLogin from '../../pages/UserLogin.vue';
import UserSignup from '../../pages/UserSignup.vue';
import UserDashboard from '../../pages/Dashboard.vue';

const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/AdminLogin', name: 'AdminLogin', component: AdminLogin },
  { path: '/AdminSignup', name: 'AdminSignup', component: AdminSignup},
  {path: '/UserLogin', name: 'UserLogin', component: UserLogin },
  {path:'/UserSignup',name:'UserSignup', component: UserSignup},
  {path:'/UserDashboard',name:'UserDashboard',component:UserDashboard}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
