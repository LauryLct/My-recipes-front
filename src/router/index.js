import Vue from 'vue'
import VueRouter from 'vue-router'
import Signin from '@/components/Signin.vue'
import Signup from '@/components/Signup.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '', component: Signin },
    { path: '/signup', component: Signup }
  ]
})

