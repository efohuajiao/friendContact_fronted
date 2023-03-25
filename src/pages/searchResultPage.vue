<template>
  
    <van-card
      v-for="userList in userListData"
      :desc="userList.profile"
      :title="userList.username"
      :thumb="userList.avatarUrl"
    >
      <template #tags>
        <van-space>
          <van-tag plain type="danger" v-for="tag in userList.tags">{{
            tag
          }}</van-tag>
        </van-space>
      </template>
      <template #footer>
        <van-button size="mini" @click="showUserInfo(userList.id)">联系我</van-button>
      </template>
    </van-card>
    <!-- 搜索提示 -->
  <van-empty
    v-if="!userListData || userListData.length < 1"
    image="search"
    description="搜索结果为空"
  />
  <van-overlay :show="show" @click="show = false">
  <div class="wrapper">
    <div class="block" v-for="user in userInfo">
      <img :src="user.avatarUrl" alt="">
      <van-space direction="vertical" fill :size="20" style="margin-top: 20px">
        <van-cell title="伙伴编号" :value="user.planetCode" icon="manager-o" />
        <van-cell title="伙伴简介" :value="user.profile" icon="cluster-o"/>
        <van-cell title="联系方式" :value="user.phone" icon="friends-o" />
      </van-space>
    </div>
  </div>
</van-overlay>
</template>

<script setup>
import { reactive, ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import requests from "@/api/request";
import {reqUserInfo} from '@/api'
// const user = {
//     id:1,
//     username:"花椒",
//     userAccount:"eatHuaJiao",
//     avatarUrl:"https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
//     gender:"男",
//     profile:"一个冷漠的男子,屹立武林独领风骚",
//     phone:"13412134141",
//     email:"1290129@qq.com",
//     planeCode:'1234',
//     tags:['emo中','男','大一','未婚'],
//     createTime:new Date()
// }
let userListData = ref([]);
//使用route获取搜索页传递过来的query参数
const route = useRoute();

onMounted(async () => {
  //发起请求获取对应tag的用户
  let result = await requests({ url: `/userList/${route.query.tag}` });
  // console.log(result)
  let userInfo = result.data;
  if (userInfo) {
    userInfo.forEach((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    });
    userListData.value = userInfo;
  }
});
//遮罩层显示用户信息
const show = ref(false);
let userInfo = ref([])
//显示对应用户的信息
const showUserInfo = async (userId)=>{
  show.value = true;
  let result = await reqUserInfo(userId)
  userInfo.value = result.data
  // console.log(userInfo)
  // console.log(result)
}

</script>

<style scoped>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 60vw;
    
    background-color: #fff;
  }
  .block img{
    width: 100%;
    
  }
</style>