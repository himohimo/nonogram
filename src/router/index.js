import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import GameBoard from '../views/GameBoard.vue'

const routes = [
  {
    path: '/',
    name: 'GameBoard',
    component: GameBoard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
