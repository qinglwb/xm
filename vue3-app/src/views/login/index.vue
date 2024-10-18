<template>
 <div class="login-container">
    <!-- ref 相当于 id，:model 表单数据对象, label-width 表单域标签的的宽度 -->
    <!-- :rules="rules" 将表单验证绑定在了这个变量上 -->
    <el-form 
    ref="ruleFormRef" 
    :model="form" 
    label-width="80px"
     class="login-form"
     :rules="rules"
     >
      <h2 class="login-title">登录</h2>
      <el-form-item label="帐号" prop="username">
        <el-input v-model="form.username" placeholder="请输入帐号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
//setup使用setup导出就不能有export
import {reactive, ref} from "vue"
//FormInstance通过这个类型可以获取和操作表单的各种属性和方法，比如提交表单、重置表单等操作。
//FormRules 类型通常用于定义表单字段的验证规则
import {FormInstance,FormRules} from "element-plus"

//允许你在 Vue 组件中访问当前的路由信息。
import {useRouter} from "vue-router"
//接收当前路由的信息
let $router=useRouter();
//接收的数据仓库
import useUserStore from "@/store/modules/user";
let useStore=useUserStore();
// “ElMessage” 通常用于在页面中显示消息提示
import { ElMessage } from "element-plus";



const form=reactive({
  username:"",
  password:"",
})
//规则  FormInstance
//响应式的规则
//定义的响应式
const ruleFormRef=ref<FormInstance>()

//定义了一个输入规则
const vaildateUserName=(rule:any,value:any,callback:any)=>{
  value=value.trim()
  const length =value&&value.length
  const pwdReg=/^[a-zA-Z0-9_]+$/
  if(value===''){
    callback(new  Error("请输入账号"))
  }else if(length<4||length>12){
    callback(new  Error("长度小于4大于12"))
  }else if(!pwdReg.test(value)){
    callback(new  Error("账号必须是英文、数字下划线"))
  }else{
    callback()
  }
}

const rules=reactive<FormRules>({
  username:[
    {
      required:true,
      //指定了一个用于验证用户名的函数。
      validator:vaildateUserName,
      //：指定了触发验证的事件。当输入框失去焦点（blur）或者内容发生改变（change）时，都会触发对这个输入框的验证。
      trigger:["blur","change"]
    }
  ],
  password:[
    {
      required:true,
      message:"请输入密码",
      trigger:["blur","change"]
    }
  ]
})
//进行验证
const onSubmit=(formEl:FormInstance|undefined)=>{
  if(!formEl) return
  // 表单实例的 validate 方法进行表单验证。
  //这个方法接收一个回调函数，回调函数的参数 valid 是一个布尔值，表示表单验证是否通过。
  formEl.validate(async (valid)=>{
    if(valid){
      try{
        await useStore.userLogin(form)
        $router.push("/")
        ElMessage({
          type:"success",
          message:"登录成功"
        })
      }catch(error){
        ElMessage({
          type:"error",
          message:(error as Error).message
        })
      }
    }else{
      console.log("error");
      return false
    }
  })

}

</script>

<style scoped>
.login-form{
  width: 350px;
  margin: 160px auto;
  background: rgb(255, 255, 255,0.8);
  padding: 30px;
  border-radius: 20px;
  
}
.login-container{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/bg.jpg");
  overflow: hidden;
}
.login-title{
  text-align: center;
  color: #333;
}
</style>