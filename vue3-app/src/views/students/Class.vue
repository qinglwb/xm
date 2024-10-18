<template>
  <div>
    <!-- 条件查询 -->
    <el-form
      :inline="true"
      :model="searchMap"
      style="margin: 20px"
      ref="searchFormRef"
    >
      <el-form-item prop="teacher_id" style="width: 200px;">
        <el-select v-model="searchMap.teacher_id" placeholder="根据教师查询">
          <el-option
            v-for="option in teacherOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="manager_id" style="width: 200px;">
        <el-select v-model="searchMap.manager_id" placeholder="根据学管查询">
          <el-option
            v-for="option in managerOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchData">查询</el-button>
        <el-button @click="resetForm(searchFormRef)">重置</el-button>
        <el-button type="primary" @click="handlerAdd">添加班级</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="classes" style="width: 100%; height: 380px" border>
      <!--type="index" 获取索引值，从1开始； label 显示的标题; prop 数据字段名； width 列的宽度 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="classname" label="班级名称"></el-table-column>
      <el-table-column label="授课教师" prop="teacher_id" :formatter="formatTeacher"></el-table-column>
      <el-table-column label="学管" prop="manager_id" :formatter="formatManager"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row._id)"> 编辑 </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row._id)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页控件 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 添加班级对话框 -->
    <el-dialog v-model="classFormVisible" title="添加班级" width="500px">
      <el-form
        :model="updateClass"
        ref="classFormRef"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="班级名称" prop="classname">
          <el-input v-model="updateClass.classname"></el-input>
        </el-form-item>
        <el-form-item label="授课教师" prop="teacher_id">
          <el-select
            v-model="updateClass.teacher_id"
            placeholder="请选择授课教师"
          >
            <el-option
              v-for="option in teacherOptions"
              :label="option.name"
              :value="option._id"
              :key="option._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学管" prop="manager_id">
          <el-select v-model="updateClass.manager_id" placeholder="请选择学管">
            <el-option
              v-for="option in managerOptions"
              :label="option.name"
              :value="option._id"
              :key="option._id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="updateClass._id == null ? addData(classFormRef) : updateData(classFormRef)">
            确定
          </el-button>
          <el-button @click="classFormVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref,onMounted,reactive,nextTick} from "vue"
import {FormInstance,FormRules} from "element-plus"
import {ElMessage,ElMessageBox} from "element-plus"
//班级里需要用到用户的 角色的
import type {userInfoData} from "@/api/user/type"
import type {roleInfoData} from "@/api/role/type"
import useRoleStore from "@/store/modules/role"
let roleStore=useRoleStore()
import useUserStore from "@/store/modules/user"
let userStore=useUserStore()
//班级
import  type {classInfoData} from "@/api/class/type"
import useClassStore from "@/store/modules/class"
let classStore=useClassStore()
const classes=ref<classInfoData[]|undefined>([])

