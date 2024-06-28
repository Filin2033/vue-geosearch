import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';
import Login from '@/views/Login.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'geo-search',
    component: Main,
    meta: { requiresAuth: true }, // Добавляем мета-поле для защиты маршрута
  },
  {
    path: '/:pathMatch(.*)*', // Ловим все остальные пути
    redirect: '/login', // Перенаправляем на /login
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Глобальный guard для проверки авторизации
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login'); 
  } else {
    next(); 
  }
});

export default router;