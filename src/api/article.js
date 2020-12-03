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