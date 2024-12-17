import { createRouter, createWebHistory } from 'vue-router';
import store from '../store'; 
import ExpenseListComponent from '../components/ExpenseListComponent.vue';
import DashboardComponent from '../components/DashboardComponent.vue';
import Login from '../components/LoginComponent.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: DashboardComponent, meta: { requiresAuth: true } },
  { path: '/expenses', component: ExpenseListComponent, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // If the route requires authentication and the user is not authenticated, redirect to login
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next({ path: '/' }); // Redirect to login
  } else {
    next(); // Otherwise, proceed to the requested route
  }
});

export default router;
