<template>
  <!-- 头部导航 -->
  <van-nav-bar 
    :title="title"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    v-if="!route.meta.keepAlive  "
    >
    <template #right v-if="!route.meta.notSearch">
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view></router-view>
  </div>
  

  <!-- 底部导航 -->
  <van-tabbar route id="bottom" style="z-index:0" v-if="!route.meta.keepAlive  ">
    <van-tabbar-item to="/index" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
</van-tabbar>
</template>

<script setup>
    import {ref} from 'vue'
    //头部导航
    import { showToast } from 'vant';
    //引入路由创建router
    import { useRoute, useRouter } from 'vue-router';
    import routes from '@/router/router' 
    const route = useRoute()
    const router = useRouter()
    
    let DEFAULT_TITLE = "伙伴匹配"
    const title = ref(DEFAULT_TITLE)

    router.beforeEach((to,from)=>{
      const toPath = to.path;
      //找到路由中与即将去的路由相同的路由
      const route = routes.find((route)=>{
        return toPath == route.path;
      })
      // console.log()
      //将找到的路由的title赋给title
      title.value = route.meta.title
    })
    const onClickLeft = () => history.back();
    const onClickRight = () => router.push('/search');
  
    //底部导航
    const active = ref('index');
    // const onChange = (index) => showToast(`标签 ${index}`);
    // console.log(active.value)
</script>

<style scoped>
 #content{
  padding-bottom: 60px;
 }
</style>