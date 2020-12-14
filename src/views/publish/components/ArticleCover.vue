<template>
  <div class="article-cover" @click="onShowDialog">
    <div class="cover-wrap">
      <img :src="value" alt="" class="cover-img" ref="cover-img">
    </div>

    <!-- 上传文章封面的对话框 -->
    <el-dialog
      title="选择封面"
      :visible.sync="isDialogVisible"
      append-to-body
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <image-list
            ref="image-list"
            :is-show-add="false"
            :is-show-action="false"
            :is-show-selected="true"
          />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input 
            ref="file" 
            type="file"
            @change="onFileChange" 
          />
          <img width="200px" ref="preview-img">
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="onConfirm">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import {uploadImage} from '@/api/image.js'
import ImageList from '@/components/ImageList.vue'

export default {
  name: 'ArticleCover',
  components: {
    ImageList
  },
  props: {
    // coverImg:{
    //   type:String
    // }
    value:{
      type:String
    }
},
  data () {
    return {
      isDialogVisible:false,//控制上传文章封面对话框的显示与隐藏
      activeName:'second',//控制tab面板标签的激活状态
  }
 },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    //当点击文章封面组件时触发 
    onShowDialog(){
      this.isDialogVisible=true//展示对话框
    },
    // 当input框改变时触发
    onFileChange(){
      const file=this.$refs.file.files[0]//获取选择的file对象
      const blob=window.URL.createObjectURL(file)//将file对象转为blob数据
      this.$refs['preview-img'].src=blob//预览选择的图片
    },
    // 当点击确认时触发
    async onConfirm(){
      // 如果tab是上传图片，并且input-file中有选择的文件，才执行上传图片的操作
      if(this.activeName==='second'){
        const file=this.$refs.file.files[0]
        if(!file){
          this.$message('请先选择图片')
          return 
        }
        // 执行上传图片的操作
        const fd=new FormData()
        fd.append('image',file)//得到接口所需的参数
        const {data:res} = await uploadImage(fd)
        // console.log(res)
        this.isDialogVisible=false// 关闭弹出层
        this.$refs['cover-img'].src=res.data.url//展示上传的图片
        // 将图片地址发送给父组件Publish
        this.$emit('input',res.data.url)
      }else if(this.activeName==='first'){//选中的是素材库
        const imageList = this.$refs['image-list']//获取image-list组件
        const selected = imageList.selected//获取image-list组件中选中的图片索引
        if(selected===null){
          this.$message('请选择封面图片')
          return 
        }
        this.isDialogVisible=false//关闭对话框
        this.$emit('input',imageList.images[selected].url)//将图片地址发送给父组件Publish
      }
    }
  }
}
</script>

<style scoped lang="less">
.cover-wrap{
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
}
.cover-img{
  height: 150px;
  width: 100%;
}
</style>
