//引入定义pinia的放法
import { defineStore } from "pinia";
import { reqUserList } from "@/api";
//定义并导出容器
export const useMainStore = defineStore("main",{
    //仓库
    state:()=> {
        return {
            userListdata:[]
        }
    },
    //计算属性
    getters:{

    },
    //发起请求获取数据
    actions:{
        async searchUserByTags(tag){
            let userList = await reqUserList(tag)
            // console.log(userList)
            if(userList.code == 200){
                this.userListdata = userList.data
            }
            
            // console.log(this.userListdata)

        }
    }
})