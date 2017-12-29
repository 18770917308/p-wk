import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import myTest from '@/components/myTest'
import forSlot from '@/components/forSlot'
import wkIndex from '@/components/wk-index'

Vue.use(Router)
export default new Router({
  routes: [
    {
      name: 'hello',
      path: '/hello',
      component: HelloWorld
    },
    {
      name: 'myTest',
      path: '/myTest/:id',
      component: myTest
    },
    {
      name: 'forSlot',
      path:'/forSlot',
      component: forSlot
    },
    {
      name: 'wkIndex',
      path:'/',
      component:wkIndex
    }
  ]
})
