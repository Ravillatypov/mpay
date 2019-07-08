import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Wallet from '@/components/Wallet'
import CreateWithdraw from '@/components/Withdrawal'
import WithdrawList from '@/components/WithdrawList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/Auth',
      name: 'auth-page',
      component: Auth
    },
    {
      path: '/Wallet',
      name: 'wallet',
      component: Wallet
    },
    {
      path: '/CreateWithdraw',
      name: 'CreateWithdraw',
      component: CreateWithdraw
    },
    {
      path: '/WithdrawList',
      name: 'WithdrawList',
      component: WithdrawList
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
