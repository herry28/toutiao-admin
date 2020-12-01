<template>
  <div class="header-nav-container">
    <div class="header-left">
      <i 
        :class="{
        'el-icon-s-fold':isCollapse,
        'el-icon-s-unfold':!isCollapse
        }"
        @click="$emit('collapse')"
      ></i>
      <span>黑马头条后台管理系统</span>
    </div>
    <el-dropdown>
      <div class="user-profile">
        <img :src="user.photo" alt="" class="avatar">
        <span>{{ user.name }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

import {getUserProfile} from '@/api/user.js'

export default {
  name: 'HeaderNav',
  components: {
  
  },
  props: {
    isCollapse:{
      type:Boolean
    }
  },
  data () {
    return {
      user:{},//登录的用户信息
  }
 },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    async loadUserProfile () {
      const {data:res} = await getUserProfile()
      // console.log(res)
      this.user=res.data
    },
    onLogout(){
      this.$confirm('确认退出吗？','退出提示',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        window.localStorage.removeItem('user')// 清除用户的登录状态
        this.$router.push('/login')// 跳转到登录页面
      }).catch(()=>{
        this.$message({
          type:'info',
          message:'已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.header-nav-container{
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.el-icon-s-fold,.el-icon-s-unfold{
  margin-right: 10px;
}
.user-profile{
  display: flex;
  align-items: center;
  .avatar{
    width: 40px;
    height: 40px;
    border-radius:50%;
    margin-right: 10px;

  }
}
</style>
