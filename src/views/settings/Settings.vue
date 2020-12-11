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
            <el-form-item >
              <el-button 
                type="primary"
                :loading="updateProfileLoading" 
                @click="onUpdateUserProfile"
              >保存</el-button>
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
      @opened="onDialogOpened"
    >
     <!-- @closed="onDialogClosed" -->
      <div class="preview-img-wrap">
         <img 
          class="preview-img"
          :src="previewImg" 
          ref="previewImg"
         >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button 
          type="primary" 
          :loading="updateAvatarLoading"
          @click="onUpdateAvatar"
        >确认</el-button>
      </span>
    </el-dialog>
    <!-- /修改头像弹出层 -->
  </div>
</template>

<script>

import {
  getUserProfile,
  updateUserPhoto,
  updateUserProfile
} from '@/api/user.js'
// 导入cropperjs和样式库
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
// 导入全局通信模块
import GlobalBus from '@/utils/global-bus.js'

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
      cropper:null,//裁切器
      updateAvatarLoading:false,//更新头像确认按钮的loading状态
      updateProfileLoading:false,//保存按钮的loading状态
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
    },

    // 当修改头像对话框打开时触发
    onDialogOpened(){
      // 获取图片dom节点
      const img=this.$refs.previewImg
      // 初始化裁切器（必须基于可见的图片进行初始化，因此要在对话框完全打开的状态进行初始化）
      //裁切器第1次初始化好之后，若预览的图片发生变化，裁切器默认不会更新
      //若需预览图片变化，更新裁切器：
        // 1.裁切器.replace()
        // 2.裁切器.destroy()
      if(this.cropper){
        this.cropper.replace(this.previewImg)
        return
      }
      this.cropper=new Cropper(img,{
        aspectRatio:1,
        viewMode:1,
        dragMode:'none',
        cropBoxResizable:false,
        background:false,
      })
    },
    // 当修改头像对话框关闭时触发
    // onDialogClosed(){
    //   this.cropper.destroy()
    // }

    // 当点击确认时触发
    onUpdateAvatar(){
      this.updateAvatarLoading=true//开启loading
      // 1.获取裁切对象
      this.cropper.getCroppedCanvas().toBlob(async file=>{
        // console.log(file)
        const fd=new FormData()
        fd.append('photo',file)
        // 2.请求更新用户头像
        const {data:res} = await updateUserPhoto(fd)
        // console.log(res)
         // 3.关闭对话框
         this.isDialogVisible=false
        // 4.更新视图
        this.user.photo=window.URL.createObjectURL(file)//直接把裁切结果的文件对象转为blob数据本地预览
        // this.user.photo=res.data.photo//把服务器返回的图片进行展示，有点慢
        this.updateAvatarLoading=false//关闭loading
        this.$message.success('更新头像成功')
        GlobalBus.$emit('update-user',this.user)//发布更新用户的事件
     })    
    },

    // 当点击保存按钮时触发
    async onUpdateUserProfile(){
      this.updateProfileLoading=true//开启loading
      // 1.表单验证
      // 验证通过，提交表单
      const {data:res} = await updateUserProfile(this.user)
      // console.log(res)
      this.$message.success('保存成功')
      this.updateProfileLoading=false//关闭loading
      GlobalBus.$emit('update-user',this.user)//发布更新用户的事件
    }
  }
}
</script>

<style scoped lang="less">
.preview-img-wrap{
  .preview-img{
    display: block;
    min-width: 100%;
    height: 200px;
  }
}
</style>
