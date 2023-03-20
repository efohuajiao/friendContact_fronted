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
        <van-button size="mini" @click="show = true">联系我</van-button>
      </template>
    </van-card>
    <!-- 搜索提示 -->
  <van-empty
    v-if="!userListData || userListData.length < 1"
    image="search"
    description="搜索结果为空"
  />
  <van-overlay :show="show" @click="show = false">
    <div class="wrapper" @click.stop>
      <div class="block" />
    </div>
  </van-overlay>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import requests from "@/api/request";
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
const show = ref(false);
// console.log(`http://127.0.0.1/api/userList?tag=${route.query.tag}`)
// axios({url:`http://127.0.0.1:1300/api/userList?tag=${route.query.tag}`,method:"get"}).then((frame)=>{
//   console.log(frame)
// })
// console.log(result)
</script>

<style>

</style>