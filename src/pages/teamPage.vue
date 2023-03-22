<template>
  <van-tabs >
    <van-tab>
      <template #title> <van-icon name="more-o" />公开 </template>
      <van-card
        v-for="teamList in teamInfo"
        :desc="teamList.description"
        :title="teamList.name"
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
    </van-tab>
    <van-tab>
      <template #title> <van-icon name="more-o" />私有 </template>
      
    </van-tab>
  </van-tabs>
  <van-button icon="plus" round type="primary" id="create"/>

</template>

<script setup>
import { getAllTeam } from "@/api";
import { onMounted, ref } from "vue";

const teamInfo = ref([]);
onMounted(async () => {
  let result = await getAllTeam();
  teamInfo.value = result.data;
  //修改队伍的状态
  teamInfo.value.forEach((teamList) => {
    teamList.status == 0
      ? (teamList.status = "公开")
      : (teamList.status = "私有");
  });
});
// console.log(teamInfo);
</script>

<style scope>
  #create{
    position:absolute;
    bottom:10vh;
    right:5vw;
  }
</style>