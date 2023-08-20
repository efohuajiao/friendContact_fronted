# 游戏伙伴匹配系统

## 项目描述

- 一个帮助游戏爱好者寻找游戏伙伴的移动端网站，包括用户登录注册、更新个人信息、按标签搜索用户、组队等功能。

## 技术选型

### 前端

1. 💚 Vue 3.0：使用最新版本的Vue进行开发。
2. 📦WebPack：使用WebPack作为打包构建工具。
3. 🧰 Vue-router：使用Vue-router进行路由管理。
4. 🔒 Pinia：使用Pinia进行状态管理。
5. 🎨 Less：使用Less作为CSS预处理器。
6. 🎄Axios：使用Axios进行接口请求。

### 后端

1. 💚Node：使用Node进行后端开发。
2. 📦Express：使用Express搭建服务端。
3. 🎈MySql数据库：使用MySql作为数据存储。

## 启动项目

1. 拉代码

`git pull https://github.com/efohuajiao/friendContact_fronted.git`

2. 启动前端

```
cd friendContact_fronted
npm run dev
```

3. 启动后端

```
cd server
node index.js
```

## 部分页面展示
<center>
<img src="http://cdn.t-terminal.icu/image-20230820190829357.png" alt="image-20230820190829357" style="zoom:50%;" />
<img src="http://cdn.t-terminal.icu/image-20230820190916181.png" alt="image-20230820190916181" style="zoom:50%;" />


<center>
<img src="http://cdn.t-terminal.icu/image-20230820190931043.png" alt="image-20230820190931043" style="zoom:50%;" />
<img src="http://cdn.t-terminal.icu/image-20230820191917375.png" alt="image-20230820191917375" style="zoom:50%;" />



<center>
<img src="http://cdn.t-terminal.icu/image-20230820190953087.png" alt="image-20230820190953087" style="zoom:50%;" />
<img src="http://cdn.t-terminal.icu/image-20230820190942364.png" alt="image-20230820190942364" style="zoom:50%;" />


<center>
<img src="http://cdn.t-terminal.icu/image-20230820191017505.png" alt="image-20230820191017505" style="zoom:50%;" />
<img src="http://cdn.t-terminal.icu/image-20230820191038634.png" alt="image-20230820191038634" style="zoom: 50%;" />


<center>
<img src="http://cdn.t-terminal.icu/image-20230820191049961.png" alt="image-20230820191049961" style="zoom:50%;" />
<img src="http://cdn.t-terminal.icu/image-20230820191001808.png" alt="image-20230820191001808" style="zoom:50%;" />

## 项目优化

1. 使用**vue-virtual-scroller插件**实现虚拟列表，解决数据量过大造成的卡顿
2. 采用**骨架屏、懒加载**替代数据渲染空白期，提高体验感
3. 采用**Pinia**全局状态管理用户信息，减少网络请求带来的资源损耗

