import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


// 路由配置表
const routes=[
    {
        path:'/login',
        name:'login',
        component:()=>import('@/views/login/Login.vue')
    }
]

const router =new VueRouter({
    routes
})

// 导出router对象
export default router