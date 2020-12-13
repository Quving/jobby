import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store/index'
import Dashboard from "@/views/Dashboard";
import Hosts from "@/views/HostsAndGroups";
import Jobs from "@/views/JobsAndGroups";
import CrudHost from "@/views/CrudHost";
import CrudJobGroup from "@/views/CrudJobGroup";
import CrudHostGroup from "@/views/CrudHostGroup";
import CrudJob from "@/views/CrudJob";
import Reports from "@/views/Reports";
import CrudReport from "@/views/CrudReport";

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
        path: '/jobgroup/:id/:action',
        name: 'CrudJobgroup',
        component: CrudJobGroup,
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) next()
            else next('/login')
        }
    },
    {
        path: '/report/:id/:action',
        name: 'CrudReport',
        component: CrudReport,
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) next()
            else next('/login')
        }
    },
    {
        path: '/job/:id/:action',
        name: 'CrudJob',
        component: CrudJob,
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) next()
            else next('/login')
        }
    },
    {
        path: '/reports',
        name: 'Reports',
        component: Reports,
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
        path: '/hostgroup/:id/:action',
        name: 'CrudHostGroups',
        component: CrudHostGroup,
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) next()
            else next('/login')
        }
    },
    {
        path: '/host/:id/:action',
        name: 'CrudHosts',
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
