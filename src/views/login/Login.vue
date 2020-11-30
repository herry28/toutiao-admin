<template>
  <div class="login-container">
    <div class="logo"></div>
    <!-- 登录表单 -->
    <el-form 
      ref="userRef" 
      :model="user" 
      :rules="userRules"
      class="login-form"
    >
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code"></el-input>
      </el-form-item>
      <el-form-item prop="isAgree">
        <el-checkbox v-model="user.isAgree">我已阅读并同意用户协议</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" 
        @click="onLogin" class="login-btn"
        :loading="loginLoading"    
      >登录</el-button>
      </el-form-item>
    </el-form>
     <!-- /登录表单 -->
  </div>
</template>

<script>

import {login} from '@/api/user.js'

export default {
  name: 'Login',
  components: {},
  props: {},
  data () {
    return {
      // 用户表单数据
      user:{
        mobile:'13911111111',
        code:'246810',
        isAgree:false//是否勾选同意协议复选框
      },
      // 表单验证规则对象
      userRules:{
        mobile:[
          {required:true,message:'请输入手机号',trigger:'change'},
          {pattern:/^1[3|5|7|8|9]\d{9}$/,message:'请输入正确的手机号格式',trigger:'change'}
        ],
        code:[
          {required:true,message:'验证码不能为空',trigger:'change'},
          {pattern:/^\d{6}$/,message:'请输入正确的验证码格式',trigger:'change'}
        ],
        isAgree:[
          {validator:(rule,value,callback)=>{
            if(value){
              callback()
            }else{
              callback(new Error('请同意用户协议'))
            }
          },trigger:'change'}
        ]
      },
      loginLoading:false,//登录按钮的loading状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 1.获取表单数据，进行表单验证
      this.$refs.userRef.validate(valid=>{
        if(!valid){//表单验证失败，停止请求
          return
        }
        this.login()  // 表单验证通过，提交登录请求
      })   
    },
    async login () {
        // 开启登录按钮的loading
      this.loginLoading=true
      try{
        const {data:res} = await login(this.user)
        console.log(res)
        // 关闭登录按钮的loading
        this.loginLoading=false
        // 提示登录成功
        this.$message.success('登录成功')
        // 跳转到首页
        this.$router.push('/')
        // this.$router.push({
        //   name:'home'
        // })
      }catch (err) {
        // 关闭登录按钮的loading
        this.loginLoading=false
        // 提示登录失败
        this.$message.error('登录失败，手机号或密码错误')
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container{
  position:fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('./login_bg.jpg') no-repeat;
  background-size:cover ;
  .logo{
    background: url('./logo.png') no-repeat;
    background-color: #fff;
    margin-bottom: 50px;
    height: 57px;
    width: 300px;
  }
  .login-form{
    background-color: #fff;
    padding: 50px;
    min-width: 300px;
    .login-btn{
      width: 100%;
    }
  }
}
</style>
