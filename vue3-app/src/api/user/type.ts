export interface loginFormData{
    username:string,
    password:string
}
interface dataType{
    token?:string
}
//登录
export interface loginResponseData{
    status:number,
    data?:userInfoData,
    msg?:string
}
//用户的角色数据类型
interface userRoleData{
    _id?:string,
    name?:string,
    menus:string[],
    create_time?:number,
    __v?:number,
    auth_time?:number,
    auth_name?:string
}

//用户具体的类型
export interface userInfoData{
    _id:string,
    username:string,
    name?:string,
    password:string,
    phone?:string,
    role_id?:string,
    create_time:number,
    token:string,
    __v:number,
    //增加的角色
    role:userRoleData
}
export interface userInfoResponseData{
    status:number,
    data:userInfoData
}

export interface pwdData{
    userId:string,
    password:string,
}
export interface checkPwdResponseData{
    status:number,
    data?:userInfoData,
    msg?:string
}



export interface userListFormData{
    page:number,
    size:number
}
//用户列表
export interface userAllResponseData{
    status:number,
    data?:userInfoData[],
    msg?:string
}
export interface userListResponseData{
    status:number,
    data?:userListData,
    msg?:string
}
export interface userListData{
   data:userInfoData[],
   roles:[],
   total:number
}