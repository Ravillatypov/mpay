import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import CreateInvoice from '@/components/Invoice'
import InvoicesList from '@/components/InvoicesList'

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
      name: 'invoice-create',
      component: InvoicesList
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
