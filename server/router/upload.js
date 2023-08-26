const express = require("express");
const fs = require('fs')
const router = express.Router();
let multiparty = require("multiparty");
const UPLOAD_DIR = `${__dirname}/upload`

const multipartyFormData = (req) => {
    return new Promise(async (resolve, reject) => {
      new multiparty.Form().parse(req, (err, fields, files) => {
        if (err) {
          reject(err)
          return
        }
  
        resolve({
          fields,
          files
        })
      })
    })
  }
  

// 写文件
const writeFile = (resp, path, file) => {
    try {
      const buffer = fs.readFileSync(file.path)
      fs.writeFile(path, buffer, function (err) {
        resp.send({
          code: 200,
          msg: 'success'
        })
      })
    } catch (err) {
      console.log('文件块写入失败：', err)
    }
  }
// 上传切片
router.post('/merge_file', async(req, resp) => {
    try {
      let { fields, files } = await multipartyFormData(req)
        console.log(fields, files);
      let file = (files.file && files.file[0]) || {},
          fileName = (fields.fileName && fields.fileName[0]) || '',
          path = '',
          isExists = false
  
      let md5 = /^([^_]+)_(\d+)/.exec(fileName)[1]
  
      path = `${UPLOAD_DIR}/${md5}`
  
      // 没有该文件的文件夹就新建一个文件夹放这个文件块
      !fs.existsSync(path) ? fs.mkdirSync(path) : null
  
      path = `${UPLOAD_DIR}/${md5}/${fileName}`
  
      // 如果已经存在这个文件就不用进行下面写文件的操作了
      isExists = await fs.existsSync(path)
  
      if (isExists) {
        resp.send({
          code: 200,
          msg: 'success'
        })
        return
      }
  
      // 给每个块写进去这个文件夹中
      writeFile(resp, path, file)
  
    } catch(err) {
      console.log('上传切片报错：', err)
  
      resp.send({
        code: 400,
        msg: 'fail'
      })
    }
  })
  

module.exports = router;
