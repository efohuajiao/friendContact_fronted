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
    <van-cell title="我创建的队伍" is-link icon="cluster-o" to="/currentHumanTeam"/>
    <van-cell title="我加入的队伍" is-link icon="friends-o" to="/teamofuserjoin"/>
    <van-cell title="注册时间" :value="userList.createTime" icon="underway-o" />
    <van-cell title="退出登录" icon="close" @click="logOut"/>
  </van-space>
</template>

<script setup>
 import { showSuccessToast,showConfirmDialog } from "vant";
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserInfo } from "@/store/userInfo.js";
let userList = ref({});
const store = useUserInfo();
//获取当前登录用户的信息
// const token = localStorage.getItem("TOKEN")
onBeforeMount(async () => {
  await store.searchUserInfo();
   userList.value = store.user;
  // console.log(store.user)
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
  showConfirmDialog({
  message:"您确认退出吗？",
  width:"50vw",
  
}).then(()=>{
  sessionStorage.removeItem("TOKEN")
  showSuccessToast({message:"退出成功",duration:1000})
  router.replace("/login")
}).catch((error)=>{

})

}
</script>

<style>
</style>