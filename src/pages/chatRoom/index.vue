<template>
  <div class="chatContent">
    <van-notice-bar left-icon="volume-o" scrollable text="希望大家和谐发言，共创一个氛围良好的聊天室。" />
    <div class="messageContent">
      <div class="message" v-for="(msg, index) in messageList" :key="index">
        {{ msg }}
      </div>
    </div>
    <div class="sendMessage">
      <van-field v-model="message" placeholder="请输入内容">
        <template #button>
          <van-button size="small" type="primary" @click="send">发送</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { showToast } from "vant";
const messageList = reactive([]);

let message = ref("");
const send = () => {
  if (!message.value) {
    showToast({
      message: "请输入消息",
      position: "bottom"
    });
  }
  messageList.push(message.value);
  message.value = "";
};
</script>

<style lang='less' scoped>
.chatContent {
  .messageContent {
    overflow: scroll;
  }
  .sendMessage {
    position: fixed;
    bottom: 60px;
    width: 100vw;
  }
}
/deep/.van-notice-bar {
  color: #1989fa;
  background: #ecf9ff;
}
</style>