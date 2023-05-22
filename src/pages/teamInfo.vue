<template>
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
    <van-cell title="队伍名" :value="team.teamname" icon="cluster-o" />
    <van-cell title="队长" :value="team.username" icon="friends-o" />
    <van-cell title="队伍描述" :value="team.description" icon="underway-o" />
    <van-cell
      title="队伍人数"
      :value="`${team.currentNum}/${team.maxNum}`"
      icon="underway-o"
    />
    <van-popover v-model:show="showPopover" placement="right-start">
      <van-grid
        :border="false"
        clickable
        column-num="2"
        square
        style="width: 180px"
      >
        <van-grid-item icon="close" text="退出队伍" @click="quitTeam()" />
        <van-grid-item
          icon="delete"
          text="解散队伍"
          @click="deleteTeam(team.username, team.id)"
        />
      </van-grid>
      <template #reference>
        <van-cell center title="操作">
          <template #icon>
            <van-icon name="info-o" size="18" />
          </template>
        </van-cell>
      </template>
    </van-popover>
  </van-space>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { searchTeam } from "@/api";
import { useUserInfo } from "@/store/userInfo";
import { storeToRefs } from "pinia";
let team = ref({});
let route = useRoute();
const showPopover = ref(false);
//获取当前登录的用户信息
const store = useUserInfo();
store.searchUserInfo();
const { userInfo } = storeToRefs(store);
// console.log(userInfo)
//退出队伍
const quitTeam = () => {
  const userInfo = store.userInfo;
  console.log(userInfo);
};
//解散队伍
const deleteTeam = (captain, teamid) => {
  
  if (captain != userInfo.username) {
  }
};
// console.log(route.query.id);
//发起请求获取队伍的信息
onMounted(async () => {
  let result = await searchTeam(route.query.id);
  team.value = result.data[0];
  team.value.status === 1
    ? (team.value.status = "公开")
    : (team.value.status = "私有");

  // console.log(teamInfo.value);
});
</script>

<style>
</style>