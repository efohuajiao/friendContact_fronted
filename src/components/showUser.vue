<template>
    <van-card
      v-for="userList in userListInfo"
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
        <van-button size="mini" @click="showUserInfo(userList.id)">联系我</van-button>
      </template>
    </van-card>
    <!-- 搜索提示 -->
  <van-empty
    v-if="!userListInfo || userListInfo.length < 1"
    image="search"
    description="搜索结果为空"
  />
  <van-overlay :show="show" @click="show = false">
  <div class="wrapper">
    <div class="block" v-for="user in userInfo">
      <img :src="user.avatarUrl" alt="">
      <van-space direction="vertical" fill :size="20" style="margin-top: 20px">
        <van-cell title="伙伴编号" :value="user.planetCode" icon="manager-o" />
        <van-cell title="伙伴简介" :value="user.profile" icon="cluster-o"/>
        <van-cell title="联系方式" :value="user.phone" icon="friends-o" />
      </van-space>
    </div>
  </div>
</van-overlay>
</template>

<script setup>

import { ref, toRef } from 'vue';

const props = defineProps({
  userListInfo:Array
})
const userListInfo = props.userListInfo
// const userListInfo = toRef(userListInfo)
// console.log(userListInfo)
//遮罩层显示用户信息
const show = ref(false);
let userInfo = ref([])
//显示对应用户的信息
const showUserInfo = async (userId)=>{
  show.value = true;
  let result = await reqUserInfo(userId)
  userInfo.value = result.data
  // console.log(userInfo)
  // console.log(result)
}

// const store = useSearchTags();

</script>

<style scoped>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 60vw;
    
    background-color: #fff;
  }
  .block img{
    width: 100%;
    
  }
</style>