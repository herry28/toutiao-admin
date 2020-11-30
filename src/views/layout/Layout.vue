<template>
  <el-container class="layout-container">
    <!--侧边栏  -->
    <el-aside class="aside">
      <aside-nav class="aside-nav" />
    </el-aside >
    <!--/侧边栏  -->
    <el-container>
      <!-- 头部导航栏 -->
      <el-header class="header">header</el-header>
       <!-- /头部导航栏 -->
       <!-- 主体区域 -->
       <el-main class="main">
          <!-- 子路由出口 -->
          <router-view />
          <!--/ 子路由出口 -->
       </el-main>
       <!-- /主体区域 -->
    </el-container>  
  </el-container>
</template>

<script>

import AsideNav from './components/AsideNav.vue'

export default {
  name: 'Layout',
  components: {
    AsideNav
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.layout-container{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;right: 0;
}
.aside{
  background-color: pink;
 
}
/deep/.aside-nav{
    height: 100%;
  }
.header{
  background-color: skyblue;
}
.main{
  background-color: green;
}
</style>
