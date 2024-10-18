import request from "@/utils/request";
import type {
    //所有数据(大的)
    majorAllData,
    //添加
    majorAddData,
    //分页
    majorListFormData,
    //大的列表
    majorListReponseData,
    //小的专业
    majorData,
    majorUpdateData,
} from "./type"
enum API{
    MAJOR_ADD_URL="/manage/major/add",
    MAJOR_GET_ID_URL="/manage/major/find",
    MAJOR_UPDATE_URL="/manage/major/update",
    MAJOR_ALL_URL="/manage/major/all",
    MAJOR_LIST_URL="/manage/major/list",
    MAJOR_DELETE_URL="/manage/major/delete"
}
//添加
export const reqMajorAdd=(data:majorData)=>{
    return request.post<any,majorAddData>(API.MAJOR_ADD_URL,data)
}
//查询
export const reqMajorQuery=(_id:string)=>{
    //get请求 得在后面拼接发送给后台?_id={}
    return request.get<any,majorAddData>(API.MAJOR_GET_ID_URL+`?_id=${_id}`)
}
//更新
export const reqMajorUpdate=(data:majorData)=>{
    return request.post<any,majorUpdateData>(API.MAJOR_UPDATE_URL,data)
}
//获取所有
export const reqMajorAll=()=>{
    return request.get<any,majorAllData>(API.MAJOR_ALL_URL)
}
//分页
export const reqMajorList=(data:majorListFormData)=>{
    return request.post<any,majorListReponseData>(API.MAJOR_LIST_URL,data)
}
//删除
export const reqMajorDelete=(majorId:string)=>{
    return request.post<any,majorAddData>(API.MAJOR_DELETE_URL,{majorId})
}

