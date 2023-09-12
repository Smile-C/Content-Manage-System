// 路由鉴权
import router from "./router";
import nprogress from "nprogress"
import "nprogress/nprogress.css"

import pinia from "@/store/index"
import useUserStore from "./store/modules/user";
const userState = useUserStore(pinia)

const username = userState.username

// 前置路由守卫

router.beforeEach(async (to: any, from: any, next) => {
    nprogress.start()
    if (userState.token) {
        // 有token,有登录
        if (to.path === "/login") {
            next({ path: "/" })
        } else {
            if (username) {
                next()
            } else {

                try {
                    await userState.getUserInfo()
                    next()
                } catch (error) {
                    // token过期
                    await userState.userLogout()
                    next({ path: "/login" })
                }

            }
        }
    } else {
        // 无token,没有登录
        if (to.path === "/login") {
            next()
        } else {
            next({ path: "/login" })
        }
    }
    // next()
})
// 后置路由守卫

router.afterEach((to, from) => {
    document.title = to.meta.title as string
    nprogress.done()
})