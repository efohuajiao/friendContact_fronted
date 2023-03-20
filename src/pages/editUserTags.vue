<template>
  <tagsPage @add="getTags" />
  <div style="padding: 12px">
    <van-button type="primary" block @click="editTags">修改</van-button>
  </div>
</template>

<script setup>
import { updateUserTags } from "@/api/index";
import tagsPage from "@/components/tagsPage.vue";
import { showFailToast, showSuccessToast, showToast } from "vant";
import { ref } from "vue";
import { useRoute,useRouter } from "vue-router";
//创建数组，将子组件传来的值赋给它
const tags = ref([]);
//获取子组件传来的tags数组
const getTags = (values) => {
  // console.log(values)
  tags.value = values;
};
//获取url中用户对应的编号
const route = useRoute()
const router = useRouter()
const planetCode = route.query.planetCode
const editTags = async () => {
  //将需要传的值转换成JSON字符串，传给服务器
  let result = await updateUserTags(JSON.stringify(tags.value),planetCode);
//   console.log(result)
  if(result.code == 200){
    showSuccessToast("修改成功")
    router.back()
  }else{
    showFailToast("修改失败")
  }
};
</script>

<style>
</style>