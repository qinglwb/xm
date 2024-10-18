//用户相关的接口
import request from "@/utils/request"
import type {
    loginFormData,
    //大的类型
    loginResponseData,
    //用户接口
    // userInfoResponseData
    pwdData,
    checkPwdResponseData,
    //用户具体的类型
    userInfoData,
    userListFormData,
    userAllResponseData,
    userListResponseData,
} from "./type"


enum API{
    //登录
    LOGIN_URL="/login",
    // USERINFO_URL="/user/info",
    LOGOUT_URL="/logout",
    //manage是
    CHECK_PWD_URL="/manage/user/pwd",
    UPDATE_PWD_URL="/manage/user/pwd",
    //用户
    USER_ALL_URL="/manage/user/all",
    USER_LIST_URL="/manage/user/list",
    USER_ADD_URL="/manage/user/add",
    USER_GET_ID_URL="/manage/user/find",
    USER_UPDATE_URL="/manage/user/update",
    //删除
    USER_DELETE_URL="/manage/user/delete"
}
//data接受 用户名和密码
export const reqLogin =(data:loginFormData)=>{
   return request.post<any,loginResponseData>(API.LOGIN_URL,data)
}
//获取用户
// export const reqUserInfo=()=>{
//    return request.get<any,userInfoResponseData>(API.USERINFO_URL)
// }
//退出
export const reqLogout=()=>{
    return request.post<any,any>(API.LOGOUT_URL)
}
export const reqCheckPwd=(data:pwdData)=>{
    return request.post<any,checkPwdResponseData>(API.CHECK_PWD_URL,data)
}
export const reqUpdatePwd=(data:pwdData)=>{
    return request.put<any,checkPwdResponseData>(API.UPDATE_PWD_URL,data)
}
//用户
export const reqUserAll=()=>{
    return request.get<any,userAllResponseData>(API.USER_ALL_URL)
}
export const reqUserList=(data:userListFormData)=>{
    return request.post<any,userListResponseData>(API.USER_LIST_URL,data)
}
export const reqUserAdd=(data:userInfoData)=>
    request.post<any,loginResponseData>(API.USER_ADD_URL,data)

export const reqUserById=(_id:string)=>
    request.get<any,loginResponseData>(API.USER_GET_ID_URL+`?_id=${_id}`)

export const reqUserUpdate=(data:userInfoData)=>
    request.post<any,loginResponseData>(API.USER_UPDATE_URL,data)

export const reqUserDelete=(userId:string)=>
    request.post<any,loginResponseData>(API.USER_DELETE_URL,{userId})