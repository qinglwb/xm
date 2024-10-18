import {defineStore} from "pinia"
import {reqLogin,reqUserList,reqUserAll, reqUserAdd,
    reqUserById,reqUserUpdate,
    reqUserDelete
} from "@/api/user"
//导入两个自定义的类型
import type {
    loginFormData,
    loginResponseData,
    userInfoData,
    //用户
   userListResponseData,
   userListFormData,
   userAllResponseData,
} from "@/api/user/type"

import {UserState} from "./types/type"

// defineStore 函数用于创建一个 Vuex store 对象
let useUserStore=defineStore("User",{
    state:():UserState=>{
        return {
            // tOKen:localStorage.getItem("VUE3-TOKEN")
            user:JSON.parse((localStorage.getItem("VUE3-USER") as string)),

            users:[]
        }
    },
    actions:{
        //登录相关
        async userLogin(data:loginFormData){
            let result:loginResponseData=await reqLogin(data);
            //status为0 有用户 
            if(result.status===0){
                // this.tOKen=(result.data.tOKen as string)
                this.user=(result.data as userInfoData)
                // console.log(this.user);
                //把用户存到本地
                localStorage.setItem("VUE3-USER",(JSON.stringify(result.data) as string))
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        removeUser(){
            this.user = null;
            localStorage.removeItem("VUE3-USER")
        },




        //获取用户
        async getUserAll(){
            let result:userAllResponseData=await reqUserAll();
            if(result.status==0){
                this.users=(result.data as userInfoData[])
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        async getUserList(data:userListFormData){
            let result:userListResponseData=await reqUserList(data);
            if(result.status===0){
                this.users=(result.data?.data as userInfoData[])
                return result.data
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        async addUser(data:userInfoData){
            let result:loginResponseData=await reqUserAdd(data)
            if(result.status===0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //
        async getUserById(_id:string){
            let result:loginResponseData=await reqUserById(_id)
            if(result.status===0){
                return result.data
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //更新
        async updateUser(data:userInfoData){
            let result:loginResponseData=await reqUserUpdate(data);
            if(result.status===0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //删除
        async deleteUser(userId:string){
            let result:loginResponseData=await reqUserDelete(userId)
            if(result.status===0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        }
    },
   
    getters:{

    }
})
export default useUserStore