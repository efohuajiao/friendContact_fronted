<template>
  <van-card
    :desc="userList.profile"
    :title="userList.username"
    :thumb="userList.avatarUrl"
    @click="toUserInfo"
  >
    <template #tags>
      <van-space>
        <van-tag plain type="danger" v-for="tag in userList.tags">{{
          tag
        }}</van-tag>
      </van-space>
    </template>
  </van-card>
  <van-space direction="vertical" fill :size="20" style="margin-top: 20px">
    <van-cell title="编号" :value="userList.planetCode" icon="manager-o" />
    <van-cell title="我创建的队伍" is-link icon="cluster-o" />
    <van-cell title="我加入的队伍" is-link icon="friends-o" />
    <van-cell title="注册时间" :value="userList.createTime" icon="underway-o" />
    <van-cell title="退出登录" icon="close" @click="logOut"/>
  </van-space>
</template>

<script setup>
import requests from "@/api/request";
import { showSuccessToast } from "vant";
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
let userList = ref({});

// {
//   id: 1,
//   username: "花椒",
//   userAccount: "eatHuaJiao",
//   avatarUrl:
//     "https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
//   gender: "男",
//   profile: "一个热爱前端的男大学生",
//   phone: "13412134141",
//   email: "1290129@qq.com",
//   planeCode: "1234",
//   tags: ["emo中", "男", "大一", "未婚"],
//   createTime: "2023年3月1日",
// }

//获取当前登录用户的信息
// const token = localStorage.getItem("TOKEN")
onBeforeMount(async () => {
  let result = await requests({ url: "/userInfo", method: "get" });
  //将获取的值传给userList
  // console.log(result); 
  userList.value = result.data;
  let user = userList.value;
  user.createTime = user.createTime.slice(0, 10);
  user.tags = JSON.parse(user.tags);
});

//跳转到用户信息页
const router = useRouter();
const toUserInfo = () => {
  router.push({
    path: "/userInfo",
  });
};
//退出登录
const logOut = ()=>{
  localStorage.setItem("TOKEN","");
  showSuccessToast({message:"退出成功",duration:500})
  router.replace("/login")
}
</script>

<style>
</style>