/**
 * 基于axios封装的请求模块
 */
import axios from 'axios'



// 创建一个axios实例（复制）
const request=axios.create({
    baseURL:'http://ttapi.research.itcast.cn',

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


// 导出请求方法
export default request