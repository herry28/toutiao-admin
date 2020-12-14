/**
 * 基于axios封装的请求模块
 */
import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router/router.js'
import {Message} from 'element-ui'



// 创建一个axios实例（复制）
const request=axios.create({
    // baseURL:'http://ttapi.research.itcast.cn',
    baseURL:'http://api-toutiao-web.itheima.net',//线上接口
    transformResponse:[data=>{
        try{
            return JSONbig.parse(data)
        }catch(err){
            return data
        }
    }]
})

// 请求拦截器
request.interceptors.request.use((config)=>{
    // console.log(config)
    const user=JSON.parse(window.localStorage.getItem('user'))
    if(user){//如果用户已登录，则统一设置token
        config.headers.Authorization=`Bearer ${user.token}`
    }
    return config //config是当前请求的配置对象，只有return config之后请求才能真的发送出去
})
// 响应拦截器
request.interceptors.response.use((response)=>{//所有响应为2xx都会进入这里

    return response
},(error)=>{//所有响应不是2xx都会进入这里
    if(error.response && error.response.status===401){
        // 清除本地存储中的用户登录状态
        window.localStorage.removeItem('user')
        // 跳转到登录页面
        router.push('/login')
        Message('登录状态无效，请重新登录')
    }else if(error.response.status===403){//没有操作权限
        Message('没有操作权限')
    }else if(error.response.status>=500){//服务端错误
        Message('服务端错误，请稍后重试')
    }
    return Promise.reject(error)
})

// 导出请求方法
export default request