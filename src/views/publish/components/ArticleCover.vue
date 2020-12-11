<template>
  <div class="article-cover" @click="onShowDialog">
    <div class="cover-wrap">
      <img src="" alt="" class="cover-img">
    </div>

    <!-- 上传文章封面的对话框 -->
    <el-dialog
      title="选择封面"
      :visible.sync="isDialogVisible"
      append-to-body
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          素材库
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          上传图片
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ArticleCover',
  components: {},
  props: {},
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
