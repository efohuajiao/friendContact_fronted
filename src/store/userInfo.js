import { defineStore } from "pinia";
import { reqLoginUserInfo } from "@/api";
// interface user{

// }
// interface data {
//     userInfo : user
// }
export const useUserInfo = defineStore("userInfo",{
    //状态
    state:()=> {
        return{
            userInfo : {}
        }
    },
    //计算
    getters:{
        //对获取的数据进行处理
        user:(state)=>{
            state.userInfo.createTime = state.userInfo.createTime.slice(0, 10);
            state.userInfo.tags = JSON.parse(state.userInfo.tags);
            return state.userInfo;
        }
    },
    //派发
    actions:{
        async searchUserInfo(){
            let result = await reqLoginUserInfo();
            // console.log(result)
            if(result.code == 200){
                this.userInfo = result.data;
            }
        }
    }
})