//这里编写路由,并向外暴露
//使用路由懒加载，将不同的留有对应的组件分割成不同的代码块，然后当路由被访问的时候菜加载对应组件
export default [
    //用户登录页
    {
        path:"/login",
        component:()=>import("@/pages/userLogin.vue"),
        meta:{
            keepAlive:true,
            title:"登录",
        }
    },
    //主页
    {
        path:'/index',
        meta:{
            title:"伙伴匹配",
            isAuth:true
        },
        component:()=>import("@/pages/indexPage.vue")
    },
    //队伍页
    {
        path:'/team',
        component:()=>import("@/pages/teamPage.vue"),
        meta:{
            notSearch:true,
            title:"找队伍",
            isAuth:true

        }
    },
    {
        path:"/chat",
        name:"Chat",
        component: () => import("@/pages/chatRoom"),
        meta:{
            title:"聊天室",
            isAuth:true

        }
    },
    //队伍信息页
    {
        path:"/teamInfo",
        meta:{
            title:"队伍信息",
            isAuth:true

        },
        component:()=>import("@/pages/teamInfo.vue")
    },
    //用户信息页
    {
        path:"/userInfo",
        meta:{
            title:"当前信息",
            isAuth:true

        },
        component:()=>import("@/pages/userInfoPage.vue"),
    },
    //根据标签搜索用户页
    {
        path:"/search",
        meta:{
            title:"搜索伙伴",
            isAuth:true

        },
        component:()=>import("@/pages/searchPage.vue")
    },
    //修改信息页
    {
        name:"xiugai",
        path:'/userEdit',
        meta:{
            title:"修改信息",
            isAuth:true

        },
        component:()=>import("@/pages/userEditPage.vue")
    },
    //搜索用户标签结果页
    {
        path:'/userSearch',
        meta:{
            title:"用户列表",
            isAuth:true

        },
        component:()=>import("@/pages/searchResultPage.vue")
    },
    //个人页
    {
        path:"/user",
        meta:{
            title:"用户信息",
            isAuth:true

        },
        component:()=>import("@/pages/userPage.vue")
    },
    //用户注册页
    {
        path:'/register',
        meta:{
            title:"注册",
            isAuth:true

        },
        component:()=>import("@/pages/userRegister.vue"),
        meta:{
            keepAlive:true
        }
    },
    
    //修改用户标签页
    {
        path:"/editTags",
        meta:{
            title:"更新标签",
            isAuth:true

        },
        component:()=>import("@/pages/editUserTags.vue")
    },
    //创建队伍页
    {
        path:"/createTeam",
        meta:{
            title:"创建队伍",
            isAuth:true

        },
        component:()=>import("@/pages/createTeamPage.vue")
    },
    //用户创建的队伍页
    {
        path:"/currentHumanTeam",
        meta:{
            title:"我创建的队伍",
            isAuth:true

        },
        component:()=>import("@/pages/currentHumanTeam")
    },
    //用户加入的队伍
    {
        path:"/teamofuserjoin",
        meta:{
            title:"我加入的队伍",
            isAuth:true

        },
        component:()=>import("@/pages/teamOfUserJoin")
    },
    //重定向
    { 
        path: "/", 
        redirect: "/login" 
    }
]