<template>
  <van-tabs >
    <van-tab>
      <template #title> <van-icon name="smile-o" />公开 </template>
      <van-card
        v-for="teamList in openTeamInfo"
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
    </van-tab>
    <van-tab>
      <template #title> <van-icon name="lock" />私有 </template>
      <van-card
        v-for="teamList in privateTeamInfo"
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
    </van-tab>
  </van-tabs>
  <van-button icon="plus" round type="primary" id="create" @click="toCreateTeam"/>

</template>

<script setup>
import { getAllTeam } from "@/api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

let teamInfo = []
const openTeamInfo = ref([]);
const privateTeamInfo = ref([])
onMounted(async () => {
  let result = await getAllTeam();
  teamInfo = result.data;
  //修改队伍的状态
  teamInfo.forEach((teamList) => {
    teamList.status == 1
      ? (teamList.status = "公开")
      : (teamList.status = "私有");
  });
  //公开队伍
  openTeamInfo.value = teamInfo.filter((teamList)=>{
    return teamList.status == "公开"
  })
  //私有队伍
  privateTeamInfo.value = teamInfo.filter((teamList)=>{
    return teamList.status == "私有"
  })
  
});
// console.log(teamInfo);
//跳转到创建队伍页
const router = useRouter()
const toCreateTeam = ()=>{
  router.push("/createTeam")
}
</script>

<style scope>
  #create{
    position:fixed;
    bottom:10vh;
    right:5vw;
  }
</style>