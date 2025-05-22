import { createRouter, createWebHistory } from 'vue-router';
import Landing from '../../pages/landing.vue';
import AdminLogin from '../../pages/AdminLogin.vue';
import AdminSignup from '../../pages/AdminSignup.vue';
import UserLogin from '../../pages/UserLogin.vue';
import UserSignup from '../../pages/UserSignup.vue';
import UserDashboard from '../../pages/userDashboard.vue';

import AdminLayout from '../../pages/admin.vue'; // your layout with sidebar
import AdminDashboard from '../../pages/adminDashboard.vue';
import AdminOrder from '../../pages/adminOrder.vue';
import AdminProduct from '../../pages/adminProduct.vue';

const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/AdminLogin', name: 'AdminLogin', component: AdminLogin },
  { path: '/AdminSignup', name: 'AdminSignup', component: AdminSignup },
  { path: '/UserLogin', name: 'UserLogin', component: UserLogin },
  { path: '/UserSignup', name: 'UserSignup', component: UserSignup },
  { path: '/UserDashboard', name: 'UserDashboard', component: UserDashboard },

  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', name: 'AdminDashboard', component: AdminDashboard },
      { path: 'orders', name: 'AdminOrder', component: AdminOrder },
      { path: 'products', name: 'AdminProduct', component: AdminProduct },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
