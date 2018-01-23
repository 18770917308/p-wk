import Vue from 'vue'
import Router from 'vue-router'
const wkIndex = ()=> import(/*webpackChunkName:"wkIndex"*/'@/components/wk-index')
const category = ()=> import(/*webpackChunkName:"category"*/'@/components/category')
const HotSupply = ()=> import(/*webpackChunkName:"HotSupply"*/'@/components/hotSupply')
const sampleCenter = ()=> import(/*webpackChunkName:"sampleCenter"*/'@/components/sampleCenter')
const newProduct = ()=> import(/*webpackChunkName:"newProduct"*/'@/components/newProduct')
const search = ()=> import(/*webpackChunkName:"search"*/'@/components/search')
const excellentCom = ()=> import(/*webpackChunkName:"excellentCom"*/'@/components/excellent-company')
const productList = ()=> import(/*webpackChunkName:"productList"*/'@/components/productList')
const productDetail = ()=> import(/*webpackChunkName:"productDetail"*/'@/components/productDetail')
const companyList = ()=> import(/*webpackChunkName:"companyList"*/'@/components/companyList')
const companyHome = ()=> import(/*webpackChunkName:"companyHome"*/'@/components/company/companyHome')
const find = ()=> import(/*webpackChunkName:"find"*/'@/components/find')
const newsDetail = ()=> import(/*webpackChunkName:"newsDetail"*/'@/components/newsDetail')
const buyDetail = ()=> import(/*webpackChunkName:"buyDetail"*/'@/components/buyDetail')

Vue.use(Router)
export default new Router({
  routes: [
    {
      name: 'wkIndex',//首页
      path:'/',
      component:wkIndex
    },
    {
      name:'find',//发现
      path:'/find',
      component:find
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
    },
    {
      name:'productDetail',//产品详情
      path:'/productDetail/:id',
      component:productDetail
    },
    {
      name:'companyList',//企业列表
      path:'/companyList/:keyword',
      component:companyList
    },
    {
      name:'companyHome',//企业主页
      path:'/company/companyHome',
      component:companyHome
    },
    {
      name:'newsDetail',//资讯详情
      path:'/newsDetail/:id',
      component:newsDetail
    },
    {
      name:'buyDetail',
      path:'/buyDetail/:id',
      component:buyDetail
    }
  ]
})
