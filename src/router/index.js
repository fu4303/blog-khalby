import Vue from 'vue'
import VueRouter from 'vue-router'

import meta from 'vue-meta'

Vue.use(VueRouter);
Vue.use(meta);

const Home = () => import('../views/Home.vue');
const Post = () => import('../views/Post.vue');


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts/:slug',
    name: 'Post',
    component: Post
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
