<template>
  <div class="hello">
  <link rel="stylesheet" href="src/css/myTest.css">
    <div class="swiper-box">
        <swiper :options="swiperOptions" ref="mySwiper1" :class v-if="swiperOptions">
          <swiper-slide v-for="(items,key) in lbt1" :key="items.id">
            <img v-bind:src="items.imgs" alt="">
          </swiper-slide>
          <!-- <swiper-slide>
            <img src="src/assets/image/img4.jpg" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="src/assets/image/img5.jpg" alt="">
          </swiper-slide> -->
          <div class="swiper-pagination1" slot="pagination"></div>
          <div class="swiper-button-prev1" slot="button-prev"></div>
          <div class="swiper-button-next1" slot="button-next"></div>
        </swiper>
    </div>
    <h1>{{ msg }}</h1>
    <h4><router-link to="/">index</router-link></h4>
    <h4><router-link v-bind:to="{name:'myTest',params: {id:id}}">Test(参数动态)</router-link></h4> <!--rounter-link传递参数 v-bind:to 缩写:to--> 
    
    <h4 @click="deleteOpt"><router-link to="/myTest/001">静态参数</router-link></h4>
    <h4 @click="deleteOpt"><router-link to="/forSlot">slot演示示例</router-link></h4>
    <!-- <h4><a v-link="{name: 'myTest',params: {id: msg}}"></a></h4>  --> 
    <h3>姓名：{{user.userName}},年龄：{{user.age}},性别：{{user.sex}},国籍：{{user.country}}</h3>
    <div class="content" @click="hideDiv">
      <!--阻止事件冒泡-->
      <h5 @click.stop="alertIt">alert only</h5>
    </div>
    <div>
      <input v-model="parentsMsg"><br>
      <child v-bind:message="parentsMsg"></child>
    </div>
  </div>
</template>
<script src="../js/HelloWorld.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.swiper-wrapper {
  margin-top: 10px;
  height: 500px;
}
.swiper-pagination-bullet.swiper-pagination-bullet-active{
  background: yellow;
}
.swiper-wrapper img {
  width: 100%;
  height: 100%;
}
.content{
  margin-top: 100px;
  width: 200px;
  height: 200px;
  background: #888;
}
</style>