//获取的角色和用户的数据
let roleOptions=ref<roleInfoData[]|undefined>([])
let userOptions=ref<userInfoData[]|undefined>([])
//需要拿到为老师的id和学管的id
const teacher_role_id=ref<string|undefined>("")
const manager_role_id=ref<string|undefined>("")
//筛选时需要用到的数据
//获取到教师和学管的列表、筛选时，得确定是哪个老师的班级
let teacherOptions=ref<userInfoData[]>([])
let managerOptions=ref<userInfoData[]>([])
//获取角色列表
const getRoleList=()=>{
  if(roleStore.roles?.length){
    roleOptions.value=roleStore.roles
    roleOptions.value?.forEach(item=>{
      if(item.name==="教师"){
        //循环遍历 把教师的id给到定义的变量
        teacher_role_id.value=item._id
      }else if(item.name==="学管"){
        manager_role_id.value=item._id
      }
    })
  }else{
    //没有数据的话，执行一次获取角色列表，然后判断
    roleStore.roleList().then(()=>{
      roleOptions.value=roleStore.roles
      roleOptions.value?.forEach(item=>{
      if(item.name==="教师"){
        teacher_role_id.value=item._id
      }else if(item.name==="学管"){
        manager_role_id.value=item._id
      }
    })
    })
  }
}
const getUserList=()=>{
  if(userStore.users?.length){
    userOptions.value=userStore.users
    userOptions.value?.forEach(item=>{
      //判断用户的id和教师的id相同
      if(item.role_id===teacher_role_id.value){
        teacherOptions.value.push(item)
      }else if(item.role_id===manager_role_id.value){
        managerOptions.value.push(item)
      }
      
    })
  }else{
    //
    userStore.getUserAll().then(()=>{
      userOptions.value=userStore.users
      userOptions.value?.forEach(item=>{
        if(item.role_id===teacher_role_id.value){
        teacherOptions.value.push(item)
      }else if(item.role_id===manager_role_id.value){
        managerOptions.value.push(item)
      }
    })
    })
  }
}
//获取授课教师
const formatTeacher=(row:any,cloum:any,cellValue:string,index:number)=>{
 let teacher=teacherOptions?.value?.find(item=>item._id===cellValue)||[]
 return teacher.name
}
const formatManager=(row:any,cloum:any,cellValue:string,index:number)=>{
  let manager=managerOptions?.value?.find(item=>item._id===cellValue)||[]
  return manager.name
}
//搜索
const searchFormRef=ref<FormInstance>()
//重置
const resetForm=(formEl:FormInstance|undefined)=>{
  if(!formEl)return
  formEl.resetFields()
  getClassList()
}
const searchData=()=>{
  currentPage.value=1
  getClassList()
}

let updateClass=ref<classInfoData|undefined>({
  _id:null,
  classname:"",
  teacher_id:"",
  manager_id:""
})
let searchMap=reactive({
  teacher_id:"",
  manager_id:""
})

const classFormVisible=ref(false)
const classFormRef=ref<FormInstance>()
const rules=reactive<FormRules>({
  classname:[{required:true,message:"请输入班级名称",trigger:"blur"}],
  teacher_id:[{required:true,message:"请输入班级名称",trigger:"blur"}],
  manager_id:[{required:true,message:"请输入班级名称",trigger:"blur"}]
})
const handlerAdd=()=>{
  classFormVisible.value=true
  nextTick(()=>{
    classFormRef.value.resetFields()

  })
  updateClass.value={
    _id:null,
  classname:"",
  teacher_id:"",
  manager_id:""
  }
}

const addData=(formEl:FormInstance|undefined)=>{
  if(!formEl) return
  formEl.validate(async (valid)=>{
    if(valid){
      classStore.addClass(updateClass.value as classInfoData).then(response=>{
        classFormVisible.value=false
        getClassList()
      })
    }else{

    }
  })
}
//分页
const currentPage=ref(1)
//当前显示条数
const pageSize=ref(5)
//总条数
const total=ref(0)
const totalPage=ref(1)
const handleSizeChange=(val:number)=>{
  pageSize.value=val
  getClassList()
}
const handleCurrentChange=(val:number)=>{
  currentPage.value=val
  getClassList()
}
const getClassList=()=>{
  classStore.getClassList({page:currentPage.value,size:pageSize.value,searchMap}).then(response=>{
    classes.value=classStore.classes
    total.value=response?.total as number
    totalPage.value=total.value/pageSize.value
  })
}
const handleEdit=(_id:string)=>{
  handlerAdd()
  classStore.getClassById(_id)
  classStore.getClassById(_id).then(response=>{
    updateClass.value=response
  })
}
const updateData=(formEl:FormInstance|undefined)=>{
  if(!formEl) return
  formEl.validate(async (valid)=>{
    if(valid){
      classStore.updateClass(updateClass.value as classInfoData).then(response=>{
        classFormVisible.value=false
        getClassList()
      })
    }else{}
  })
}

const handleDelete=(_id:string)=>{
  ElMessageBox.confirm(
    "确定删除吗",
    "Warning",
    {
      confirmButtonText:"ok",
      cancelButtonText:"Cancel",
      type:"warning"
    }
  ).then(()=>{
      classStore.deleteClass(_id).then(response=>{
        getClassList();
        ElMessage({
          type:"success",
          message:"删除成功"
        })
      })
    })
}
onMounted(()=>{
  getRoleList()
  getUserList()
  getClassList()
})
</script>

<style>

</style>