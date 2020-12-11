/**
 * 全局通信总线（呼叫中心）
 */

import Vue from 'vue'
export default new Vue()



/***
 * a组件--->b组件通信
 * 1。a组件发布事件
 * import GlobalBus from '@/utils/global-bus.js'
 * GlobalBus.$emit('事件名'，参数)
 * 2.b组件注册事件
 * import GlobalBus from '@/utils/global-bus.js'
 * GlobalBus.$on('事件名'，(data)=>{
 * })
 * 
 */