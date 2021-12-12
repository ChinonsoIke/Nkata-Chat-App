import Vue from 'vue'
import App from './App.vue'
import VueRouter from'vue-router'
import axios from 'axios'
import routes from './routes'
import store from './store'
import Echo from 'laravel-echo';

import './index.css'

Vue.use(VueRouter)

// Vue.prototype.$axios = axios


const router= new VueRouter(routes)

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    router.push('/login')
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isLoggedIn) {
      router.push("/");
      return;
    }
    next();
  } else {
    next();
  }
});

axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    console.log(error)
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
  
        originalRequest._retry = true;
        store.dispatch('LogOut')
        return router.push('/login')
    }
  }
})

Vue.prototype.$Pusher = require('pusher-js');

Vue.prototype.$Echo = new Echo({
    broadcaster: 'pusher',
    key: 'e291b5fb7fc720ac89e5',
    // wsHost: 'nkata.com.ng',
    // wsPort: 6001,
    cluster: 'eu',
    forceTLS: false,
    authEndpoint: `https://nkata.com.ng/broadcasting/auth`,
    disableStats: false,
    auth: {
        headers: {
            Authorization: `Bearer ${store.getters.UserToken}`
        },
    },

    // enabledTransports: ['ws', 'wss']
});

// Vue.prototype.$Echo.connector.pusher.config.authEndpoint = `https://nkata.com.ng/broadcasting/auth`;

Vue.prototype.$axios= axios;
axios.defaults.baseURL= 'https://nkata.com.ng/api'
// axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.UserToken}`
axios.defaults.withCredentials= true

new Vue({
  render: h => h(App),
  store,
  router,

  created () {
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      const userData = JSON.parse(userInfo)
      this.$store.commit('setUser', userData)
    }
  }
}).$mount('#app')
