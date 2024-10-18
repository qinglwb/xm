//角色相关的小仓库
import {defineStore} from "pinia"
import {getRoleList,addRole, updateRole} from "@/api/role"
import {RoleState} from "./types/roleType"
import type {roleInfoData,getRoleListResponseData, addRoleResponseData} from 
"@/api/role/type"
//创建仓库
let useRoleStore=defineStore("Role",{
    state:():RoleState=>{
        return{
            roles:[]
        }
    },
    actions:{
        async roleList(){
            //获取后台的角色列表
            let result:getRoleListResponseData=await
            getRoleList();
            if(result.status===0){
                this.roles=result.data
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //获取添加角色列表
        async useAddRole(data:roleInfoData){
            let result:addRoleResponseData=await addRole(data);
            if(result.status===0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //更新的时候
        async useUpdateRole(data:roleInfoData){
            let result:addRoleResponseData=await updateRole(data)
            if(result.status===0){
                return "OK"
            }else{
                return Promise.reject(new Error(result.msg))
            }
        }
    },
    getters:{}
})
export default useRoleStore;