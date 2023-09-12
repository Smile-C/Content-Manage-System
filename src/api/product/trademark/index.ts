import request from "@/utils/request";
import type { TradeMarkResponseData, TradeMark } from "./type"

enum API {
    TRADEMARK_URL = "/admin/product/baseTrademark",
    // 添加品牌
    ADD_TRADEMARK_URL = "/admin/product/baseTrademark/save",
    // 修改品牌
    UPDATE_TRADEMARK_URL = "/admin/product/baseTrademark/update",
    // 删除品牌
    DELETE_TRADEMARK_URL = "/admin/product/baseTrademark/remove"
}

/**
 * 获取已有品牌
 * @param page 
 * @param limit 
 * @returns 
 */
export const reqHasTradeMark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(`${API.TRADEMARK_URL}/${page}/${limit}`)

/**
 * 修改或新增品牌
 * @param data 
 * @returns 
 */
export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
    if (data.id) {
        // 修改的接口
        return request.put<any, any>(API.UPDATE_TRADEMARK_URL)
    } else {
        // 新增的接口
        return request.post<any, any>(API.ADD_TRADEMARK_URL)
    }
}

/**
 * 删除品牌
 * @param id 
 * @returns 
 */
export const reqDeleteTradeMark = (id: number) => {
    return request.delete<any, any>(`${API.DELETE_TRADEMARK_URL}/${id}`)
}



