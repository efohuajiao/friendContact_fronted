<template>
  <van-search v-model="value" placeholder="请输入想查找的队伍" @search="onSearch"/>
  <van-tabs >
    <van-tab>
      <template #title> <van-icon name="smile-o" />公开 </template>
      <van-skeleton title avatar :row="3" :loading="loading" v-for="teamList in openTeamInfo">
      <van-card
        :desc="teamList.description"
        :title="teamList.teamname"
        :thumb="teamList.teamUrl"
      >
        <template #bottom>
            <span>队伍人数：{{teamList.currentNum}} / {{ teamList.maxNum }}</span><br>
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
          <van-button size="mini" @click="toJoinTeam(teamList.id)" v-if="!teamList.isExist" >加入队伍</van-button>
          <van-button size="mini" @click="searchTeamInfo(teamList.id)">查看队伍</van-button>
        </template>
      </van-card>
      
      </van-skeleton>
      <van-empty
        v-if="openTeamInfo.length < 1"
        image="search"
        description="搜索结果为空"
      />
    </van-tab>
    <van-tab>
      <template #title> <van-icon name="lock" />私有 </template>
      <van-empty
        v-if="privateTeamInfo.length < 1"
        image="search"
        description="搜索结果为空"
      />
      <van-skeleton title avatar :row="3" :loading="loading"  v-for="teamList in privateTeamInfo">
      <van-card
        :desc="teamList.description"
        :title="teamList.teamname"
        :thumb="teamList.teamUrl"
      >
        <template #bottom>
            <span>队伍人数：{{teamList.currentNum}}/{{ teamList.maxNum }}</span><br>
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
          <van-button size="mini" @click="" v-if="!teamList.isExist">加入队伍</van-button>
          <van-button size="mini" @click="searchTeamInfo(teamList.id)">查看队伍</van-button>
        </template>
      </van-card>
      </van-skeleton>
    </van-tab>
  </van-tabs>
  <van-button icon="plus" round type="primary" id="create" @click="toCreateTeam"/>

</template>

<script setup>
import { getAllTeam ,joinTeam } from "@/api";
import { showSuccessToast } from "vant";
import { onMounted,onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

let teamInfo = []
const openTeamInfo = ref([{},{},{},{}]);//公开队伍
const privateTeamInfo = ref([{},{},{},{}])//加密队伍
const value = ref('');//搜索的值


const loading = ref(true);
//搜索队伍以及展示全部队伍都要用到同一个方法，将它封装起来
const searchTeam = async (value = '') => {
  let result = await getAllTeam(value);
  loading.value = false;
  // console.log(result)
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
}

//请求获取所有队伍信息
onMounted(()=>{
  searchTeam();
});
//搜索队伍
const onSearch = (val)=>{
  searchTeam(val);
} 
//跳转到创建队伍页
const router = useRouter()
const toCreateTeam = ()=>{
  router.push("/createTeam")
}

//加入队伍
const toJoinTeam = async (teamId)=>{
  //将队伍id传给后端
  let result = await joinTeam(teamId)
  if(result.code == 200){
    showSuccessToast({message:"请求成功",duration:500});
    searchTeam();
  }
  // console.log(result)
}

//查看队伍
const searchTeamInfo = (id)=>{
  router.push({
    path:"/teamInfo",
    query:{
      id
    }
  })
}
</script>

<style scope>
  #create{
    position:fixed;
    bottom:10vh;
    right:5vw;
  }
</style>