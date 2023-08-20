const express = require("express")
const app = express()
//解决跨域
const cors = require('cors')
app.use(cors())

//使用express.static托管静态文件，暂时托管用户的头像
app.use("/public",express.static('public'))
//解析客户端传递过来的表单数据
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit:'2100000kb',extended: true }));

//封装res.cc函数优化错误相应信息
app.use((req,res,next)=>{
    res.cc = (err,code = 201)=>{
        res.send({
            code,
            message:err
        })
    }
    next();
})

//引入expressJWT进行解析token
const expressJWT = require("express-jwt")
const config = require("./config")
app.use(expressJWT({secret:config.jwtSceretKey}).unless({path:[/^\/api\/userRegitser|\/userLogin/]}))

//引入user和teamrouter
const userRouter = require('./router/user')
const teamRouter = require("./router/team")
app.use('/api',userRouter)
app.use('/api',teamRouter)
// 捕获解析JWT失败后产生的错误
app.use((err,req,res,next)=>{
    if(err.name === 'UnauthorizeError') return res.cc("身份认证失败")
    //未知的错误
    res.send(err.message)
})

app.listen(1300,()=>{console.log("http://127.0.0.1:1300")})
