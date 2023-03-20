<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset v-if="modifyInfo.editKey != '头像'">
      <van-field
        v-model="modifyInfo.currentValue"
        :name="modifyInfo.editName"
        :label="modifyInfo.editKey"
        :placeholder="`请输入${modifyInfo.editKey}`"
      />
    </van-cell-group>
    <van-cell-group inset v-if="modifyInfo.editKey === '头像'">
      <span>{{ modifyInfo.editKey }}</span>
      <van-uploader v-model="fileList" max-count="1" id="avatarUrl"/>
      
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import requests from "@/api/request";
import { showSuccessToast } from "vant";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
//定义route，获取user传递过来的query参数
const route = useRoute();
const router = useRouter();
//将获取的query参数添加响应式
const modifyInfo = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
});
const fileList = ref([]);
const onSubmit = async (values) => {
  //发起请求进行修改信息
  let result = await requests({
    url: "/userEditInfo",
    method: "post",
    data: {
      editName: modifyInfo.value.editName,
      currentValue: modifyInfo.value.currentValue || fileList.value[0].content
    },
  });
  //如果修改成功，则跳转到用户信息页
  if (result.code == 200) {
    showSuccessToast({ message: "修改成功", duration: 500 });
    router.replace("/userInfo");
  }
};

</script>

<style>
#avatarUrl{
  margin-left:53vw
 
}
</style>