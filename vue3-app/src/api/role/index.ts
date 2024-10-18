// 角色的接口
import request from "@/utils/request"
import type{
    getRoleListResponseData,
    roleInfoData,
    addRoleResponseData
} from "./type"

//获取角色列表
export const getRoleList=()=>request.get<any,
getRoleListResponseData>("/manage/role/list")

//添加角色数据
export  const addRole=(data:roleInfoData)=>
    request.post<any,addRoleResponseData>("/manage/role/add",data)
//更新角色数据
export const updateRole=(data:roleInfoData)=>
    request.post<any,addRoleResponseData>("/manage/role/update",data)