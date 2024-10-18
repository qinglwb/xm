//小的学校数据列表
export interface schoolInfoData{
    _id?:string,
    schoolname:string,
    __v?:number
}
//分页
export interface schoolListFormData{
    page:number,
    size:number
}
export interface schoolResponseData{
    status:number,
    //
    data?:schoolInfoData,
    msg?:string
}
export interface schoolAllResponseData{
    status:number,
    data?:schoolInfoData[],
    msg?:string
}
//大的分页数据
export interface schoolListResponseData{
    status:number,
    data?:schoolListData,
    msg?:string
}
//小分页
interface schoolListData{
    data:schoolInfoData[],
    total:number,
}