/**
 * 用户相关模块
 * */ 

 import request from '@/utils/request.js'

//  登录
 export const login = data=>{
   return request({
     method:'POST',
     url:'/mp/v1_0/authorizations',
     data
   })
 }