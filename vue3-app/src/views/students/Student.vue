<template>
  <div>
    <el-table :data="students" border style="width: 100%;height: 380px;">
         <!-- type="expand"表示可拖动 -->
        <el-table-column type="expand">
          <!-- 传入了一个props 用来去控制数据 
          对应的所有数据都在props里
          -->
            <template #default="props">
                <div style="padding: 20px;">
                    <p>学生姓名: {{ props.row.name }}</p>
                    <p>性别: {{ dataFilter(props.row.gender,genderOptions) }}</p>
                    <p>所在学校: {{ props.row.school }}</p>
                    <p>专业: {{ props.row.major }}</p>
                    <p>年级: {{ dataFilter(props.row.grade,gradeOptions) }}</p>
                    <p>学历: {{ dataFilter(props.row.education,educationOptions) }}</p>
                    <p>学习方向: {{ dataFilter(props.row.direction,directionOptions) }}</p>
                    <p>身份证号码: {{ props.row.id_number }}</p>
                    <p>电话号码: {{ props.row.phone }}</p>
                    <p>家长姓名: {{ props.row.parent }}</p>
                    <p>家长联系电话: {{ props.row.parent_phone }}</p>
                    <p>家庭住址: {{ props.row.address }}</p>
                    <p>QQ号码: {{ props.row.qq }}</p>
                    <p>所在班级: {{ classFilter(props.row.class,classOptions) }}</p>
                    <p>入学时间: {{ props.row.admission_date }}</p>
                    <p>授课教师: {{ dataFilter(props.row.teacher_id,teacherOptions) }}</p>
                    <p>学管: {{ dataFilter(props.row.manager_id,managerOptions) }}</p>
                    <p>照片:
                        <el-image v-for="(item,index) in  props.row.pictures" 
                         :key="index" 
                         style="width: 200px; height: 200px" 
                         :src="baseApi +'/upload/' + item"  
                         :max-scale="7"
                         :min-scale="0.2" 
                         :preview-src-list="getSrcList(props.row.pictures)" 
                         :initial-index="0" 
                         fit="cover" />
                         </p>
                      <p>备注信息: <span v-html="props.row.note"></span></p>
                    <p>备注信息: {{ props.row.note }}</p>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="序号" type="index" width="80px" />
        <el-table-column label="学生姓名" prop="name" width="100px"/>
        <el-table-column label="性别" prop="gender" width="100px">
            <template #default="scope">
                {{ dataFilter(scope.row.gender,genderOptions) }}
            </template>
        </el-table-column>
        <el-table-column label="学习方向" prop="direction" >
            <template #default="scope">
                {{ dataFilter(scope.row.direction,directionOptions) }}
            </template>
        </el-table-column>
        <el-table-column label="电话号码" prop="phone" />
        <el-table-column label="所在班级" prop="class" >
            <template #default="scope">
                {{ classFilter(scope.row.class,classOptions) }}
            </template>
        </el-table-column>
        <el-table-column label="授课教师" prop="teacher_id" >
            <template #default="scope">
                {{ dataFilter(scope.row.teacher_id,teacherOptions) }}
            </template>
        </el-table-column>
        <el-table-column label="学管" prop="manager_id" >
            <template #default="scope">
                {{ dataFilter(scope.row.manager_id,managerOptions) }}
            </template>
        </el-table-column>
        <el-table-column label="入学时间" prop="admission_date" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row._id)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
        <!-- 条件查询 -->
    <el-form
      :inline="true"
      :model="searchMap"
      style="margin: 20px"
      ref="searchFormRef"
    >
      <el-form-item prop="name">
        <el-input
          v-model="searchMap.name"
          placeholder="根据姓名查询"
        ></el-input>
      </el-form-item>
      <el-form-item prop="direction">
        <el-select v-model="searchMap.direction" placeholder="根据学习方向查询">
          <el-option
            v-for="option in directionOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="class">
        <el-select v-model="searchMap.class" placeholder="根据所在班级查询">
          <el-option
            v-for="option in classOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="teacher_id">
        <el-select
          v-model="searchMap.teacher_id"
          placeholder="根据授课教师查询"
        >
          <el-option
            v-for="option in teacherOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="manager_id">
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
        <el-button type="primary" @click="handleAdd">添加</el-button>
        <el-button @click="resetForm(searchFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive,onMounted} from "vue"
import {FormInstance,FormRules} from "element-plus"
import {ElMessageBox,ElMessage} from "element-plus"

