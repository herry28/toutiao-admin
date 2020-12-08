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
           },
           {
               path:'/article',
               name:'article',
               component:()=>import('@/views/article/Article.vue')
           },
           {
               path:'/publish',
               name:'publish',
               component:()=>import('@/views/publish/Publish.vue')
           },
           {
               path:'/image',
               name:'image',
               component:()=>import('@/views/image/Image.vue')
           }
        ]

    }
]

const router =new VueRouter({
    routes
})

// 路由导航守卫
router.beforeEach((to,from,next)=>{
    const user=JSON.parse(window.localStorage.getItem('user'))
    if(to.path!=='/login'){// 如果要访问的页面不是/login，先校验登录状态
        if(user){//如果已登录，则放行
            next()
        }else{//未登录，跳转到登录页面
            next('/login')
        }
    }else{//是登录页面，直接放行
        next()
    }
})

// 导出router对象
export default router