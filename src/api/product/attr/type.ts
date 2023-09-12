import type { ResponseData } from "../trademark/type";

export interface C1Data {
    id: number,
    name: string
}
interface C2Data extends C1Data {
    category1Id: number
}

interface C3Data extends C1Data {
    category2Id: number
}

export interface C1ResponseData extends ResponseData {
    data: C1Data[] | C2Data[] | C3Data[]
}


/**
 * 根据3级ID获取列表信息
 */
export interface AttrValueData {

    id?: number | string,
    valueName: string,
    attrId?: number | string,
    flag:boolean

}

export interface AttrinfoListData {
    id?: number,
    attrName: string,
    categoryId: number | string,
    categoryLevel: number,
    attrValueList: AttrValueData[]

}

export interface AttrInfoListResponseData extends ResponseData {
    data: AttrinfoListData[]
}
