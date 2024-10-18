import {defineStore} from "pinia"
import type {StudentState} from "./types/type"
import type {
    studentInfoData,
    studentListFormData,
    studentResponseData,
    studentAllResponseData,
    studentListResponseData,
} from "@/api/student/type"
import {
    reqStudentAll,
    reqStudentList,
    reqStudentAdd,
    reqStudentById,
    reqStudentUpdate,
    reqStudentDelete
} from "@/api/student/index"

let useStudentStore=defineStore("Student",{
    state:():StudentState=>{
        return{
            students:[]
        }
    },
    actions:{
        async getStudentAll(){
            let result:studentAllResponseData=await reqStudentAll();
            if(result.status==0){
                this.students=(result.data as studentInfoData[])
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //列表
        async getStudentList(data:studentListFormData){
            let result:studentListResponseData=await reqStudentList(data);
            if(result.status===0){
                this.students=(result.data?.data as studentInfoData[])
                return result.data
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        async addStudent(data:studentInfoData){
            let result:studentResponseData=await reqStudentAdd(data)
            if(result.status===0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //
        async getStudentById(_id:string){
            let result:studentResponseData=await reqStudentById(_id)
            if(result.status===0){
                return result.data
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //更新
        async updateStudent(data:studentInfoData){
            let result:studentResponseData=await reqStudentUpdate(data);
            if(result.status===0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //删除
        async deleteStudent(studentId:string){
            let result:studentResponseData=await reqStudentDelete(studentId)
            if(result.status===0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        }
    }
})
export default useStudentStore