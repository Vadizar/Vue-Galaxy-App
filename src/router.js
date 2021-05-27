import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        name: 'Home',
        path: '/',
        component: () => import('./Article.vue'),
    },
    {
        name: 'Account',
        path: '/account',
        component: () => import('./Account.vue'),
    },
    {
        name: 'Not Found',
        path: '*',
        component: () => import('./pages/404.vue'),
    },
]

export default new Router({
    mode: 'history',
    routes,
    linkActiveClass: '',
    linkExactActiveClass: 'active'
})