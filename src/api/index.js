import requests from "./request.js";
//根据tag查询用户
export const reqUserList = (tag)=>{
    //${tag}向服务器传递params参数
    return requests({url:`/userList/${tag}`,method:"get"})
}

//修改用户的tag标签
export const updateUserTags = (tag,planetCode)=>{
    return requests({url:`/userEditTags/${tag}/${planetCode}`,method:"get"})
}

//获取所有的用户信息
export const getAllUser = ()=>{
    return requests({url:'/getAllUserInfo',method:'get'})
}