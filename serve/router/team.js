const express = require('express')
const router = express.Router()
const db = require('../mysql/index')
//引入解码图片的函数
const cImg = require("../tools/toImage")
//创建队伍
router.post("/team/addTeam",(req,res)=>{
    //整理添加到数据库的队伍信息
    const {username,id} = req.user;
    let {teamUrl} = req.body;
    const teamValues = req.body.teamValues;
    teamValues.username = username;
    teamValues.userId = id;
    teamValues.currentNum = 1;
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    teamValues.createTime = year+'-'+month+'-'+day;
    //判断数据库中是否有该用户创建的队伍，如果有则重复创建
    const selectRepeatTeam = `select * from team where teamname = ?  and username = ?`;
    db.query(selectRepeatTeam,[teamValues.teamname,username],(err,result)=>{
        if(err) return res.cc("创建错误",err)
        if(result.length >= 1) return res.cc("已创建过该队伍")
        else{
            //解码队伍头像，并放在pulic下的teamImgUrl文件夹中
            cImg.createTeamImgPath(teamUrl,teamValues.teamname)
            teamUrl = `http://localhost:1300/public/teamImgUrl/${teamValues.teamname}.jpg`
            teamValues.teamUrl = teamUrl
            const createTeam = `insert into team set ?`
            db.query(createTeam,teamValues,(err,result)=>{
                // console.log(result)
                if(err) return res.cc("创建错误",err)
                /*
                    将用户id和队伍id插入user_team中
                    从result中获取队伍的id,从token中获取用户的id
                */
                const {insertId} = result;//队伍id
                const {id} = req.user; //用户id
                //将它们写入user_team中
                const insertToUserTeam = `insert into user_team (userId,teamId) values(?,?)`;
                //执行
                // console.log(id,insertId)
                db.query(insertToUserTeam,[id,insertId],(err,result)=>{
                    if(err) return console.log("插入user_team失败",err)
                })
                
                if(result.affectedRows == 1){
                    res.send({
                        code:200,
                        message:"创建成功"
                    })
                }
            })
            
        }
    })

})

//获取所有队伍、搜索队伍
router.get("/team/getAllTeam/:value?",(req,res)=>{
    const value = req.params.value;
    // console.log(value)
    let selectAllTeam;
    if(value){
        selectAllTeam = `select * from team where teamname like '%${value}%'`
    }else{
        selectAllTeam = `select * from team`;
    }
    // console.log(selectAllTeam)
    //获取当前登录用户的所在的队伍
    const {id} = req.user;
    // console.log(id);
    const selectUserTeam = `select * from user_team where userId = ${id}`;
    //用户是否存在在该队伍里
    let userExistTeam = [];
    // let isExist = true;
    db.query(selectUserTeam,(err,result)=>{
        if(err) return res.cc("请求失败"+err);
        // console.log(result)
        if(result.length >= 1){
            userExistTeam = result;
        }
    })
    db.query(selectAllTeam,(err,result)=>{
        if(err) return res.cc("请求失败"+err);
        // console.log(result)
        if(result.length >= 1){
            //和搜索的结果进行判断，如果用户在该队伍里，则给该列属性添加isExist属性
            // console.log(userExistTeam)
             result.forEach(el=>{
                if(userExistTeam.length > 1){
                    userExistTeam.forEach(user=>{
                        if(el.id == user.teamId){//将team中的队伍id和user_team中的id进行比较，如果想相同说明用户已加入该队伍
                            el.isExist = true;
                        }
                    })
                }else{
                    el.isExist = false
                }
            })
            // console.log(result)
            return res.send({
                code:200,
                message:"请求成功",
                data:result
            });
        }else{
            return res.send({
                code:200,
                message:"请求成功",
                data:[]
            })
        }
    })
})

//加入队伍
router.get("/team/joinTeam/:teamId/:teamPwd?",(req,res)=>{
    //从token中获取用的id信息，获取客户端传来的队伍id
    const {teamId,teamPwd} = req.params;
    console.log(teamId)
    console.log(teamPwd);
    const {id} = req.user;
    if(teamPwd!='undefined'){
        
    }
    // else{
    //     const joinTeam = `insert into user_team (teamId,userId) values (${teamId},${id})`;
    //     const updateCurrentNum = `update team set currentNum = currentNum+1 where id = ${teamId}`;
    //     db.query(updateCurrentNum,(err,result)=>{
    //          if(err) return console.log("人数加加失败",err);
    
    //     })
    //     db.query(joinTeam,(err,result)=>{
    //         if(err) return res.cc("加入失败",err);
    //         if(result.affectedRows == 1){
    //             res.send({
    //                 code:200,
    //                 message:"加入成功",
    //             })
    //         }
    //     })
    // }

})

//查看队伍
router.get("/team/searchTeam/:teamId",(req,res)=>{
    const {teamId} = req.params
    // console.log(teamId)
    const selectTeam = `select * from team where id = ?`;
    db.query(selectTeam,teamId,(err,result)=>{
        if(err) return res.cc("获取失败"+err);
        // console.log(result)
        if(result.length == 1){
            res.send({
                code:200,
                message:"请求成功",
                data:result
            })
        }
    })
})

//获取用户创建的队伍
router.get("/team/teamOfCurrentHuman",(req,res)=>{
    //获取token中的用户名
    const {username} = req.user
    const selectTeamOfMine = `select * from team where username = ?`
    db.query(selectTeamOfMine,username,(err,result)=>{
        if(err) return res.cc("获取错误",err)
        if(result.length >= 1){
            return res.send({
                code:200,
                message:"请求成功",
                data:result
            })
        }else{
            return res.cc("暂无数据")
        }
    })
})

//获取用户加入的队伍
router.get("/team/teamOfUserJoin",(req,res)=>{
    //获取token中的用户id
    const {id} = req.user;
    //根据id去user_team中找用户的队伍
    const selectTeamOfUser = `select teamId from user_team where userid = ?`;
    db.query(selectTeamOfUser,id,(err,result)=>{
        // console.log(result)
        if(err) return res.cc("获取错误",err)
        const selectTeam = `select * from team where id in (?)`;
        // 将idObj转换为仅包含ID的数组
        const idArray = result.map(item => item.teamId);        
        // console.log(idArray)
        db.query(selectTeam,[idArray],(err,result)=>{
            //如果用户有加入队伍
            if(result){
                res.send({
                    code:200,
                    message:"请求成功",
                    data:result
                })
            }
            //如果用户没有加入队伍
            else{
                res.send({
                    code:200,
                    message:"请求成功",
                    code:[]
                })
            }
        })
    })
})

//解散队伍
router.get("/team/deleteTeam",(req,res)=>{
    
})
//导出router
module.exports = router
