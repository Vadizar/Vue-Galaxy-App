import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import './app.styl'

Vue.use(VueRouter);

// Components for router
const routes = [
  {
    path: '/',
    component: require('./Article').default
  },
  {
    path: '/account',
    component: require('./Account').default
  }
];

// Create router
const router = new VueRouter({
  mode: 'history', // History API
  //path: '*', component: NotFoundComponent, // 404
  routes, // `routes: routes`
  linkActiveClass: '',
  linkExactActiveClass: 'active',
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});