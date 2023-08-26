import * as VueRouter from 'vue-router'
import routes from './router'
const router = VueRouter.createRouter({
     //  内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes
})
// 设置路由守卫
router.beforeEach((to,from,next)=>{
    
    // console.log(to,from)
    let token = localStorage.getItem("TOKEN")
    if(token){
        if(to.path === '/login' || to.path === '/register'){
            next('/index');
        }else{
            next();
        }
    }else{
        if(to.path !== '/login' && to.path !== 'register'){
            next('/login');
        }else{
            next();
        }
    }
    // if(token){
    //    if(to.path == '/login' || to.path == '/register'){
    //     next({path:"/index"})
    //    } else{
    //     next()
    //    }
    // }else {
    //     next()
    // }
    
    // //如果用户登录，不允许再跳转到登录页和注册页
    // if(!token && (to.path != '/login' || to.path != '/register')){
    //     router.push("login")
    // }
    //如果没登陆，则跳转到登录页

})

export default router;