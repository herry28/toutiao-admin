/**
 * 项目的启动入口
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'

// 加载element-ui组件库及element-ui组件库的样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 加载element-tiptap富文本编辑器及样式
// import {ElementTiptap} from 'element-tiptap';
// import 'element-tiptap/lib/index.css'



// 加载全局样式
import './styles/index.less'

// 全局注册element-ui
Vue.use(ElementUI)
// 全局注册element-tiptap
// Vue.use(ElementTiptap)

Vue.config.productionTip = false

// 创建vue根实例，通过render方法把App根组件渲染到#app入口节点
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
