<template>
  <div id="app">
    <!-- <navbar></navbar> -->
    <!-- 路由容器 -->
    <transition name="a" mode="out-in">
      <router-view></router-view>
    </transition>
    <foot v-if="$store.state.isFootShow"></foot>
  </div>
</template>

<script>
// 引入Vue
import Vue from "vue"
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// 导入组件
// @ 别名  =>  src的绝对路径
// import navbar from "@/components/Navbar.vue"
import foot from "@/components/Foot.vue"
// import dorm from "@/components/Dorm.vue"
// 注册组件
// Vue.component('navbar',navbar)
Vue.component('foot',foot)
// Vue.component('dorm',dorm)
// ES6 导出规范
 export default{
  components:{
    // foot
  },
  data(){
    return{
      myname:'MTF'
    }
  },
  // 局部写法
  /* components:{
    navbar
  } */
}
</script>

<!-- scoped 加上样式就唯一了不会覆盖其它组件的样式 -->
<style lang="scss" scoped>
// $width:500px;
//   ul{
//     li{
//       background: pink;
//       width: $width;
//     }
//   }
body{
  // font-size: 1rem;
  font: .75rem/1.5 Tahoma,Helvetica,Arial,sans-serif;
  font-family: Microsoft YaHei,Tahoma,Helvetica,Arial,sans-serif;
}
</style>
