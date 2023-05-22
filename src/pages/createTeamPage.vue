<template>
  <van-uploader v-model="fileList" style="margin-left: 39vw" :max-count="1" />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-space direction="vertical" fill :size="30">
        <van-field
          v-model="teamname"
          name="teamname"
          label="队伍名"
          placeholder="请输入队伍描述"
          :rules="[{ required: true, message: '请填写队伍名' }]"
        />
        <van-field
          v-model="description"
          name="description"
          label="队伍描述"
          placeholder="请输入队伍描述"
          :rules="[{ required: true, message: '请填写队伍描述' }]"
        />
        <van-field name="maxNum" label="队伍人数">
          <template #input>
            <van-stepper v-model="value" />
          </template>
        </van-field>
        <van-field
          v-model="password"
          name="password"
          type="password"
          label="队伍密码"
          placeholder="请输入队伍密码"
          :rules="[{ required: true, message: '请填写队伍描述' }]"
          v-if="checked=== '2'"
        />
        <van-field name="status" label="队伍状态">
          <template #input>
            <van-radio-group v-model="checked" direction="horizontal">
              <van-radio name="1">公开</van-radio>
              <van-radio name="2">私有</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        
      </van-space>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        创建
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import {createTeam} from '@/api/index'
import { showSuccessToast } from 'vant';
import { ref } from "vue";
import { useRouter } from 'vue-router';
const fileList = ref([]); //队伍图片
const teamname = ref(""); //队伍名
const description = ref(""); //队伍描述
const value = ref(1); //队伍人数
const checked = ref("1"); //队伍状态
const password = ref("")//队伍密码
const router = useRouter()//获取路由router
const onSubmit = async (values) => {
//   console.log(fileList.value[0].content)
  let result = await createTeam(fileList.value[0].content,values)
  console.log(result);
  // //如果创建成功就回到之前的页面
  if(result.code == 200){
    showSuccessToast({message:"创建成功",duration:500})
    router.back()
  }
};
</script>

<style>
</style>