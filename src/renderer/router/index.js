import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import CreateInvoice from '@/components/Invoice'
import InvoicesList from '@/components/InvoicesList'
import Wallet from '@/components/Wallet'
import CreateWithdraw from '@/components/Withdrawal'

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
      path: '/Invoice',
      name: 'invoice-create',
      component: CreateInvoice
    },
    {
      path: '/InvoiceList',
      name: 'invoice-view',
      component: InvoicesList
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
      path: '*',
      redirect: '/'
    }
  ]
})
