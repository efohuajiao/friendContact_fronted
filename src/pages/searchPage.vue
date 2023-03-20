<template>
  <tagsPage @add="getActiviIds" />
  <div style="padding: 12px">
    <van-button type="primary" block @click="searchUserDetail">搜索</van-button>
  </div>
</template>

<script setup>
import tagsPage from "@/components/tagsPage.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
//定义一个响应式数组获取传递过来的值
const activeIds = ref([]);
//获取子组件传来的activiIds
const getActiviIds = (values) => {
  activeIds.value = values;
  // console.log(activeIds)
};
const searchUserDetail = () => {
  router.push({
    path: "/userSearch",
    query: {
      tag: activeIds.value, //将选中的标签传到搜索结果页
    },
  });
};
</script>

<style>
</style>