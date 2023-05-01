import requests from "./request.js";
//根据tag查询用户
export const reqUserList = (tag)=>{
    //${tag}向服务器传递params参数
    return requests({url:`/userList/${tag}`,method:"get"});
}

//点击联系我显示对应用户的信息
export const reqUserInfo = (id)=>{
    return requests({url:`/user/userInfo/${id}`,method:"get"});
}

//获取用户信息
export const reqLoginUserInfo = ()=>{
    return requests({ url: "/userInfo", method: "get" })
}


//修改用户的tag标签
export const updateUserTags = (tag,planetCode)=>{
    return requests({url:`/userEditTags/${tag}/${planetCode}`,method:"get"});
}

//获取所有的用户信息
export const getAllUser = ()=>{
    return requests({url:'/getAllUserInfo',method:'get'});
}

//获取所有队伍信息、搜索队伍
export const getAllTeam = (val)=>{
    return requests({url:`/team/getAllTeam/${val}`,method:"get"})
}

//创建队伍
export const createTeam = (teamUrl,teamValues)=>{
    return requests({url:"/team/addTeam",method:"post",data:{teamUrl,teamValues}})
}

//获取当前登录用户创建的队伍
export const teamOfCurrentHuman = ()=>{
    return requests({url:"/team/teamOfCurrentHuman",method:"get"})
}

//获取当前登录用户加入的队伍
export const teamOfUserJoin = ()=>{
    return requests({url:"/team/teamOfUserJoin",method:"get"})
}

//加入队伍
export const joinTeam = (teamId,teamPwd)=>{
    return requests({url:`/team/joinTeam/${teamId}/${teamPwd}`,method:"get"});
} 

//查看队伍
export const searchTeam = (id)=>{
    return requests({url:`/team/searchTeam/${id}`,method:"get"});
}