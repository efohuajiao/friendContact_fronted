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
![image-20230826193146026](http://cdn.t-terminal.icu/image-20230826193146026.png)

![image-20230826195428608](http://cdn.t-terminal.icu/image-20230826195428608.png)


![image-20230826193224601](http://cdn.t-terminal.icu/image-20230826193224601.png)


![image-20230826193246246](http://cdn.t-terminal.icu/image-20230826193246246.png)

![image-20230826193302795](http://cdn.t-terminal.icu/image-20230826193302795.png)


## 项目亮点

1. 使用**vue-virtual-scroller插件**实现虚拟列表，解决数据量过大造成的卡顿
2. 采用**骨架屏、懒加载**替代数据渲染空白期，提高体验感
3. 采用**Pinia**全局状态管理用户信息，减少网络请求带来的资源损耗
4. 对大容量图片进行分片上传，通过`Promise.all()`实现并发控制的上传，控制同时上传多个文件，限制并发数

5. 使用全局路由守卫进行用户鉴权
