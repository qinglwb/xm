import {defineStore} from "pinia"
import {
    reqMajorAdd,
    reqMajorQuery,
    reqMajorUpdate,
    reqMajorAll,
    reqMajorList,
    reqMajorDelete
} from "@/api/major/index"
import type {
    //大的 不是数组的
    majorAddData,
    //更新
    majorUpdateData,
    //data[]
    majorAllData,
    //大的 分页
    majorListReponseData,
    //分页 page size
    majorListFormData,
    //小的 
    majorData
} from "@/api/major/type"
import type {MajorState} from "./types/type"
const majorUserStore=defineStore("Major",{
    state:():MajorState=>{
        return{
            maj:[]
        }
    },
    actions:{
        //获取所有
        async getMajorAll(){
            let result:majorAllData=await reqMajorAll()
            if(result.status===0){
                this.maj=(result.data as majorData[])
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //分页
        async getMajorList(data:majorListFormData){
            let result:majorListReponseData=await reqMajorList(data)
            if(result.status===0){
                this.maj=(result.data?.data as majorData[])
                //返回data里所有的数据 来获取总数
                return result.data
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //添加
        async getMajorAdd(data:majorData){
            let result:majorAddData=await reqMajorAdd(data)
            console.log();
            if(result.status===0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //查询
        async getMajorQuery(_id:string){
            let result:majorAddData=await reqMajorQuery(_id)
            if(result.status===0){
                return result.data
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //更新
        async getMajorUpdate(data:majorData){
            let result:majorUpdateData=await reqMajorUpdate(data)
            if(result.status===0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        async DeleteMajor(majorId:string){
            let result:majorAddData=await reqMajorDelete(majorId)
            if(result.status===0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        }
    }
})
export default majorUserStore