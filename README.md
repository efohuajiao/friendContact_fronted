
1、设计头部的标签，引入vant的NavBar导航栏
设计底部TabBar,引入TabBar组件
设计插槽，将index和team组件引入，使用v-if进行显示判断

2、路由设计
路由分为主页、队伍页和用户页
引用路由时采用路由懒加载引用，优化性能
注意点：app.use(router) 需放在app.mount(’#app’)前面 不然加载时router-view、router-link等未被渲染

3、页面开发（路由页面）
    (1)搜索页面searchPage.vue
        分割线组件van-divider：已选标签、选择标签
        标签组件van-tag
        已选标签的关闭：
            使用数组的filter过滤方法过滤掉点击的数据，即使选择的数据不等于数组中的数组即可，保留原有的数据
        过滤搜索：
            使用
        执行搜索：
            使用query传递已选中的标签到搜索结果页
        将分类选择单独分离成一个组件，用以复用
        并使用emit实现子传父，实现搜索用户、修改用户标签的功能
    (2)用户信息页userPage.vue
        多次使用vant-cell逐个编写用户数据
        使用query传参，将需要修改的值传递给/user/edit路由进行修改
            需要的值：title、value
    (3)用户信息编辑页userEditPage.vue
        使用useRoute()创建route对象，获取user页传递过来的query参数，展示到页面上
    
    (4)搜索结果页searchResultPage.vue
        
    (5)用户修改页
    修改标签
    (6)主页
        用户页接口直接选择所有的用户返回给客户端
        
4、需要优化的事
将用户密码使用bcryotjs进行加密后放到数据库
使用pinia存储数据
用户的信息并没有进行校验
退出队伍、智能排序，路由导航


5、问题
    (1)解决只有登陆注册不需要token的问题
        目前登录不需要token
        想到的方法：更换登录和注册接口的前缀 已解决，后端.unless()正则加注册一个条件
    (2)用户头像存储到服务器的问题


6、后端
目前有登录、注册、用户信息、根据tag标签查找用户接口、修改用户信息接口、修改标签接口
登录接口有token，时效5小时
目前需要开发用户修改信息接口 已解决


8、3.19需完成
用户注册头像上传到数据库，修改头像、退出登录 
    退出登录已解决
    用户头像已解决


9、3.24完成
创建队伍时将用户的id和队伍id添加到user_team表中

10、最后优化
加入私密队伍密码