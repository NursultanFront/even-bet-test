import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresUnauth: true }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore()
//   const isAuth = userStore.isAuth

//   if (to.matched.some((record) => record.meta.requiresAuth) && !isAuth) {
//     next({ name: 'login' })
//   } else if (to.matched.some((record) => record.meta.requiresUnauth) && isAuth) {
//     next({ name: 'home' })
//   } else {
//     next()
//   }
// })

export default router
