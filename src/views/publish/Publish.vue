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
        <el-form 
          label-width="60px"
          ref="articleFormRef"
          :model="article"
          :rules="articleRules"
        >
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input v-model="article.content" type="textarea"></el-input>
            <!-- 富文本编辑器 -->
            <!-- <el-tiptap 
              v-model="article.content" 
              :extensions="extensions"
              height='350'
              placeholder='请输入文章内容'
            ></el-tiptap> -->
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <!-- 文章封面组件 -->
            <template v-if="article.cover.type>0">
              <article-cover 
                v-for="(cover,index) in article.cover.type"
                :key="index"
              />
            </template>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
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

import ArticleCover from './components/ArticleCover.vue'
import { 
  getArticleChannels,
  addArticle,
  getArticle,
  updateArticle
} from '@/api/article.js'
import { uploadImage } from '@/api/image.js'

import {
  // 需要的 extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  TextColor,
  CodeBlock
} from 'element-tiptap';
import 'element-tiptap/lib/index.css'



export default {
  name: 'Publish',
  components: {
    'el-tiptap':ElementTiptap,
    ArticleCover
},
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
      extensions: [//富文本编辑器的extensions，它们将会按照你声明的顺序被添加到菜单栏和气泡菜单中
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Image({
          // 默认将图片转为base64，若需自定义图片上传
          uploadRequest(file){
            const fd=new FormData()
            fd.append('image',file)
            return uploadImage(fd).then(res=>{//返回Promise对象
              return res.data.data.url//返回最后的结果
            }) 
          }
        }),
        new TextColor(),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new CodeBlock()
      ],
      articleRules:{//发布文章表单的验证规则对象
        title:[
          {required:true,message:'请输入文章标题',trigger:'blur'},
          {min:5,max:30,message:'长度在5-30个字符',trigger:'blur'}
        ],
        content:[
          {required:true,message:'请输入文章内容',trigger:'blur'},
          { validator(rule,value,callback){
              if(value==='<p></p>'){//验证失败
                callback(new Error('请输入文章内容'))
              }else{//验证通过
                callback()
              }
            }
          }
        ],
        channel_id:[
          {required:true,message:'请选择文章频道'},
        ]
      }
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

    onPublish(draft){
      this.$refs.articleFormRef.validate(async valid=>{
        if(!valid){//验证失败
          return //阻止表单提交
        }
        // 验证通过，提交表单
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
          console.log(res)
          // 处理响应结果
          this.$message.success('发布成功')
          // 跳转到文章管理页面
          this.$router.push('/article')
          }
        }) 
      },

    // 将需要编辑的文章先展示出来
    async loadArticle(){
      //找到数据接口，封装请求方法，请求获取数据，模板绑定数据
      const {data:res} = await getArticle(this.$route.query.id)
      // console.log(res) //为什么没有获取到文章呢？？？？？？？
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
