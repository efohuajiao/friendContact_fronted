<template>
  <van-card v-for = "userList in userInfo"
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
</template>

<script setup>
import {getAllUser} from "@/api/index";
import { onMounted, ref } from "vue";

let userInfo = ref([])
onMounted(async ()=>{
  let result = await getAllUser();
  // console.log(result)
  
  
  //对tagsJSON对象进行解码
  result.data.forEach(user => {
    user.tags = JSON.parse(user.tags)
  })
  userInfo.value = result.data
})
// console.log(userInfo)

</script>

<style>

</style>