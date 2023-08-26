//引入axios
import axios from "axios";

const requests = axios.create({
    baseURL:"http://127.0.0.1:1300/api",
    
})
// 添加请求拦截器
requests.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //将存储在localStorage中的信息传给服务器
    if(sessionStorage.getItem("TOKEN")){
      config.headers.Authorization = sessionStorage.getItem("TOKEN")
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default requests;