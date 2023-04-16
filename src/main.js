import { createApp } from 'vue'
import App from './App.vue'
//按需引入vant组件
import { NavBar,Icon,Tabbar, Search, Divider, TreeSelect, Tag, Space,CellGroup, Card, Form, Uploader, Toast, Overlay, Tabs, BackTop, Popover, Skeleton, SkeletonTitle, SkeletonImage, SkeletonAvatar, SkeletonParagraph, Dialog, PullRefresh, Loading } from 'vant';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
//引入pinia
import { createPinia} from 'pinia';
//引入路由
import router from './router'
// import * as VueRouter from 'vue-router'
//引入虚拟列表VueVirtualScroller
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const app = createApp(App);
//使用组件
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(Search)
app.use(Divider)
app.use(TreeSelect)
app.use(Tag)
app.use(Space)//间距标签
app.use(CellGroup);//用户信息
app.use(Card)//搜索结果展示搜到的用户
app.use(Form);
app.use(Uploader);
app.use(Toast);
app.use(Overlay)
app.use(Tabs)
app.use(BackTop);
app.use(Popover);
app.use(Skeleton);
app.use(SkeletonTitle);
app.use(SkeletonImage);
app.use(SkeletonAvatar);
app.use(SkeletonParagraph);
app.use(Dialog);
app.use(PullRefresh);
app.use(BackTop);
app.use(Loading)
//使用pinia
const pinia = createPinia()
app.use(pinia)
//使用路由
app.use(router)
//使用虚拟列表
app.use(VueVirtualScroller)
// createApp(App).mount('#app')
app.mount("#app")
