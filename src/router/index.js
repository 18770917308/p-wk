import Vue from 'vue'
import Router from 'vue-router'
import wkIndex from '@/components/wk-index'
import category from '@/components/category'
import HotSupply from '@/components/hotSupply'
import sampleCenter from '@/components/samplecenter'
import newProduct from '@/components/newProduct'
import search from '@/components/search'
import excellentCom from '@/components/excellent-company'
import productList from '@/components/productList'

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
      name:'search',//全站搜索
      path:'/search',
      component:search
    },
    {
      name:'excellentCom',//优质企业
      path:'/excellentCom',
      component:excellentCom
    },
    {
      name:'productList',//产品列表
      path:'/productList/:keyword',
      component:productList
    }
  ]
})
