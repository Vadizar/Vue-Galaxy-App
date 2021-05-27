import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        name: 'Home',
        path: '/',
        component: () => import('#/Article'),
    },
    {
        name: 'Account',
        path: '/account',
        component: () => import('#/Account'),
    },
    {
        name: 'Not Found',
        path: '*',
        component: () => import('#/404'),
    },
]

export default new Router({
    mode: 'history',
    routes,
    linkActiveClass: '',
    linkExactActiveClass: 'active'
})