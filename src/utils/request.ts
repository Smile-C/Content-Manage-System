// axios的二次封装：使用请求和响应拦截器
import axios from "axios"
import { ElMessage } from "element-plus"
import useUserStore from "@/store/modules/user"


const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})

request.interceptors.request.use((config) => {
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers.token = userStore.token
    }
    return config
})

request.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    let message = ''
    let status = error.response.status
    switch (status) {
        case 401:
            message = 'token已过期'
            break
        case 403:
            message = "您无权访问"
            break
        case 404:
            message = "请求地址错误"
            break
        case 500:
            message = "服务器崩溃了"
            break
        default:
            message: "网络出现问题"
            break
    }
    ElMessage({
        message,
        type: "error"
    })
    return Promise.reject(error)
})

export default request
