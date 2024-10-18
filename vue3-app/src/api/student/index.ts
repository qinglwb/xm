import request from "@/utils/request"; 
import type{
    studentInfoData,
    studentListFormData,
    studentResponseData,
    studentAllResponseData,
    studentListResponseData,
    studentYearResponseData
} from "./type"

enum API{
    STUDENT_ADD_URL="/manage/student/add",
    STUDENT_GET_ID_URL="/manage/student/find",
    STUDENT_UPDATE_URL="/manage/student/update",
    STUDENT_ALL_URL="/manage/student/all",
    STUDENT_LIST_URL="/manage/student/list",
    STUDENT_DELETE_URL="/manage/student/delete",
    STUDENT_MONTH_DATA_URL="/manage/student/date"
}
export const reqStudentAll=()=>{
    return request.get<any,studentAllResponseData>(API.STUDENT_ALL_URL)
}
export const reqStudentList=(data:studentListFormData)=>{
    return request.post<any,studentListResponseData>(API.STUDENT_LIST_URL,data)
}
export const reqStudentAdd=(data:studentInfoData)=>
    request.post<any,studentResponseData>(API.STUDENT_ADD_URL,data)

export const reqStudentById=(_id:string)=>
    request.get<any,studentResponseData>(API.STUDENT_GET_ID_URL+`?_id=${_id}`)

export const reqStudentUpdate=(data:studentInfoData)=>
    request.post<any,studentResponseData>(API.STUDENT_UPDATE_URL,data)

export const reqStudentDelete=(studentId:string)=>
    request.post<any,studentResponseData>(API.STUDENT_DELETE_URL,{studentId})

//学生数量
export const reqStudentForYear=(year:number)=>{
    return request.post<any,studentYearResponseData>(API.STUDENT_MONTH_DATA_URL,{year})
}