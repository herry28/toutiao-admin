/**
 * 文章相关请求模块
 * */ 


import request from '@/utils/request.js'

//  获取文章列表
export const getArticles=params=>{
  return request({
    method:'GET',
    url:'/mp/v1_0/articles',
    params
  })
}

// 获取文章频道列表
export const getArticleChannels=()=>{
  return request({
    method:'GET',
    url:'/mp/v1_0/channels'
  })
}

// 删除文章
export const deleteArticle=articleId=>{
  return request({
    method:'DELETE',
    //凡是接口文档中有：xxx格式的字段，需要传递路径参数
    url:`/mp/v1_0/articles/${articleId}`
  })
}

// 发布(添加)文章
export const addArticle=(data,draft=false)=>{
  return request({
    method:'POST',
    url:'/mp/v1_0/articles',
    params:{
      draft//是否存为草稿（true为草稿）
    },
    data
  })
}

// 根据id获取文章
export const getArticle=articleId=>{
  return request({
    method:'GET',
    url:`/mp/v1_0/articles/${articleId}`,
  })
}

// 更新文章
export const updateArticle=(articleId,data,draft=false)=>{
  return request({
    method:'PUT',
    url:`/mp/v1_0/articles/${articleId}`,
    params:{
      draft//是否存为草稿（true为草稿）
    },
    data
  })
}