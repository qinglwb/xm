//角色接口得类型
export interface getRoleListResponseData{
    status:number,
    data?:roleInfoData[],
    msg?:string,
}
//角色类型
export interface roleInfoData{
    _id?:string,
    name:string,
    menus?:string[],
    create_time:number,
    _v:number,
    auth_time?:number,
    auth_name:string
}
export interface  addRoleResponseData{
    status:number,
    data?:roleInfoData,
    msg?:string
}