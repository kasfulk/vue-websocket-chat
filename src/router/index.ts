import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import UsernameInputVue from '@/views/UsernameInput.vue'
// @ts-ignore
import GroupList from '@/views/GroupList.vue'
import GroupChat from '@/views/GroupChat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UsernameInputVue
    },
    {
      path: '/group',
      name: 'group-list',
      component: GroupList
    },
    {
      path: '/group/:channel',
      name: 'group-chat',
      component: GroupChat
    }
  ]
})

export default router
