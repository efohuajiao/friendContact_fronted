<template>
  <div v-for="team in teamInfo">
    <van-card
      :desc="team.description"
      :title="team.teamname"
      :thumb="team.teamUrl"
    >
      <template #tags>
        <van-space>
          <van-tag plain type="danger">{{ team.status }}</van-tag>
        </van-space>
      </template>
    </van-card>
    <van-space direction="vertical" fill :size="20" style="margin-top: 20px">
      <van-cell title="队伍ID" :value="team.id" icon="manager-o" />
      <van-cell
        title="队伍名"
        :value="team.teamname"
        icon="cluster-o"
        to="/currentHumanTeam"
      />
      <van-cell title="队长" :value="team.username" icon="friends-o" />
      <van-cell title="队伍描述" :value="team.description" icon="underway-o" />
      <van-cell title="队伍人数" :value="`${team.currentNum}/${team.maxNum}`" icon="underway-o" />
    </van-space>
  </div>
</template>

<script setup>
import requests from "@/api/request";
import { showSuccessToast } from "vant";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { searchTeam } from "@/api";
let teamInfo = ref([]);
let route = useRoute();
// console.log(route.query.id);
//发起请求获取队伍的信息
onMounted(async () => {
  let result = await searchTeam(route.query.id);
  teamInfo.value = result.data;
  teamInfo.value.forEach((teamList) => {
    teamList.status == 1
      ? (teamList.status = "公开")
      : (teamList.status = "私有");
  });
  // console.log(teamInfo.value);
});
</script>

<style>
</style>