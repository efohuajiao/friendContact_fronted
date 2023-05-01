<template>
  <DynamicScroller
    class="scroller"
    :items="userInfo"
    :min-item-size="100"
    page-mode
    :buffer="100"
  >
    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem :item="item" :active="active" :data-index="index">
        <van-card
          :desc="item.profile"
          :title="item.username"
          :thumb="item.avatarUrl"
        >
          <template #tags>
            <van-space>
              <van-tag plain type="danger" v-for="tag in item.tags">{{
                tag
              }}</van-tag>
            </van-space>
          </template>
          <template #footer>
            <van-button size="mini" @click="show = true">联系我</van-button>
          </template>
        </van-card>
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
  <!-- <van-card v-for="item of userInfo"
          :desc="item.profile"
          :title="item.username"
          :thumb="item.avatarUrl"
        >
          <template #tags>
            <van-space>
              <van-tag plain type="danger" v-for="tag in item.tags">{{
                tag
              }}</van-tag>
            </van-space>
          </template>
          <template #footer>
            <van-button size="mini" @click="show = true">联系我</van-button>
          </template>
        </van-card> -->
  <van-back-top bottom="10vh" />
</template>

<script setup>
import { getAllUser } from "@/api/index";
import { onMounted, ref } from "vue";

let userInfo = ref([]);
const loading = ref(true);
// const loopRender = (curTotal,curIndex)=>{
//   let once = 20;
//   if(curTotal<=0) return;

// }
const showAllUser = async () => {
  let result = await getAllUser();
  //对tagsJSON对象进行解码
  // console.log(result)
  // result.data.forEach(user => {
  //   user.tags = JSON.parse(user.tags)
  // })
  // userInfo.value = result.data
  userInfo.value = result;
};
onMounted(() => {
  showAllUser();
});
</script>

<style scoped>
.scroller {
  height: 100%;
}
</style>