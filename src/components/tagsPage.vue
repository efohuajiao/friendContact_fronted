<template>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <van-divider content-position="left">已选标签</van-divider>
    <!-- spce间距标签  tag标签，就是面包屑 -->
    <van-space wrap>
      <van-tag
        v-for="tag in activeIds"
        closeable
        size="medium"
        type="primary"
        @close="doClose(tag)"
      >
        {{ tag }}
      </van-tag>
    </van-space>
  
    <van-divider content-position="left">选择标签</van-divider>
    <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
      @click-item="giveActiveIds"
    />

  </template>
  
  <script setup>
import { ref,defineEmits } from "vue";
import { useRoute, useRouter } from "vue-router";
//search 搜索的文字
const searchText = ref("");
/*
  search搜索过滤
  1、克隆一份原数据数组originTagList,将数组originTagList添加为响应式赋给新变量items
  2、使用map在原数据数组中进行过滤，返回数组中包含搜索框中的数据

*/
const originTagList = [
  {
    text: "性别",
    children: [
      { text: "男", id: "男" },
      { text: "女", id: "女" },
    ],
  },
  {
    text: "年级",
    children: [
      { text: "大一", id: "大一" },
      { text: "大二", id: "大二" },
      { text: "大三", id: "大三" },
      { text: "大四", id: "大四" },
      { text: "研一", id: "研一" },
      { text: "研二", id: "研二" },
      { text: "研三", id: "研三" },
    ]
  },
  {
    text: "学习方向",
    children: [
      { text: "java", id: "java" },
      { text: "c", id: "c" },
      { text: "c++", id: "c++" },
      { text: "go", id: "go" },
      { text: "node", id: "node" },
      { text: "python", id: "python" },
    ],
  },
  {
    text: "运动",
    children: [
      { text: "羽毛球", id: "羽毛球" },
      { text: "篮球", id: "篮球" },
      { text: "足球", id: "足球" },
      { text: "乒乓球", id: "乒乓球" },
      { text: "排球", id: "排球" },
    ],
  },
  {
    text: "状态",
    children: [
      { text: "emo中", id: "emo中" },
      { text: "猛学中", id: "猛学中" },
      { text: "摆烂中", id: "摆烂中" },
      { text: "考研中", id: "考研中" },
      { text: "求职中", id: "求职中" },
    ],
  },
];
let tagList = ref(originTagList);
//过滤搜索的函数
const onSearch = (val) => {
  tagList.value = originTagList.map((parentTag) => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = { ...parentTag };
    tempParentTag.children = tempChildren.filter((item) =>
      item.text.includes(searchText.value)
    );
    return tempParentTag;
  });
};
const onCancel = () => {
  searchText.value = " ";
  tagList = originTagList  ;
};

//分类选择 tree-select
const activeIds = ref([]);
const activeIndex = ref(1);
//tag标签  关闭标签
//因为activedIds是一个数组，所以使用filter进行过滤，过滤掉当前关闭的标签
const doClose = (tag) => {
  //tag为当前选中的标签
  activeIds.value = activeIds.value.filter((item) => {
    return item !== tag;
  });
};
//使用emit向父组件传值
const emit = defineEmits(['add'])
const giveActiveIds = ()=>{
    emit('add',activeIds.value)
}
  </script>
  
  <style>
  </style>