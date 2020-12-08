<template>
  <div class="image-container">
    <el-card>
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" class="bread-crumb-nav">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">素材管理</a></el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑导航 -->
      </div>
      <!-- 按钮区域 -->
      <div class="btn-wrap">
        <el-radio-group 
          v-model="collect" 
          @change="onCollectChange"
        >
          <el-radio-button :label="false"  
          >全部</el-radio-button>
          <el-radio-button :label="true"
          >收藏</el-radio-button>
        </el-radio-group>
        <el-button 
          type="success"
          @click="isUploadImgDialogVisible=true"
        >上传素材</el-button>
      </div>
      <!-- /按钮区域 -->
      <!-- 素材区域 -->
      <el-row :gutter="10">
        <el-col 
          :xs="12" 
          :sm="6" 
          :md="6" 
          :lg="4"
          v-for="(img,index) in images"
          :key="index"
        >
          <el-image
            :src="img.url"
            fit="cover"
          />
        </el-col>
      </el-row>
      <!-- /素材区域 -->
    </el-card>

    <!-- 上传素材对话框 -->
    <el-dialog
      title="上传素材"
      :visible.sync="isUploadImgDialogVisible"
      :append-to-body="true"
    >
      <el-upload
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="upload"
      ></el-upload>
    </el-dialog>
    <!-- /上传素材对话框 -->
  </div>
</template> 

<script>

import { getImages } from '@/api/image.js'

export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    return {
      collect:false,//哪个raido-button被选中，默认查询全部素材
      images:[],//图片素材列表
      isUploadImgDialogVisible:false,//上传素材对话框的显示与隐藏
  }
 },
  computed: {},
  watch: {},
  created () {
    this.loadImages(false)
  },
  mounted () {},
  methods: {
    async loadImages(collect=false){
      const {data:res} = await getImages({
        collect
      })
      // console.log(res)
      this.images=res.data.results
    },
    onCollectChange(collect){
      // console.log(collect)
      this.loadImages(collect)
    }
  }
}
</script>

<style scoped lang="less">
.btn-wrap{
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
}
</style>
