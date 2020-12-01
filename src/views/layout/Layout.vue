<template>
  <el-container class="layout-container">
    <!--侧边栏  -->
    <el-aside class="aside" width="auto">
      <aside-nav class="aside-nav" :is-collapse="isCollapse" />
    </el-aside >
    <!--/侧边栏  -->
    <el-container>
      <!-- 头部导航栏 -->
      <el-header class="header">
        <header-nav 
          :is-collapse="isCollapse" 
          @collapse="isCollapse=!isCollapse"
        />
      </el-header>
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
import HeaderNav from './components/HeaderNav.vue'

export default {
  name: 'Layout',
  components: {
    AsideNav,
    HeaderNav
  },
  props: {},
  data () {
    return {
      isCollapse:false,//控制侧边菜单栏的折叠状态
    }
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

 
}
.aside-nav{
    height: 100%;
  }
.header{

}
.main{
 
}
</style>
