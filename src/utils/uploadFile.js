import { stringifyExpression } from "@vue/compiler-core";
import SparkMD5 from "spark-md5";

const useUploadFile = () => {
  
  // 获取文件流唯一表示md5
  const getMd5ByFIle = (file) => {
    // 通过正则获取 文件后缀
    const reg = /\.([a-zA-Z0-9]+)$/.exec(file.name);
    const suffix = reg ? reg[1] : "";
    console.log(suffix);
    return new Promise(resolve => {
      
      // 读取文件
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const buffer = e.target?.result;
        const spark = new SparkMD5.ArrayBuffer();
        spark.append(buffer);
        const md5 = spark.end();
        resolve({md5, suffix})
      }
    })
  }


  // 对文件进行分片
  function generateChunks(file, md5, suffix) {
    let ChunkSize = 1 * 1024 * 1024; // 单次上传1M
    const maxCount = 100; // 文件分块最大块数
    let count = Math.ceil(file.size / ChunkSize); // 获取文件所需要的快数
    if(count > maxCount){ // 如果文件的块数大于最大块数，则改变单次上传的文件大小
      ChunkSize = file.size / maxCount;
      count = maxCount;
    }
    let cur = 0; 
    const chunks = []; // 存放分块文件

    while (cur < count) {
      const chunk = file.slice(cur*ChunkSize, (cur+1)*ChunkSize ); // 以ChunkSize对文件进行分块
      chunks.push({ file: chunk, fileName: `${md5}_${cur+1}.${suffix}`});
      cur++;
    }
    return chunks;
  }

  // 用formData处理文件
  const getFormData = (data) => {
    const {file, fileName} = data;
    const formData = new FormData();
    formData.append('file',file);
    formData.append('fileName',fileName);
    return formData;
  }
  
  return {
    getMd5ByFIle,
    generateChunks,
    getFormData
  }
};
export default useUploadFile;