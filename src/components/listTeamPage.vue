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
        <van-button size="mini" @click="show = true">查看队伍</van-button>
      </template>
    </van-card>
    <van-empty
      style="margin-top: 18vh;"
      image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
      image-size="80"
      description="暂无创建的队伍"
      v-if="!teamInfo"
    />
  </template>
  <script setup>
  import { onMounted, ref ,defineProps} from "vue";
  
  defineProps({
    req : Function
  })
  console.log(req)
  let teamInfo = ref([])

  </script>
  <style>
  </style>