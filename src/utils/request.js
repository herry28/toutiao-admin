/**
 * 基于axios封装的请求模块
 */
import axios from 'axios'



// 创建一个axios实例（复制）
const request=axios.create({
    baseURL:'http://ttapi.research.itcast.cn',

})

// 导出请求方法
export default request