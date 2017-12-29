<template>
    <div id="mytest">
    <link rel="stylesheet" href="src/css/myTest.css">
    <div class="swiper-box">
        <swiper :options="swiperOption" ref="mySwiper" :class>
          <swiper-slide v-for="(item,key) in lbt" :key="item.id">
          <!--尽量在使用v-for的时候提供key 除非遍历输出的dom内容非常简单，或者是可以依赖默认行为以获取性能上的提升-->
          <!--遍历纯数组时无-->
            <img v-bind:src="item.imgs" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
     </div>
     <!--插入自定义组件-->
  	<contact>
      <span v-if="false">1</span>
    </contact>
    <h1>this is a test</h1>
    <!--路由跳转-->
    <h4><router-link to="/">index</router-link></h4>
    <!--遍历数组-->
    <ul v-for="item in lists">
    	<li><h3 v-text="item"></h3></li>
    </ul>
    <!--绑定对象值-->
    <h3 class="user">姓名：{{user.userName}},年龄：{{user.age}},性别：{{user.sex}},国籍：{{user.country}}</h3>
    <input type="text" v-model='user.userName'>
    <!--绑定方法function-->
    <h3 @click="getAlert">alert</h3>
    <!--获取跳转地址传参-->
    <h4>获取传参{{$route.params.id}}</h4>
    <!--插入局部组件-->
    <part-child></part-child>
    <!--props用法 -->
    <ol>
      <todo-item v-for="item in sites" v-bind:todo='item' :key="item.id"></todo-item>
    </ol>
  </div>
</template>
<script src="../js/myTest.js"></script> 