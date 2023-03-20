<template>
  <van-icon
    name="friends-o"
    :size="90"
    color="#3b71b7"
    style="margin-left: 36vw; margin-top: 20vw"
  />
  <h2 style="font-weight: 700; text-align: center">“寻找志同道合的朋友”</h2>
  <van-form @submit="onSubmit">
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
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
  <router-link to="/register" id="toRegister">还没有账号？注册</router-link>
</template>

<script setup>
import requests from "@/api/request";
import { showSuccessToast, showFailToast } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const router = useRouter();

const onSubmit = async () => {
  let result = await requests({
    url: "/userLogin",
    method: "post",
    data: { username: username.value, password: password.value },
  });
  // console.log(result);
  if (result.code == 200) {
    showSuccessToast({message:"登录成功",duration:500})
    localStorage.setItem("TOKEN",result.token)
    router.replace("/");
  } else {
    showFailToast({message:`${result.message}`,duration:500});
  }
};
</script>

<style scoped>
#toRegister {
  position: absolute;
  right: 5vw;
}
</style>