<template>
  <div class="publish-container">
    <el-card>
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" class="bread-crumb-nav">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">{{$route.query.id?'修改文章':'发布文章'}}</a></el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑导航 -->

        <!-- 表单区域 -->
        <el-form label-width="60px">
          <el-form-item label="标题">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="article.content" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select  v-model="article.channel_id" placeholder="请选择频道">
              <el-option 
                v-for="(channel,index) in channels"
                :key="index"
                :label="channel.name"
                :value="channel.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onPublish(false)">发布</el-button>
            <el-button @click="onPublish(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
        <!-- /表单区域 -->
      </div>
    </el-card>
  </div>
</template>

<script>

import { 
  getArticleChannels,
  addArticle,
  getArticle,
  updateArticle
} from '@/api/article.js'

export default {
  name: 'Publish',
  components: {},
  props: {},
  data () {
    return {
      article:{//文章表单对象
        title:'',//文章标题
        content:'',//文章内容
        cover:{//文章封面
          type:0,//封面类型：-1---自动，0---无图，1---1张，3---3张
          images:[],//封面图片地址
        },
        channel_id:null,//选中的频道id
      },
      channels:[],//文章频道列表
  }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticleChannels()
    // 由于发布和修改文章共用一个组件，所以需要判断
    // 如果路由路径参数中有id，则请求展示文章内容
    if(this.$route.query.id){
      this.loadArticle()
    } 
  },
  mounted () {},
  methods: {
    async loadArticleChannels(){
      const {data:res} = await getArticleChannels()
      // console.log(res)
      this.channels=res.data.channels 
    },

    async onPublish(draft){
      // 找到数据接口，封装请求方法
      // 请求提交表单
      // 在发布时需要判断是修改文章还是新增文章
      const articleId=this.$route.query.id
      if(articleId){//如果是修改文章，执行修改操作
        const {data:res} = await updateArticle(articleId,this.article.draft)
        console.log(res)
        this.$message.success('操作成功')
        // 跳转到文章管理页面
        this.$router.push('/article')
      }else{//如果是新增文章，执行添加文章操作
        const {data:res} =await addArticle(this.article,draft)
        // console.log(res)
        // 处理响应结果
        this.$message.success('发布成功')
        // 跳转到文章管理页面
        this.$router.push('/article')
    }
     
    },

    // 将需要编辑的文章先展示出来
    async loadArticle(){
      //找到数据接口，封装请求方法，请求获取数据，模板绑定数据
      const {data:res} = await getArticle(this.$route.query.id)
      console.log(res) //为什么没有获取到文章呢？？？？？？？
      this.article=res.data
    }
  }
}
</script>

<style scoped lang="less">
.bread-crumb-nav{
  margin-bottom: 30px;
}
</style>
