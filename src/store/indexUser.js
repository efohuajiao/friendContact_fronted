import { defineStore } from "pinia";
import { getAllUser } from "@/api";

export const useIndexUser = defineStore("indexUser", {
    state: () => {
        return {
            userInfo: []
        }
    },
    getters: {

    },
    actions: {
        async reqAllUser() {
            let result = await getAllUser();
            //对tagsJSON对象进行解码
            result.data.forEach(user => {
                user.tags = JSON.parse(user.tags)
            })
            this.userInfo.value = result.data
            // console.log(userInfo)
        }
    }
})