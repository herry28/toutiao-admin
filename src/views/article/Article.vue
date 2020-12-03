<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">内容管理</a></el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑导航 -->
      </div>
      <!-- 数据筛选 -->
      <el-form ref="form" :model="form" label-width="80px" >
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option 
              v-for="(channel,index) in articleChannels"
              :key="index"
              :label="channel.name" 
              :value="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-button type="primary" @click="loadArticles(1)">查询</el-button>
      </el-form>
  <!-- /数据筛选 -->
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到{{totalCount}}条数据
      </div>
      <!-- 表格数据 -->
      <el-table
        :data="articles"
        style="width: 100%"
        class="table-list"
      >
        <el-table-column
          label="封面"
        >
          <template slot-scope="scope">
            <img
              v-if="scope.row.cover.images[0]" 
              :src="scope.row.cover.images[0]" alt="" 
              class="article-cover"
            >
            <img v-else src="./no-cover.gif" alt="" class="article-cover">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          label="状态"
        >
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
            <!-- <el-tag v-if="scope.row.status===0" type="warning">草稿</el-tag>
            <el-tag v-else-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status===3" type="danger">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status===4" type="info">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template>
            <el-button
              size="mini"
              circle
              icon="el-icon-edit"
              type="primary"
            ></el-button>
            <el-button
              size="mini"
              circle
              icon="el-icon-delete"
              type="danger"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /表格数据 -->

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="onCurrentChange"
        :page-size="pageSize"
      />
      <!-- /分页 -->
    </el-card>
  </div>
</template>

<script>

import { getArticles,getArticleChannels } from '@/api/article.js'

export default {
  name: 'Article',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      articles:[], //文章列表
      articleStatus:[//文章状态
        {status:0,text:'草稿',type:'info'},
        {status:1,text:'待审核',type:''},
        {status:2,text:'审核通过',type:'success'},
        {status:3,text:'审核失败',type:'warning'},
        {status:4,text:'已删除',type:'danger'}
      ],
      totalCount:0,//总数据条数
      pageSize:10,//每页显示多少条数据
      status:null,//查询文章的状态，不传就是全部
      articleChannels:[],//文章频道列表
  }
 },
  computed: {},
  watch: {},
  created () {
    this.loadArticleChannels()
    this.loadArticles()
  },
  mounted () {},
  methods: {
    async loadArticles(page=1){
      const {data:res} = await getArticles({
        page,
        per_page:this.pageSize,
        status:this.status

      })
      // console.log(res)
      this.articles=res.data.results
      this.totalCount=res.data.total_count
    },
    async loadArticleChannels(){
      const {data:res} = await getArticleChannels()
      console.log(res)
      this.articleChannels=res.data.channels
    },
    // 当页码改变时触发
    onCurrentChange(page){
      this.loadArticles(page)
    }
  }
}
</script>

<style scoped lang="less">
.filter-card{
  margin-bottom: 30px;
}
.table-list{
  margin-bottom: 20px;
}
.article-cover{
  width: 70px;
  background-size: cover;
}
</style>
