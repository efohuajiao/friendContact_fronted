<template>
  <van-search v-model="searchValue" placeholder="请输入想查找的队伍" @search="onSearch"/>
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
          <!-- <van-button size="mini" @click="toJoinTeam(teamList.id)" v-if="!teamList.isExist" >加入队伍</van-button> -->
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
          <van-button size="mini" @click="toJoinTeam(teamList.id,teamList.status )" v-if="!teamList.isExist">加入队伍</van-button>
          <van-button size="mini" @click="searchTeamInfo(teamList.id)">查看队伍</van-button>
        </template>

      </van-card>
      </van-skeleton>
    </van-tab>
  </van-tabs>
  <van-button icon="plus" round type="primary" id="create" @click="toCreateTeam"/>
  <van-dialog v-model:show="show" title="请输入队伍密码" show-cancel-button @confirm="joinPrivateTeam(teamId)">
    <input type="password" class="pwd" v-model.number="teamPwd" placeholder="请输入密码">
  </van-dialog>
</template>

<script setup>
import { getAllTeam ,joinTeam } from "@/api";
import { showSuccessToast,showConfirmDialog } from "vant";
import { onMounted,onBeforeMount, ref, watch } from "vue";
import { useRouter } from "vue-router";

let teamInfo = []
const openTeamInfo = ref([{},{},{},{}]);//公开队伍
const privateTeamInfo = ref([{},{},{},{}])//加密队伍
const searchValue = ref('');//搜索的值
const show = ref(false)//展示dialog框
const teamPwd = ref()
const teamId = ref();
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
onMounted(()=>{
  searchTeam();
});
//搜索队伍
const onSearch = ()=>{
  searchTeam(searchValue.value)
}
//监视搜索框响应式数据的变化发送请求
watch(searchValue,(newvalue,oldvalue)=>{
  setTimeout(()=>{
    searchTeam(newvalue)
  },500)
    
})
//跳转到创建队伍页
const router = useRouter()
const toCreateTeam = ()=>{
  router.push("/createTeam")
}

//加入队伍
const toJoinTeam =   (id,e)=>{
  //判断队伍是公开还是私密
  if(e === "私有"){
      show.value = true;
      teamId.value = id;
  }else{
      //将队伍id传给后端
    showConfirmDialog({
      message:"确认加入该队伍吗？",
    }).then(async()=>{
      let result = await joinTeam(id)
      if(result.code == 200){
      showSuccessToast({message:"加入成功",duration:500});
      searchTeam();
      }
    })
  }
}
const joinPrivateTeam = async()=>{
  teamPwd.value = '';
  let result = await joinTeam(teamId.value,teamPwd.value);
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
  .pwd{
    margin:5vh 0vw 5vh 15vw;
  }
</style>