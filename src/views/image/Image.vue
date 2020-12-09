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
          @change="loadImages()"
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
          class="img-item"
        >
          <el-image
            :src="img.url"
            fit="cover"
          />
          <div class="image-action">
            <el-button
              type="warning"
              circle
              size="mini"
              :icon="img.is_collected?'el-icon-star-on':'el-icon-star-off'"
              :loading="img.is_loading"
               @click="onCollect(img)"
            ></el-button>
            <el-button
              type="danger"
              circle
              size="mini"
              icon="el-icon-delete-solid"
              :loading="img.is_loading"
              @click="onDelete(img)"
            ></el-button>

            <!-- <i 
              :class="{
                'el-icon-star-on':img.is_collected,
                'el-icon-star-off':!img.is_collected,
              }"
              @click="onCollectImage(img)"
            ></i> -->
            <!-- <i class="el-icon-delete-solid"></i> -->
          </div>
        </el-col>
      </el-row>
      <!-- /素材区域 -->

      <!-- 页码区域 -->
      <el-pagination
        class="page"
        background
        layout="prev,pager,next"
        :page-size="pageSize"
        :total="totalCount"
        @current-change="onPageChange"
      ></el-pagination>
    <!-- 页码区域 -->
    </el-card>

    

    <!-- 上传素材对话框 -->
    <el-dialog
      title="上传素材"  
      :visible.sync="isUploadImgDialogVisible"
      :append-to-body="true"  
    >
      <el-upload
      v-if="isUploadImgDialogVisible"
        drag
        name="image"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeaders"
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div>将文件拖拽此处或<em>点击上传</em></div>
        <div class="el-upload-tip" slot="tip">只能上传jpg/pbg文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
    <!-- /上传素材对话框 -->
  </div>
</template> 

<script>

import { getImages,collectImage,deleteImage } from '@/api/image.js'

export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
  const user=JSON.parse(window.localStorage.getItem('user'))
    return {
      collect:false,//哪个raido-button被选中，默认查询全部素材
      images:[],//图片素材列表
      isUploadImgDialogVisible:false,//上传素材对话框的显示与隐藏
      uploadHeaders:{//图片上传请求头
        Authorization:`Bearer ${user.token}`
      },
      pageSize:10,//每页数据
      totalCount:0,//总的数据条数
      page:1,//当前页码
  }
 },
  computed: {},
  watch: {},
  created () {
    this.loadImages()
  },
  mounted () {},
  methods: {
    async loadImages(page=1){
      this.page=page//重置高亮页码，防止数据和页码不对应
      const {data:res} = await getImages({
        collect:this.collect,
        page,
        per_page:this.pageSize
      })
      // console.log(res)
      const results=res.data.results
      results.forEach(img=>{//给img对象添加is_loading属性
        img.is_loading=false
      })
      this.images=results
      this.totalCount=res.data.total_count
    },
    // onCollectChange(collect){
    //   // console.log(collect)
    //   this.loadImages()
    // },
    // 当页码改变时触发
    onPageChange(page){
      this.loadImages(page)
    },
    // 图片上传成功时触发
    onUploadSuccess(){
      this.isUploadImgDialogVisible=false//关闭对话框
      this.$message.success('图片上传成功')
      this.loadImages(this.page)//重新更新素材
    },
    // 当点击收藏按钮时触发
    async onCollect(img){
      img.is_loading=true//展示loading
      await collectImage(img.id,!img.is_collected)
      img.is_collected=!img.is_collected//更新视图
      img.is_loading=false//关闭loading
    },
    // 当点击删除按钮时触发
    async onDelete(img){
      img.is_loading=true
      await deleteImage(img.id)
      this.loadImages(this.page)//更新视图
      img.is_loading=false
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
.img-item{
  position: relative;
}
.image-action{
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  color: pink;
  background-color: rgba(78, 73, 73, 0.5);
  align-items: center;
  position: absolute;
  height: 40px;
  left: 5px;
  right: 5px;
  bottom: 4px;
}
.page{
  margin-top: 30px;
}
</style>
