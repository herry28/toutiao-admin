/**
 * 用户相关模块
 * */ 

 import request from '@/utils/request.js'

//  用户登录
 export const login = data=>{
   return request({
     method:'POST',
     url:'/mp/v1_0/authorizations',
     data
   })
 }


//  获取用户信息
 export const getUserProfile = ()=>{
  //  const user=JSON.parse(window.localStorage.getItem('user'))
   return request({
     method:'GET',
     url:'/mp/v1_0/user/profile',
    //  headers:{
    //    Authorization:`Bearer ${user.token}`
    //  }
   })
 }

//  修改用户头像，data必须传递FormData对象
export const updateUserPhoto=data=>{
  return request({
    method:'PATCH',
    url:'/mp/v1_0/user/photo',
    data
  })
}

//  修改用户基本信息
export const updateUserProfile=data=>{
  return request({
    method:'PATCH',
    url:'/mp/v1_0/user/profile',
    data
  })
}


 