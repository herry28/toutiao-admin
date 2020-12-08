/**
 * 素材请求相关模块
*/

import request from '@/utils/request.js'

// 上传图片素材
export const uploadImage=data=>{
  return request({
    method:'POST',
    url:'/mp/v1_0/user/images',
    data//一般图片上传的接口都要求把请求头中的Content-Type设置为multipart/form-data，
    // 但使用axios上传图片时不需手动设置，只要data是一个FormData对象即可
  })
}

// 获取图片素材
export const getImages=params=>{
  return request({
    method:'GET',
    url:'/mp/v1_0/user/images',
    params
  })
}