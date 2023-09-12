export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// 获取品牌数据的数据类型
export interface TradeMark {
    id?: number,
    tmName: string,
    logoUrl: string
}

export type Records = TradeMark[]


export interface TradeMarkResponseData extends ResponseData {
    data: {
        records: Records
    },
    total: number,
    size: number,
    current: number,
    searchCount: boolean,
    pages: number
}
