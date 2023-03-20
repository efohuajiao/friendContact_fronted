<template>
  <!-- 头部导航 -->
  <van-nav-bar 
    title="标题"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    v-if="route.path != '/login'  "
    >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div id="content">
    <router-view></router-view>
  </div>
  

  <!-- 底部导航 -->
  <van-tabbar route id="bottom">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
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
    const route = useRoute()
    const router = useRouter()

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