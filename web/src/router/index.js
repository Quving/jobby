import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store/index'
import Dashboard from "@/views/Dashboard";
import Hosts from "@/views/Hosts";
import Jobs from "@/views/Jobs";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/jobs',
        name: 'Jobs',
        component: Jobs,
    },
    {
        path: '/hosts',
        name: 'Hosts',
        component: Hosts,
    },
    {
        path: '/',
        name: 'Home',
        component: Dashboard,
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) next()
            else next('/login')
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
