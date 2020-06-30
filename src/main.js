import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import './app.styl'

Vue.use(VueRouter);

// Определяем компоненты для маршрутов
const routes = [
  {
    path: '/',
    component: require('./Article').default
  }
];

// Создаём маршрутизатор
const router = new VueRouter({
  mode: 'history', // History API
  //path: '*', component: NotFoundComponent, // 404
  routes, // сокращение `routes: routes`
  linkActiveClass: "",
  linkExactActiveClass: "active",
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});