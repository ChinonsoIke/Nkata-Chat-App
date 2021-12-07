import Home from './components/Home.vue'
import NotFound from './components/NotFound.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

export default {
    mode: 'history',
    base: process.env.BASE_URL,

    routes: [
        {
            path: '/',
            component: Home,
            meta: {requiresAuth: true}
        },
        {
            path: '/register',
            component: Register,
            meta: {guest: true}
        },
        {
            path: '/login',
            component: Login,
            meta: {guest: true}
        },
        {
            path: '*',

            component: NotFound
        },
    ]
}