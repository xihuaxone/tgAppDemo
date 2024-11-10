import axios from 'axios';

// 第一步，创建实例
const axiosClient = axios.create({
    baseURL: 'http://localhost:10183',
    timeout: 10000
});

// 第二步，请求拦截
axiosClient.interceptors.request.use(
    function (config) {
        // const authorization=localStorage.getItem("Authorization");
        // config.headers.Authorization = authorization ? authorization : '';
        config.headers.set("Access-Control-Allow-Origin", "*");
        return config;
    }, function (error) {
        // 请求错误处理
        return Promise.reject(error);
    }
);

export default axiosClient;