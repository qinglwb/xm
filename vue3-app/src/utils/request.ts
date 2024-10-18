import axios from "axios"
//ElLoading加载效果
import {ElMessage,ElLoading} from "element-plus"
import useUserStore from "@/store/modules/user"

const loading={
    loadingInstance:null,
    open(){
        if(this.loadingInstance==null){
            this.loadingInstance=ElLoading.service({
                text:"拼命加载中。。。",
                background:"rgba(0,0,0,0.5)",
                target:".main"
            })
        }
    },
    close(){
        if(this.loadingInstance!=null){
            this.loadingInstance.close()
        }
        this.loadingInstance=null
    }
}

let request=axios.create({
    //请求后台地址
    //请求的域名，基本地址
    baseURL:import.meta.env.VITE_APP_BASE_API,
    //请求的超时时长
    timeout:5000
})

// const getMenus=()=>{
//     let userStore=useUserStore()
//     const roleId=userStore.user?.role_id
//     const userMenus=userStore.user?.role?.menus
//     if(userStore.user.username==="admin"){
//         return
//     }
//     request({
//         url:"/menus",
//         method:"post",
//         data:{
//             roleId
//         }
//     }).then(response=>{
//         const resp=response
//         if(resp.status===0){
//             const menus=resp.data.menus
//             if(userMenus?.length===menus.length){
//                 userMenus?.forEach(item=>{
//                     if(menus.indexOf(item)===-1){
//                         userStore.removeUser()
//                         ElMessage({
//                             message:"当前",
//                             type:"warning"
//                         })
//                         window.location.href="/login"
//                     }
//                 })
//             }else{
//                 userStore.removeUser()
//                 ElMessage({
//                         message:"当前",
//                         type:"warning"
//                     })
//                 window.location.href="/login"
//             }
//         }
//         return
//     })
// }
//请求拦截
request.interceptors.request.use(config=>{
    if(config.url!="menus"&&config.url!="/login"){
        loading.open()
        // getMenus()
    }
    return config
},(error)=>{
    loading.close()
    return Promise.reject(error)
})
//响应拦截
request.interceptors.response.use((response)=>{
    loading.close()
    //返回响应中的数据部分
    return response.data
},(error)=>{
    loading.close()
    let msg="";
    let status=error.response.status
    switch(status){
        case 401:
            msg="token过期";
            break;
        case 403:
            msg="无权限访问";
            break;
        case 404:
            msg="请求地址错误";
            break;
        case 500:
            msg="服务器出现问题";
            break;
        default:
            msg="无网路"
    }
    ElMessage({
        type:"error",
        message:msg
    })
    return Promise.reject(error)
})
export default request;