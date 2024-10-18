import request from "@/utils/request";
import type {
    schoolInfoData,
    schoolListFormData,
    schoolResponseData,
    schoolAllResponseData,
    schoolListResponseData
} from "./type"

enum API{
    SCHOOL_ALL_URL="/manage/shool/all",
    SCHOOL_LIST_URL="/manage/school/list",
    SCHOOL_ADD_URL="/manage/school/add",
    SCHOOL_GET_ID_URL="/manage/school/find",
    SCHOOL_UPDATE_URL="/manage/school/update",
    SCHOOL_DELETE_URL="/manage/school/delete",
}
//所有数据
export const reqSchoolAll=()=>
    request.get<any,schoolAllResponseData>(API.SCHOOL_ALL_URL)
//列表 分页
export const reqSchoolList=(data:schoolListFormData)=>
    request.post<any,schoolListResponseData>(API.SCHOOL_LIST_URL,data)
//添加
export const reqSchoolAdd=(data:schoolInfoData)=>
    request.post<any,schoolResponseData>(API.SCHOOL_ADD_URL,data)
//根据id查询学校
export const reqSchoolById=(_id:string)=>
    //get请求 得在后面拼接发送给后台
    request.get<any,schoolResponseData>(API.SCHOOL_GET_ID_URL+`?_id=${_id}`)
//更新
export const reqSchoolUpdate=(data:schoolInfoData)=>
    request.post<any,schoolResponseData>(API.SCHOOL_UPDATE_URL,data)
//删除
export const reqSchoolDelete=(schoolId:string)=>
    request.post<any,schoolResponseData>(API.SCHOOL_DELETE_URL,{schoolId})