import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store/index'
import Dashboard from "@/views/Dashboard";
import Hosts from "@/views/Hosts";
import Jobs from "@/views/Jobs";
import AddJob from "@/views/AddJob";
import AddHost from "@/views/AddHost";
import AddJobGroup from "@/views/AddJobGroup";
import AddHostGroup from "@/views/AddHostGroup";

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
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) next()
            else next('/login')
        }
    },
    {
        path: '/jobs',
        name: 'Jobs',
        component: Jobs,
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) next()
            else next('/login')
        }
    },
    {
        path: '/jobgroups/create',
        name: 'AddJobgroup',
        component: AddJobGroup,
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) next()
            else next('/login')
        }
    },
    {
        path: '/jobs/create',
        name: 'AddJob',
        component: AddJob,
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) next()
            else next('/login')
        }
    },
    {
        path: '/hosts',
        name: 'Hosts',
        component: Hosts,
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) next()
            else next('/login')
        }
    },
    {
        path: '/hostgroups/create',
        name: 'AddHostGroups',
        component: AddHostGroup,
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) next()
            else next('/login')
        }
    },
    {
        path: '/hosts/create',
        name: 'Hosts',
        component: AddHost,
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) next()
            else next('/login')
        }
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
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) next()
            else next('/login')
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
