const express = require('express')
//定义路由
const router = express.Router()
//引用数据库
const db = require('../mysql/index')
db.query("select 1", (err, result) => {
    if (err) return console.log("失败")
    else console.log("连接成功")
})
//引入创建图片路径的方法
const toImage = require("../tools/toImage")
//引入token和密钥
const jwt = require('jsonwebtoken')
const config = require("../config")
// console.log(config.jwtSceretKey)


//用户注册接口(userRegister)
router.post("/userRegitser", (request, response) => {
    // console.log(request.body)
    let { username, password, createTime, avatarUrl } = request.body
    // console.log(avatarUrl)
    //将用户头像的base64转换为图片路径
    //判断用户名是否被占用，因为用户名是唯一的
    const detectUser = `select * from user_lists where username = ?`
    db.query(detectUser, username, (err, result) => {
        //用户名被占用
        if (result.length >= 1)
            return response.cc("用户名已被占用")
        //用户名可用,随机生成4位id
        let planetCode = ""
        for (let i = 0; i < 4; i++) {
            planetCode += Math.floor(Math.random() * 10)
        }
        const insertInfo = `insert into user_lists (username,password,createTime,avatarUrl,planetCode) values(?,?,?,?,?)`
        //生成用户的图片路径
        toImage.createImgPath(avatarUrl,username)
        avatarUrl = `http://localhost:1300/public/avatarUrl/${username}.jpg`
        db.query(insertInfo, [username, password, createTime,avatarUrl, planetCode], (err, result) => {
            if (err) return response.cc("注册失败" + err.message)
            if (result.affectedRows == 1)
                return response.send({ code: 200, message: "注册成功" })
        })
    })
})


//用户登录接口(userLogin)
router.post("/userLogin", (req, res) => {
    const { username, password } = req.body
    //查询数据库的数据
    const selectUser = `select * from user_lists where username = ?`
    db.query(selectUser, username, (err, result) => {
        //数据库中没有数据
        if (result.length < 1)
            return res.cc("该用户尚未注册！")
        //密码错误
        if (password != result[0].password)
            return res.cc("密码错误！")
        //在服务端生成token字符串
        else {
            const userInfo = { ...result[0], password: '', avatarUrl: '' }
            // console.log(userInfo)
            let tokenStr = jwt.sign(userInfo, config.jwtSceretKey, { expiresIn: "5h" })
            res.send({ code: 200, message: "登录成功", token: "Bearer " + tokenStr })
        }
    })
})

//用户信息接口(userPage)
router.get("/userInfo", (req, res) => {
    //获取token中的用户名并在数据库中查询
    let planetCode = req.user.planetCode
    //定义查询语句
    const selectUser = `select * from user_lists where planetCode=?`
    db.query(selectUser, planetCode, (err, result) => {
        if (err) return res.cc(err.message)
        if (result.length == 1) {
            res.send({
                code: 200,
                message: "请求成功",
                data: result[0]
            })
        }

    })

})

//用户修改信息接口(用户修改信息页面))
router.post("/userEditInfo", (req, res) => {
    let { editName, currentValue } = req.body
    let { planetCode,username } = req.user
    //如果修改的是昵称，判断数据库中是否有相同的，如果有则不允许修改
    if (editName == 'username') {
        const selectUsername = `select username from user_lists where planetCode=${planetCode}`
        db.query(selectUsername, (err, result) => {
            if (result.length >= 1 && result[0].username == currentValue) {
                return res.cc("该昵称已被注册")
            }
            //如果没被注册则进行修改
            else {
                const updateUsername = `update user_lists set username = ? where planetCode=${planetCode}`
                db.query(updateUsername, currentValue, (err, result) => {
                    if (err) return res.cc(err.message)
                    if (result.affectedRows == 1) {
                        return res.send({
                            code: 200,
                            message: "修改成功"
                        })
                    }
                })
            }

        })

    }
    //如果是其他的，则进行修改
    else {
        if(editName == 'avatarUrl'){
            toImage.createImgPath(currentValue,username)
            currentValue = `http://localhost:1300/public/avatarUrl/${username}.jpg`
        }
        const updateUserInfo = `update user_lists set ${editName} = ? where planetCode=${planetCode}`
        db.query(updateUserInfo, currentValue, (err, result) => {
            if (err) return res.cc(err.message)
            if (result.affectedRows == 1) {
                return res.send({
                    code: 200,
                    message: "修改成功"
                })
            }
        })
    }
})

//用户修改标签接口(用户修改信息页面)
router.get("/userEditTags/:tags/:planetCode", (req, res) => {
    //获取客户端传来的tags
    let { tags, planetCode } = req.params
    // console.log(req.params)
    tags = JSON.stringify(tags)
    //创建sql语句，覆盖之前的tags标签
    const coverTags = `update user_lists set tags = ${tags} where planetCode = ${planetCode}`
    //执行sql语句
    db.query(coverTags, (err, result) => {
        if (err) return res.cc(err.message)
        if (result.affectedRows == 1) {
            return res.send({
                code: 200,
                message: "修改成功"
            })
        }
    })
})

//根据标签查找用户接口(搜索页面)
router.get("/userList/:tag", (request, response) => {
    // console.log(request.params)
    const params = request.params
    // console.log(params.tag)
    //将获得的tag字符串转为数组
    const tagsArray = JSON.stringify(params.tag.split(","))
    // console.log(tagsArray)
    const selectTag = `SELECT * FROM user_lists WHERE JSON_CONTAINS(tags,'${tagsArray}')`
    db.query(selectTag, (err, results) => {
        if (err) return console.log("出错了" + err.message)
        else
            response.send({
                code: 200,
                message: "请求成功",
                data: results
            }
            )
    })
})

//点击联系我显示对应的用户信息
router.get("/user/userInfo/:id",(req,res)=>{
    //获取用户的id，根据id取数据库中查找用户的数据，返回给客户端
    const {id} = req.params;
    // console.log(id)
    const selectUser = `select * from user_lists where id = ?`;
    db.query(selectUser,id,(err,result)=>{
        if(err) return res.cc(err.message);
        if(result.length >= 1){
            return res.send({
                code:200,
                message:"请求成功",
                data:result
            })
        }
    })

})

//主页显示全部用户接口
router.get("/getAllUserInfo", (req, res) => {
    //直接选择数据库中的所有数据
    const {username} = req.user;
   
    // console.log(username)
    //选择除了用户本身的所有用户
    const selectAll =  `select * from user_lists where username != '${username}'`;
    let result = [];
    for(let i = 0;i < 10000;i++){
        result.push({id:i,name:"张三",profile:"你好，我是张三",avatarUrl:"https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",tags:['学习中']})
    }
    res.send(result)
    // db.query(selectAll, (err, results) => {
    //     if (err) return res.cc(err.message)
    //     if (results.length >= 1) {
    //         res.send({
    //             code: 200,
    //             message: "请求成功",
    //             data: results
    //         })
    //     }
    // })
})
//暴露router
module.exports = router