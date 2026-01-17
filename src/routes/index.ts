import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: () => import('../views/Recipes.vue')
    },
    {
      path: '/recipes/:id',
      name: 'RecipeDetail',
      component: () => import('../views/RecipeDetail.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue')
    }
  ]
})

export default router