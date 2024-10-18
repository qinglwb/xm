import {defineStore} from "pinia"
import {
    reqClassAll,
    reqClassList,
    reqClassAdd,
    reqClassById,
    reqClassUpdate,
    reqClassDelete
} from "@/api/class"

import type {
    classInfoData,
    classListFormData,
    classResponseData,
    classListResponseData,
    classAllResponseData
} from "@/api/class/type"
import {ClassState} from "./types/type"
let useClassStore=defineStore("Class",{
    state:():ClassState=>{
        return{
            classes:[]
        }
    },
    actions:{
        async getClassAll(){
            let result:classAllResponseData=await reqClassAll();
            if(result.status==0){
                this.classes=(result.data as classInfoData[])
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        async getClassList(data:classListFormData){
            let result:classListResponseData=await reqClassList(data);
            if(result.status===0){
                this.classes=(result.data?.data as classInfoData[])
                return result.data
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        async addClass(data:classInfoData){
            let result:classResponseData=await reqClassAdd(data)
            if(result.status===0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //
        async getClassById(_id:string){
            let result:classResponseData=await reqClassById(_id)
            if(result.status===0){
                return result.data
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //更新
        async updateClass(data:classInfoData){
            let result:classResponseData=await reqClassUpdate(data);
            if(result.status===0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //删除
        async deleteClass(classId:string){
            let result:classResponseData=await reqClassDelete(classId)
            if(result.status===0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        }
    }
})
export default useClassStore