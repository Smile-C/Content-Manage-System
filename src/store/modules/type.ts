import type { RouteRecordRaw } from "vue-router"
import type { C1Data } from "@/api/product/attr/type"
import type { AttrinfoListData } from "@/api/product/attr/type";
export interface userState {
    token: string | null,
    menuRoutes: RouteRecordRaw[],    //路由
    username: string,
    avatar: string
}

export interface categoryState {
    c1List: C1Data[],
    c2List: C1Data[],
    c3List: C1Data[],
    c1Id: string | number,
    c2Id: string | number,
    c3Id: string | number,
    AttrInfoList: AttrinfoListData[]
}