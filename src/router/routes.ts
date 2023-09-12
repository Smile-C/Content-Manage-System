import type { RouteRecordRaw } from "vue-router"
export const routes: RouteRecordRaw[] = [
    {
        path: "",
        redirect: "/layout",
        meta: {
            title: "/",
            hidden: true,
            icon: "Link"
        },

    },
    {
        path: "/layout",
        component: () => import("@/layout/index.vue"),
        name: "layout",
        redirect: "/home",
        meta: {
            title: "layout",
            hidden: false,
            icon: "House"
        },
        children: [
            {
                path: "/home",
                component: () => import("@/views/home/index.vue"),
                name: "Home",
                meta: {
                    title: "主页",
                    hidden: false,
                    icon: "Link"
                }
            }
        ]
    },
    {
        path: "/login",
        component: () => import('@/views/login/index.vue'),
        name: "login",
        meta: {
            title: "login",
            hidden: true,
            icon: "Bell"
        },
        children: [
            {
                path: "/login_c1",
                component: () => import("@/views/home/index.vue"),
                meta: {
                    title: "login_c1",
                    hidden: false,
                    icon: "Check"
                },
            },
            {
                path: "/login_c2",
                component: () => import("@/views/login/index.vue"),
                meta: {
                    title: "login_c2",
                    hidden: false,
                    icon: "Open"
                },
            }
        ]
    },
    {
        path: "/404",
        component: () => import("@/views/404/index.vue"),
        name: "404",
        meta: {
            title: "404",
            hidden: true,
            icon: "Crop"
        },
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
        name: "Any",
        meta: {
            title: "pathMatch",
            hidden: true,
            icon: "Expand"
        },
    },
    {
        path: "/screen",
        component: () => import("@/views/screen/index.vue"),
        name: "screen",
        meta: {
            title: "数据大屏",
            hidden: false,
            icon: "Platform"
        }
    },
    {
        path: "/acl",
        component: () => import("@/layout/index.vue"),
        name: "Acl",
        redirect: "/acl/user",
        meta: {
            title: "权限管理",
            hidden: false,
            icon: "Unlock"
        },
        children: [
            {
                path: "/acl/user",
                component: () => import("@/views/acl/user/index.vue"),
                name: "user",
                meta: {
                    title: "用户管理",
                    icon: "User",
                    hidden: false
                }
            },
            {
                path: "/acl/role",
                component: () => import("@/views/acl/role/index.vue"),
                name: "Role",
                meta: {
                    title: "部门管理",
                    icon: "Tools",
                    hidden: false
                }
            },
            {
                path: "/acl/permission",
                component: () => import("@/views/acl/permission/index.vue"),
                name: "Permission",
                meta: {
                    title: "职位管理",
                    icon: "Promotion",
                    hidden: false
                }
            }

        ]
    },
    {
        path: "/product",
        component: () => import("@/layout/index.vue"),
        name: "Product",
        redirect: "/product/trademark",
        meta: {
            title: "商品管理",
            icon: "Handbag",
            hidden: false
        },
        children: [
            {
                path: "/product/trademark",
                component: () => import("@/views/product/trademark/index.vue"),
                name: "Trademark",
                meta: {
                    title: "品牌管理",
                    icon: "Cherry",
                    hidden: false
                }
            },
            {
                path: "/product/attr",
                component: () => import("@/views/product/attr/index.vue"),
                name: "Attr",
                meta: {
                    title: "属性管理",
                    icon: "IceCreamSquare",
                    hidden: false
                }
            },
            {
                path: "/product/sku",
                component: () => import("@/views/product/sku/index.vue"),
                name: "Sku",
                meta: {
                    title: "sku",
                    icon: "Apple",
                    hidden: false
                }
            },
            {
                path: "/product/spu",
                component: () => import("@/views/product/spu/index.vue"),
                name: "Spu",
                meta: {
                    title: "spu",
                    icon: "Orange",
                    hidden: false
                }
            },
        ]
    }
]