<template>
  <div class="comment-container">
    <el-card>
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" class="bread-crumb-nav">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">评论管理</a></el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑导航 -->
      </div>

      <!-- 表格区域 -->
      <el-table :data="articles" class="table-list" stripe> 
        <el-table-column label="标题" prop="title">
        </el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count">
        </el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.comment_status?'正常':'关闭'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" >
           <template slot-scope="scope">
             <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.isDisabled"
              @change="onStatusChange(scope.row)"
             >
             </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- /表格区域 -->

      <!-- 页码区域 -->
      <el-pagination
        :current-page.sync="currentPage"
        :page-sizes="[10,20,50,100]"
        :page-size.sync="pageSize"
        :total="totalCount"
        layout="total,sizes,prev,pager,next,jumper"
        background
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      >
      </el-pagination>
      <!-- /页码区域 -->
    </el-card>
  </div>
</template>

<script>

import {getArticles,updateCommentStatus} from '@/api/article.js'

export default {
  name: 'Comment',
  components: {},
  props: {},
  data () {
    return {
      articles:[],//展示的文章表格数据
      totalCount:0,//总的数据条数
      pageSize:10,//每页展示的数据
      currentPage:1,//当前展示的页数
  }
 },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    //当每页展示的数据条数变化时触发 
    onSizeChange(){
      this.loadArticles()
    },
    // 当页码变化时触发
    onCurrentChange(page){
      this.currentPage=page
      this.loadArticles()
    },
    async loadArticles(){
      const {data:res} = await getArticles({
        response_type:'comment',
        page:this.currentPage,
        per_page:this.pageSize
      })
      console.log(res)
      const results=res.data.results
      results.forEach(article=>{//给文章对象添加个isDisabled属性
        article.isDisabled=false
      })
      this.articles=results
      this.totalCount=res.data.total_count
    },
    // 切换开关时触发
    async onStatusChange(article){
      console.log(article)
      article.isDisabled=true//开启禁用
      await updateCommentStatus(article.id.toString(),article.comment_status)
      article.isDisabled=false//关闭禁用
      this.$message({
        type:'success',
        message:article.comment_status?'开启文章评论':'关闭文章评论'
      })
   }
  }
}
</script>

<style scoped lang="less">
.table-list{
  margin-bottom:30px;
  width:100%;
}
</style>
