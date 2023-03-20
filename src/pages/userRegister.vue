<template>
  <van-icon
    name="friends-o"
    :size="90"
    color="#3b71b7"
    style="margin-left: 36vw"
  />
  <h2 style="font-weight: 700; text-align: center">“寻找志同道合的朋友”</h2>
  <van-form @submit="onSubmit">
    <van-uploader v-model="fileList" style="margin-left: 36vw" :max-count="1" />
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="repassword"
        type="password"
        name="repassword"
        label="确认密码"
        placeholder="请再次输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import requests from "@/api/request";
import { showSuccessToast, showFailToast } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
const username = ref("");
const password = ref("");
const repassword = ref("");
//图片的信息
const fileList = ref([]);
const router = useRouter();
//用户注册的时间
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth()+1
let day = date.getDate()

//用户注册
const onSubmit = async () => {
  // console.log(JSON.stringify(fileList.value[0].content))
  
  let result = await requests({
    url: "/userRegitser",
    method: "post",
    data: {
      username: username.value,
      password: password.value,
      createTime:year+"-"+month+"-"+day,
      avatarUrl:fileList.value[0].content
    },
  });
  // console.log(result);
  if (result.code == 200) {
    showSuccessToast({message:"注册成功",duration:500});
    router.replace("/login");
  } else {
    showFailToast({message:`${result.message}`,duration:500});
  }
};
</script>

<style scoped>
p {
  font-weight: 400;
}
</style>