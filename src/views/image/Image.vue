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
      <!--图片列表区域  -->
      <image-list />
      <!--/图片列表区域  -->
    </el-card>
  </div>
</template> 

<script>

import ImageList from '@/components/ImageList.vue'

export default {
  name: 'ImageIndex',
  components: {
    ImageList
},
  props: {},
  data () {
    return {

  }
 },
  computed: {},
  watch: {},
  created () {
    
  },
  mounted () {},
  methods: {
    
  }
}
</script>

<style scoped lang="less">
</style>
