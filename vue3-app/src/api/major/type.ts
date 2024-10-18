export interface majorData{
    _id?:string,
    majorname:string,
    __v?:number
}
//获取所有
export interface majorAllData{
    status:number,
    //数组
    data?:majorData[],
    msg?:string,
}
//
export interface majorAddData{
    status:number,
    data?:majorData,
    msg?:string
}
export interface majorUpdateData{
    status:number,
    //
    data?:majorData,
    msg?:string,
}
//分页
export interface majorListFormData{
    page:number,
    size:number,
}
//打得分页数据
export interface majorListReponseData{
    status:number,
    //
    data?:majorListData,
    msg?:string
}
//小的
export interface majorListData{
    total:number,
    data:majorData[]
}