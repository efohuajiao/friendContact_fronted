const fs = require('fs');
const path = require('path');
//导入判断目录是否已经存在的处理模块
const mkdir = require('./mkdir')

module.exports.createImgPath =(avatarUrl,username)=> {
        let base64 = avatarUrl.replace(/^data:image\/\w+;base64,/, "")
        //把base64码转成buffer对象，
        const dataBuffer = Buffer.from(base64, 'base64')
        // 根据路径动态创建文件夹，如果文件夹存在就不再创建文件夹，反之则创建文件夹
        mkdir.mkdirs(path.join(__dirname, `../public/avatarUrl`), err => {
            console.log(err); // 错误的话，直接打印
        });
        const avatarPath = path.join(__dirname, `../public/avatarUrl/${username}.jpg`)
        fs.writeFile(avatarPath, dataBuffer, function (err) {//用fs写入文件
            if (err) {
                // console.log(err);
            } else {
                console.log('写入成功！');
            }
        })
    }
    
module.exports.createTeamImgPath = (teamUrl,teamname)=>{
    let base64 = teamUrl.replace(/^data:image\/\w+;base64,/, "")
    //把base64码转成buffer对象，
    const dataBuffer = Buffer.from(base64, 'base64')
    // 根据路径动态创建文件夹，如果文件夹存在就不再创建文件夹，反之则创建文件夹
    mkdir.mkdirs(path.join(__dirname, `../public/teamImgUrl`), err => {
        console.log(err); // 错误的话，直接打印
    });
    const avatarPath = path.join(__dirname, `../public/teamImgUrl/${teamname}.jpg`)
    fs.writeFile(avatarPath, dataBuffer, function (err) {//用fs写入文件
        if (err) {
            // console.log(err);
        } else {
            console.log('写入成功！');
        }
    })
}