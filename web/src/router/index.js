import {createRouter, createWebHashHistory} from 'vue-router'
import {isMobileDevice} from "../utils/os.js";

const pcRoutes = [
    {
        path: '',
        name: 'DefaultLogin',
        component: () => import('@/views/pc/Login.vue')
    },
    {
        path: '/',
        name: 'Default',
        component: () => import('@/views/pc/Login.vue')
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/dashboard'
    },
    {
        path: '/',
        name: 'HOME',
        component: () => import('@/views/pc/Login.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/pc/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/pc/Register.vue')
    },
    {
        path: '/dashboard',
        name: 'DashBoard',
        component: () => import('@/views/pc/DashBoard.vue'),
        children: [
            // user start
            {
                path: '',
                name: 'Home',
                component: () => import('@/views/pc/Index.vue')
            },
            {
                path: '/index',
                name: 'Index',
                component: () => import('@/views/pc/Index.vue'),
            },
            {
                path: '/user',
                name: 'User',
                component: () => import('@/views/pc/user/User.vue'),
            },
            {
                path: '/trade',
                name: 'Trade',
                component: () => import('@/views/pc/user/CreateTransaction.vue'),
            },
            {
                path: '/send',
                name: 'Send',
                component: () => import('@/views/pc/user/TransactionSent.vue'),
            },
            {
                path: '/receive',
                name: 'Receive',
                component: () => import('@/views/pc/user/TransactionsReceived.vue'),
            },
            {
                path: '/addwallet',
                name: 'CreateWallet',
                component: () => import('@/views/pc/user/CreateWallet.vue'),
            },
            {
                path: '/listwallet',
                name: 'ListWallet',
                component: () => import('@/views/pc/user/WalletList.vue'),
            }, {
                path: '/postrader',
                name: 'PostTrader',
                component: () => import('@/views/pc/user/WalletTransfer.vue'),
            },
            // user end

            // admin start
            {
                path: '/userlist',
                name: 'UserList',
                component: () => import('@/views/pc/admin/User.vue')
            },
            {
                path: '/orderlist',
                name: 'OrderList',
                component: () => import('@/views/pc/admin/Transaction.vue')
            },
            {
                path: '/analy',
                name: 'Analy',
                component: () => import('@/views/pc/admin/Analy.vue')
            }
            // admin end
        ]
    }
]


const mRoutes = [
    {
        path: '',
        name: 'Default',
        component: () => import('@/views/m/Login.vue')
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/dashboard'
    },
    {
        path: '/',
        name: 'Login',
        component: () => import('@/views/m/Login.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/m/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/m/Register.vue')
    },
    {
        path: '/dashboard',
        name: 'DashBoard',
        component: () => import('@/views/m/DashBoard.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('@/views/m/Index.vue')
            },
            {
                path: '/index',
                name: 'Index',
                component: () => import('@/views/m/Index.vue')
            },
            {
                path: '/transition',
                name: 'Transition',
                component: () => import('@/views/m/Transition.vue')
            },
            {
                path: '/wallet',
                name: 'Wallet',
                component: () => import('@/views/m/Wallet.vue')
            },
            {
                path: '/user',
                name: 'User',
                component: () => import('@/views/m/User.vue')
            },
            {
                path: '/wallet/add',
                name: 'CreateWallet',
                component: () => import('@/views/m/CreateWallet.vue')
            },
            {
                path: '/wallet/detail',
                name: 'WalletDetail',
                component: () => import('@/views/m/WalletDetail.vue')
            },
            {
                path: '/wallet/transfer',
                name: 'WalletTransfer',
                component: () => import('@/views/m/WalletTransfer.vue'),
            },
            {
                path: '/user/detail',
                name: 'UserDetail',
                component: () => import('@/views/m/UserDetail.vue'),
            },
            {
                path: '/send',
                name: 'Send',
                component: () => import('@/views/m/TransactionSent.vue'),
            },
            {
                path: '/receive',
                name: 'Receive',
                component: () => import('@/views/m/TransactionsReceived.vue'),
            },
            {
                path: '/notification',
                name: 'Notification',
                component: () => import('@/views/m/Notification.vue'),
            }
        ]
    }
]

let routes = [];
if (isMobileDevice()) {
    console.log("mobile mode")
    routes = mRoutes
} else {
    console.log("pc mode")
    routes = pcRoutes
}

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: routes
})

export default router
