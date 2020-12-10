<template>
  <div class="setting-container">
      <el-card>
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" class="bread-crumb-nav">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">个人设置</a></el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑导航 -->
      </div>
      <el-row>
        <el-col :span="15">
          <el-form label-width="100px">
            <el-form-item label="编号">
              {{user.id}}
            </el-form-item>
            <el-form-item label="手机">
              {{user.mobile}}
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :offset="2" :span="4">
          <el-avatar
            shape="square"
            :size="150"
            fit="cover"
            :src="user.photo"
          ></el-avatar>
          <p @click="$refs.file.click()">点击修改头像</p>
          <input 
            type="file" 
            hidden 
            ref="file" 
            id="file"
            @change="onFileChange"
          >
          <!-- <label for="file">点击修改头像</label> -->
        </el-col>
      </el-row>
    </el-card>

    <!-- 修改头像弹出层 -->
    <el-dialog
      title="修改头像"
      :visible.sync="isDialogVisible"
      append-to-body
    >
      <img :src="previewImg" alt="" width="200">
      <span slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">确认</el-button>
      </span>
    </el-dialog>
    <!-- /修改头像弹出层 -->
  </div>
</template>

<script>

import {getUserProfile} from '@/api/user.js'

export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      user:{//用户信息
        email:'',
        id:null,
        intro:'',
        mobile:'',
        name:'',
        photo:''
      },
      isDialogVisible:false,//控制修改图片对话框的显示与隐藏
      previewImg:'',//用户选择的图片
  }
 },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    async loadUserProfile(){
     const {data:res} = await getUserProfile()
    //  console.log(res)
     this.user=res.data
    },
    // 当上传的图片改变时触发
    onFileChange(){
      // 获取用户选择的图片
      const file=this.$refs.file
      const blobData=window.URL.createObjectURL(file.files[0])
      this.previewImg=blobData
      this.isDialogVisible=true//展示弹出层，预览用户选择的图片
      this.$refs.file.value=''//解决选择相同文件不触发change事件
    }
  }
}
</script>

<style scoped lang="less">
</style>