import {studentInfoData} from "@/api/student/type"
import useStudentStore from "@/store/modules/student"
// 班级仓库
import useClassStore from "@/store/modules/class"
const classStore=useClassStore()
//角色仓库
import useRoleStore from "@/store/modules/role"
const roleStore=useRoleStore()
//引入用户仓库
import useUserStore from "@/store/modules/user"
//引入相应的类型
import { roleInfoData } from "@/api/role/type"
import { userInfoData } from "@/api/user/type"
import { classInfoData } from "@/api/class/type"
const userStore=useUserStore()
// 1.
//定义列表为了接受仓库获取到的数据  方便我们进行使用
//角色列表
let roleOptions=ref<roleInfoData[]|undefined>([])
//用户列表
let userOptions=ref<userInfoData[]|undefined>([])
//班级列表
let classOptions=ref<classInfoData[]|undefined>([])

// 角色为教师的id
let teacher_role_id=ref<string|undefined>('')
// 为学管的id
let manager_role_id=ref<string|undefined>('')
// 教师列表
let teacherOptions=ref<userInfoData[]>([])
//学管列表
let managerOptions=ref<userInfoData[]>([])
// 2...
//查询时的数据 通常就定义两种类型
interface FilterData{
  _id:string,
  name:string
}
// 性别数据列表
let genderOptions = ref<FilterData[]>([
    { _id: '0', name: '男' },
    { _id: '1', name: '女' },
])
// 年级数据列表
let gradeOptions = ref<FilterData[]>([
    { _id: '1', name: '大一' },
    { _id: '2', name: '大二' },
    { _id: '3', name: '大三' },
    { _id: '4', name: '大四' },
    { _id: '5', name: '在读研究生' },
])
// 学历数据列表
let educationOptions = ref<FilterData[]>([
    { _id: '1', name: '专科' },
    { _id: '2', name: '本科' },
    { _id: '3', name: '硕士' },
    { _id: '4', name: '社会' },
])
// 学习方向数据列表
let directionOptions = ref<FilterData[]>([
    { _id: '1', name: 'web前端' },
    { _id: '2', name: 'Java' },
    { _id: '3', name: 'C/C++' },
    { _id: '4', name: '少儿编程' },
    { _id: '5', name: '产品经理' },
])

// 3.执行过滤
//常规数据过滤
//options传入时获取的数据从是仓库里拿到判断完成后的
//
const dataFilter=(_id:string,options:any)=>{
  const obj=options?.find((item)=>item._id==_id)
 return obj?obj.name:""
}
//班级过滤
const classFilter=(_id:string,options:any)=>{
  const obj=options?.find((item)=>item._id==_id)
   return obj?obj.classname:""
}

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
//查询时的显示列表
//教师  学管
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
//获取的所在班级
//查询时，查询的是班级的id
const getClassList=()=>{
  if(classStore.classes?.length){
    classOptions.value=classStore.classes
  }else{
    classStore.getClassAll().then(()=>{
      classOptions.value=classStore.classes
    })
  }
}
//学生仓库
const studentStore=useStudentStore()
const students=ref<studentInfoData[]|undefined>([])
//定义初始数据为空
const searchMap=reactive({
  name:"",
  direction:"",
  teacher_id:"",
  manager_id:"",
  class:""
})



// 当前页
const currentPage=ref(1)
const pageSize=ref(5)
//总数据
const total=ref(0)
//当前页能显示几条数据
const totalPage=ref(1)

const handleSizeChange=(val:number)=>{
  pageSize.value=val;
  getStudentList()
}
const handleCurrentChange=(val:number)=>{
  currentPage.value=val
  getStudentList()
}
//编辑
const handleEdit=(_id:string)=>{
  $router.push(`/student/update/${_id}`)
}
//删除
const handleDelete=(_id:string)=>{
  ElMessageBox.confirm(
    "确定要删除此条数据吗？",
    "Warning",
    {
      confirmButtonText:"ok",
      cancelButtonText:"cancel",
      type:"warning"
    }
  ).then(()=>{
    studentStore.deleteStudent(_id).then(response=>{
      getStudentList()
      ElMessage({
        type:"success",
        message:"删除成功"
      })
    })
  }).catch(()=>{})
}

const getStudentList=()=>{
  studentStore.getStudentList({page:currentPage.value,size:pageSize.value,searchMap}).then(
    response=>{
    students.value = studentStore.students
    total.value = response.total
  })
}
//添加学生信息页面
import {useRouter} from "vue-router"
let $router=useRouter()
const handleAdd=()=>{
  $router.push(`/student/update/-1`)
}

//查询时绑定的表单
const searchFormRef=ref<FormInstance>()
//重置
const resetForm=(formEl:FormInstance|undefined)=>{
  if(!formEl) return
  formEl.resetFields()
  getStudentList()
}
//查询
const searchData=()=>{
  currentPage.value=1
  getStudentList()
}


const baseUrl=import.meta.env.VITE_APP_SERVICE_URL
const baseApi=import.meta.env.VITE_APP_BASE_API
const getSrcList=(imgList:string[])=>{
  return imgList.map(item=>baseApi+"/upload"+item)
}



onMounted(()=>{
  getRoleList()
  getUserList()
  getClassList()
  getStudentList()
})
</script>

<style>

</style>