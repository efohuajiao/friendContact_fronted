<template>
  <van-card
    v-for="teamList in teamInfo"
    :desc="teamList.description"
    :title="teamList.teamname"
    :thumb="teamList.teamUrl"
  >
    <template #bottom>
      <span>队伍人数：{{teamList.currentNum}}/{{ teamList.maxNum }}</span
      ><br />
      <span>创建时间：{{ teamList.createTime }}</span>
    </template>
    <template #tags>
      <van-space>
        <van-tag plain type="danger">{{ teamList.status }}</van-tag>
        <van-tag plain type="warning ">队长:{{ teamList.username }}</van-tag>
      </van-space>
    </template>
    <template #footer>
      <van-button size="mini" @click="searchTeamInfo(teamList.id)">查看队伍</van-button>
    </template>
  </van-card>
  <van-empty
    style="margin-top: 18vh;"
    image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
    image-size="80"
    description="暂无加入的队伍"
    v-if="!teamInfo"
  />
</template>

<script setup>
import {teamOfUserJoin} from "@/api/index";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

let teamInfo = ref([])
onMounted(async ()=>{
  let result = await teamOfUserJoin();
  // console.log(result)
  teamInfo.value = result.data;
  if (teamInfo.value) {
    teamInfo.value.forEach((teamList) => {
      teamList.status == 1
        ? (teamList.status = "公开")
        : (teamList.status = "私有");
    });
  } 
})

//查看队伍
const router = useRouter();
const searchTeamInfo = (id)=>{
  router.push({
    path:"/teamInfo",
    query:{
      id
    }
  })
}
</script>

<style>

</style>