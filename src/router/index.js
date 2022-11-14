import { createRouter, createWebHistory } from 'vue-router'
import PlayPage from '@/pages/play/PlayPage.vue'
import RecordPage from '@/pages/record/RecordPage.vue'
import RankPage from '@/pages/rank/RankPage.vue'
import UserPage from '@/pages/user/UserPage.vue'
import NotFoundPage from '@/pages/error/NotFoundPage.vue'
import LoginPage from '@/pages/login/LoginPage'
import RegisterPage from '@/pages/register/RegisterPage'
import store from '@/store'
import BotPage from '@/pages/bot/BotPage'

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/play/',
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/play/',
        name: 'play',
        component: PlayPage,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/record/',
        name: 'record',
        component: RecordPage,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/rank/',
        name: 'rank',
        component: RankPage,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/user/',
        name: 'user',
        component: UserPage,
        meta: {
            requireAuth: true
        }
    },

    {
        path: '/404/',
        name: '404',
        component: NotFoundPage,
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/login/',
        name: 'login',
        component: LoginPage,
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/register/',
        name: 'register',
        component: RegisterPage,
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/bot/',
        name: 'bot',
        component: BotPage,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/404/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('jwt_token')

    if (to.meta.requireAuth && !store.state.user.isLogin) {
        if (token) {
            store.dispatch('me', {
                onSuccess: () => {
                    next()
                },
                onFail: () => {
                    next({ name: 'login' })
                }
            })
        } else {
            next({ name: 'login' })
        }
    } else {
        if (to.name === 'login') {
            if (store.state.user.isLogin) {
                next({ name: 'play' })
            } else {
                if (token) {
                    store.dispatch('me', {
                        onSuccess: () => {
                            next({ name: 'play' })
                        },
                        onFail: () => {
                            next()
                        }
                    })
                }else {
                    next()
                }
            }
        }else{
            next()
        }
    }
})

export default router
