import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store/index'
import Dashboard from "@/views/Dashboard";
import Hosts from "@/views/Hosts";
import Jobs from "@/views/Jobs";
import AddJob from "@/views/AddJob";
import CrudHost from "@/views/CrudHost";
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
        path: '/jobgroup/create',
        name: 'AddJobgroup',
        component: AddJobGroup,
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) next()
            else next('/login')
        }
    },
    {
        path: '/job/create',
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
        path: '/hostgroup/create',
        name: 'AddHostGroups',
        component: AddHostGroup,
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) next()
            else next('/login')
        }
    },
    {
        path: '/host/:id/:action',
        name: 'AddHosts',
        component: CrudHost,
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
