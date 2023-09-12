// 用户小仓库
import { defineStore } from "pinia"
import { reqLogin, reqLogout, reqUserInfo } from "@/api/user"
import type { loginFromData, loginResponseData, getUserInfoResponse } from "@/api/user/type";
import { routes } from "@/router/routes"
import type { userState } from "./type"
let useUserStore = defineStore("User", {
    // 数据
    state: (): userState => {
        return {
            token: localStorage.getItem("TOKEN"),
            menuRoutes: routes,
            username: "",
            avatar: ""
        }
    },
    // 异步
    actions: {
        async userLogin(data: loginFromData) {

            let result: loginResponseData = await reqLogin(data)

            if (result.code === 200) {
                // 登录成功，存储token
                this.token = (result.data as string)
                // 本地存储一份
                localStorage.setItem("TOKEN", (result.data as string))
                return "ok"
            } else {
                //登录失败
                return Promise.reject(new Error(result.data))
            }
        },
        /**
         * 获取用户信息
         */
        async getUserInfo() {
            let result: getUserInfoResponse = await reqUserInfo()
            if (result.code == 200) {
                // 登录成功，有用户信息
                this.username = result.data.name
                this.avatar = result.data.avatar
                return "ok"
            } else {
                // 获取用户信息失败
                return Promise.reject(new Error(result.message))
            }
        },
        async userLogout() {
            let result: any = await reqLogout()
            if (result.code == 200) {
                this.token = ""
                this.username = ""
                this.avatar = ""
                localStorage.removeItem("TOKEN")
                return "ok"
            } else {
                return Promise.reject(new Error(result.message))
            }


        }
    },
    // 计算属性
    getters: {}
})

export default useUserStore