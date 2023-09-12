import request from "@/utils/request";
import type { C1ResponseData, AttrInfoListResponseData, AttrinfoListData } from "@/api/product/attr/type"
enum API {
    //获取1级分类
    C1_URL = "/admin/product/getCategory1",
    // 获取二级分类
    C2_URL = "/admin/product/getCategory2/",
    // 获取三级分类
    C3_URL = "/admin/product/getCategory3/",
    // 三级分类确定，获取信息
    ATTRINFOLIST_URL = "/admin/product/attrInfoList/",
    // 新增或修改属性
    INSERTORUPDATE_URL = "/admin/product/saveAttrInfo",
    DELETEATTR_URL = "/admin/product/deleteAttr/"
}

/**
 * 获取1级分类列表
 * @returns 
 */
export const reqC1 = () => request.get<any, C1ResponseData>(API.C1_URL)


/**
 * 获取二级分类
 * @param C1Id 1级分类的id
 * @returns 
 */
export const reqC2 = (C1Id: number) => request.get<any, C1ResponseData>(API.C2_URL + C1Id)

/**
 * 获取三级分类
 * @param C2Id 2级分类的id
 * @returns 
 */
export const reqC3 = (C2Id: number) => request.get<any, C1ResponseData>(API.C3_URL + C2Id)

/**
 * 3级ID已知，获取列表信息
 * @param c1Id 
 * @param c2Id 
 * @param c3Id 
 * @returns 
 */
export const reqAttrInfoList = (c1Id: number, c2Id: number, c3Id: number) => request.get<any, AttrInfoListResponseData>(API.ATTRINFOLIST_URL + c1Id + "/" + c2Id + "/" + c3Id)

/**
 * 新增或修改属性
 */
export const reqInsertOrUpdateAttr = (data: AttrinfoListData) => request.post<any, any>(API.INSERTORUPDATE_URL, data)

/**
 * 删除属性
 */
export const reqDeleteAttr = (id: number | string) => request.delete<any, any>(API.DELETEATTR_URL + id)