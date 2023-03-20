<template>
  <van-space direction="vertical" fill :size="20">
    <!-- 用户信息 -->
    <van-cell
      title="头像"
      is-link
      @click="sendInfo('头像', 'avatarUrl')"
    >
      <img :src="user.avatarUrl" style="width: 52px; height: 48px" />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.username"
      @click="sendInfo('昵称', 'username', user.username)"
    />
    <van-cell
      title="性别"
      is-link
      :value="user.gender"
      @click="sendInfo('性别', 'gender', user.gender)"
    />
    <van-cell
      title="星球编号"
      arrow-direction="down"
      :value="user.planetCode"
    />

    <van-cell
      title="个人简介"
      is-link
      :value="user.profile"
      @click="sendInfo('简介', 'profile', user.profile)"
    />

    <van-cell
      title="修改标签"
      is-link
      :to="`editTags?planetCode=${user.planetCode}`"
    />

    <van-cell
      title="邮箱"
      is-link
      :value="user.email"
      @click="sendInfo('邮箱', 'e-mail', user.email)"
    />
    <van-cell
      title="手机号"
      is-link
      :value="user.phone"
      @click="sendInfo('手机号', 'phone', user.phone)"
    />
  </van-space>
</template>

<script setup>
import requests from "@/api/request";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

let user = ref({});
// id:1,
//   username:"花椒",
//   userAccount:"eatHuaJiao",
//   avatarUrl:"https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
//   gender:"男",
//   profile:"一个热爱前端的男大学生",
//   phone:"13412134141",
//   email:"1290129@qq.com",
//   planeCode:'1234',
//   createTime:new Date()
//获取userInfo
onMounted(async () => {
  let result = await requests({ url: "/userInfo", method: "get" });
  user.value = result.data;

  user.value.createTime = user.value.createTime.slice(0, 10);
});

//获取router
const router = useRouter();
//路由跳转到user/edit修改页面,并进行传参
const sendInfo = (editKey, editName, currentValue) => {
  //进行路由跳转并传query参数
  router.push({
    name: "xiugai",
    query: {
      editKey, //修改的键名（中文）用于显示在页面上
      editName, //修改的键名（用于发起请求时传给服务器）
      currentValue, //需要修改的值
    },
  });
};
</script>

<style>
</style>