import Vue from 'vue'
import Router from 'vue-router'
import pets from '@/views/pets.vue'
import user from '@/views/user.vue'
import authority from '@/views/authority.vue'
import petsKeep from '@/views/petsKeep.vue'
import petsRise from '@/views/petsRise.vue'
import userRise from '@/views/userRise.vue'
import petsService from '@/views/petsService.vue'
import login from '@/components/login.vue'
import admin from '@/components/admin.vue'
import record from '@/views/record.vue'
import trace from '@/views/trace.vue'
import community from '@/views/community.vue'
import person from '@/views/person.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      // component:login
    },
    {
      path: '/login',
      component: login,
    },
    {
      path:'/admin',
      redirect: '/views/user',
      name:'admin',
      component:admin,
      children:[
        {
          path: '/views/user',
          name:'user',
          component: user
        },
        {
          path: '/views/pets',
          name:'pets',
          component: pets
        },
        {
          path: '/views/authority',
          name:'authority',
          component: authority
        },
        {
          path: '/views/petsKeep',
          name:'petsKeep',
          component: petsKeep
        },
        {
          path: '/views/petsRise',
          name:'petsRise',
          component: petsRise
        },
        {
          path: '/views/userRise',
          name:'userRise',
          component: userRise
        },
        {
          path: '/views/petsService',
          name:'petsService',
          component: petsService
        },
        {
          path: '/views/record',
          name:'record',
          component: record
        },
        {
          path: '/views/trace',
          name:'trace',
          component: trace
        },
        {
          path: '/views/community',
          name:'community',
          component: community
        },
        {
          path: '/views/person',
          name:'person',
          component: person
        }
      ]
    },
    // {
    //   path: '*',
    //   redirect: '/login'
    // }
  ],
  // mode:"history" 
})
