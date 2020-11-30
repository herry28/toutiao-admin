import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


// 路由配置表
const routes=[
    {
        path:'/login',
        name:'login',
        component:()=>import('@/views/login/Login.vue')
    },
    {
        path:'/',
        component:()=>import('@/views/layout/Layout.vue'),
        children:[
           {
               path:'',
               name:'home',
               component:()=>import('@/views/home/Home.vue')
           }
        ]

    }
]

const router =new VueRouter({
    routes
})

// 导出router对象
export default router