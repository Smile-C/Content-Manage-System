// 小仓库
import { defineStore } from "pinia"
import { reqAttrInfoList } from "@/api/product/attr/index";
import { reqC1, reqC2, reqC3 } from "@/api/product/attr/index";
import type { categoryState } from "./type"
import type { AttrInfoListResponseData } from "@/api/product/attr/type";
const useCategoryStore = defineStore("category", {
    state: (): categoryState => {
        return {
            c1List: [],
            c2List: [],
            c3List: [],
            c1Id: "",
            c2Id: "",
            c3Id: "",
            AttrInfoList: []
        }
    },
    actions: {
        async getC1List() {
            let result = await reqC1()
            if (result.code === 200) {
                this.c1List = result.data
            }
        },
        async getC2List() {
            let result = await reqC2(this.c1Id as number)
            if (result.code === 200) {
                this.c2List = result.data
            }
        },
        async getC3List() {
            let result = await reqC3(this.c2Id as number)
            if (result.code === 200) {
                this.c3List = result.data
            }
        },
        /**
 * 根据3级id获取列表信息
 */
        async queryAttrInfo() {
            let result: AttrInfoListResponseData = await reqAttrInfoList(
                this.c1Id as number, this.c2Id as number, this.c3Id as number
            );
            if (result.code === 200) {
                this.AttrInfoList = result.data
            }
        }
    },
    getters: {}
})

export default useCategoryStore