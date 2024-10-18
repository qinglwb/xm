<template>
    <div>
      <el-form
        :model="updateRole"
        ref="roleForm"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="updateRole.name"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 树形控件 -->
      <el-tree
        :data="authList"
        show-checkbox
        node-key="index"
        :default-expand-all="true"
        :default-checked-keys="checkedKeys"
        @check-change="handleCheckChange"
      ></el-tree>
    </div>
</template>
  
<script setup lang="ts">
import type {FormInstance,FormRules} from "element-plus"
import type Node from "element-plus/es/components/tree/src/model/node"
import menuList from "@/config/menuConfig"

import type {roleInfoData} from "@/api/role/type"
import {reactive,ref,onMounted} from "vue"
interface Tree{
  index:string
}
//接受父类型的角色树
const props = defineProps(["role"])
let updateRole:roleInfoData = reactive({
  name:""
})

//
const authList = ref([])
//选中项
//获取到所有的选中项
let checkedKeys = reactive<any>([])
const roleForm = ref<FormInstance>()
const rules = reactive<FormRules>({
  name:[{required:true,message:"请输入角色名称",trigger:"blur"}]
})


//给父组件传递的数据  树形列表
const getMenus = ()=>{
  //把我们选中的索引 传到updateRole（也就是上面绑定的数据）
  updateRole.menus = checkedKeys
  return updateRole
}
//组件内部的数据外部用不了
//想让外部使用得暴露出去
//组件内部的数据，要想给他压入到父组件中，
// defineExpose进行暴露
defineExpose({
  getMenus
})

//创建权限
//
//通过管理员
//设置权限的时候对所有用户进行获取
//获取所有权限
//判断用户是否为管理员
//确定提交时，会把数据提交到仓库中


//单独设置权限的文字
//导入所有用户和角色
//
//
//如果

//


//树形函数里面需要有一些操作
//通过它来获取
const handleCheckChange = (
  //data获取到的是个树形结构，，也就是索引
    data:Tree,
    checked:boolean,
    indeterminate:boolean,
  )=>{
    if(checked){
      //选中的索引data.index不为学员 并且可以找到点击的方框（索引）
      if(data.index != "/students" && checkedKeys.indexOf(data.index) === -1){
        //在checkedKeys压入我们选中的索引
        checkedKeys.push(data.index)
      }
    }else{
      //选中的索引为学员或它的子列表，我们判断
      if(checkedKeys.indexOf(data.index)!=-1){
        checkedKeys.splice(checkedKeys.indexOf(data.index),1)
      }
  }
}
const getAuthNodes = (menuList:any)=>{
  return menuList.map((item:any)=>{
    if(!item.children){
      return {
        index:item.index,
        label:item.title
      }
    }else{
      return {
        index:item.index,
        label:item.title,
        children:getAuthNodes(item.children)
      }
    }
  })
}
onMounted(()=>{
  authList.value = getAuthNodes(menuList)

  //从父组件传递的角色对象，更新
  updateRole = reactive({...props.role})


  checkedKeys = [...props.role.menus]
})
</script>

<style>
</style>