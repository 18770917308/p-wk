import Vue from 'vue'
import Router from 'vue-router'
import wkIndex from '@/components/wk-index'
import category from '@/components/category'
import HotSupply from '@/components/hotSupply'
import sampleCenter from '@/components/samplecenter'
import newProduct from '@/components/newProduct'
import search from '@/components/search'
import excellentCom from '@/components/excellent-company'

Vue.use(Router)
export default new Router({
  routes: [
    {
      name: 'wkIndex',//首页
      path:'/',
      component:wkIndex
    },
    {
      name: 'category',//分类
      path:'/category',
      component:category
    },
    {
      name:'hotsupply',//热门供应
      path:'/hotSupply',
      component:HotSupply
    },
    {
      name:'samplecenter',//样品中心
      path:'/samplecenter',
      component:sampleCenter
    },
    {
      name:'newProduct',//新品上架
      path:'/newProduct',
      component:newProduct
    },
    {
      name:'search',
      path:'/search',
      component:search
    },
    {
      name:'excellentCom',
      path:'/excellentCom',
      component:excellentCom
    }

  ]
})
