<template>
      <van-card
        v-for="teamList in teamInfo"
        :desc="teamList.description"
        :title="teamList.teamname"
        :thumb="teamList.teamUrl"
      >
        <template #bottom>
            <span>队伍人数：1/{{ teamList.maxNum }}</span><br>
            <span>创建时间：{{ teamList.createTime }}</span>
        </template>
        <template #tags>
          <van-space>
            <van-tag plain type="danger">{{ teamList.status }}</van-tag>
            <van-tag plain type="warning "
              >队长:{{ teamList.username }}</van-tag
            >
          </van-space>
        </template>
        <template #footer>
          <van-button size="mini" @click="show = true">查看队伍</van-button>
        </template>
      </van-card>
</template>

<script setup>
import {teamOfCurrentHuman} from "@/api/index";
import { onMounted, ref } from "vue";

let teamInfo = ref([])
onMounted(async ()=>{
  let result = await teamOfCurrentHuman();
  // console.log(result)
  teamInfo.value = result.data
  teamInfo.value.forEach((teamList) => {
    teamList.status == 1
      ? (teamList.status = "公开")
      : (teamList.status = "私有");
  });
})


</script>

<style>

</style>