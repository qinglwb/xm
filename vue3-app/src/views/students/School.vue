<template>
  <div>
    <div style="margin: 20px 0" class="btn_box">
      <el-button type="primary" @click="handlerAdd">新增学校</el-button>
    </div>
    <el-table :data="schools" style="width: 100%; height: 380px" border>
      <!--type="index" 获取索引值，从1开始； label 显示的标题; prop 数据字段名； width 列的宽度 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="schoolname" label="学校名称"></el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row._id)">
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row._id)"
          >
            删除
          </el-button>
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
         <!-- 添加学校对话框 -->
   <el-dialog v-model="schoolFormVisible" title="添加学校" width="500px">
     <el-form
       :model="school"
       ref="schoolFormRef"
       label-width="100px"
       label-position="right"
       style="width: 400px"
       :rules="rules"
     >
       <el-form-item label="用户名" prop="schoolname">
         <el-input v-model="school.schoolname"></el-input>
       </el-form-item>       
     </el-form>
     <template #footer>
       <span class="dialog-footer">
        <!-- 点击确定时 没有id则调用添加  有则调用更新 -->
         <el-button type="primary" @click="school._id == null ? addData(schoolFormRef) : updateData(schoolFormRef)">
           确定
         </el-button>
         <el-button @click="schoolFormVisible = false">取消</el-button>
       </span>
     </template>
   </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type {FormInstance,FormRules} from "element-plus"
import {ElMessage,ElMessageBox} from  "element-plus"
import {onMounted,reactive,ref,nextTick} from "vue"
import type { schoolInfoData } from "@/api/school/type";
import useSchoolStore from "@/store/modules/school"
let schoolStore=useSchoolStore()
const schools=ref<schoolInfoData[]|undefined>([])
let school=ref<schoolInfoData|undefined>({
  _id:null,
  schoolname:""
})
//显示框，取消也调用这个
const schoolFormVisible=ref(false)
const schoolFormRef=ref<FormInstance>()
const rules=reactive<FormRules>({
  schoolname:[{
    required:true,message:"请输入学校名称",trigger:"blur"
  }]
})
const handlerAdd=()=>{
  schoolFormVisible.value=true
  //它接受一个回调函数作为参数。这个回调函数会在 DOM 更新完成后被调用。
// 在你提供的代码中，当 DOM 更新完成后，会执行回调函数中的代码，即调用
  nextTick(()=>{
    //resetFields ()” 方法被调用时，它会将表单中的各个输入字段的值恢复到初始状态
    schoolFormRef.value.resetFields()
  })
  school.value={
    _id:null,
    schoolname:""
  }
}
const addData=(formEl:FormInstance|undefined)=>{
  if(!formEl)return
  formEl.validate(async (valid)=>{
    if(valid){
      schoolStore.addSchool((school.value as schoolInfoData)).then(
        response=>{
          schoolFormVisible.value=false
          getSchoolList()
        })
    }else{

    }
  })
}

//编辑
const handleEdit=(_id:string)=>{
  handlerAdd()
  schoolStore.getSchoolById(_id).then(response=>{
    school.value=response
  })
}
//更新
const updateData=(formEl:FormInstance|undefined)=>{
  if(!formEl)return
  formEl.validate(async (valid)=>{
    schoolStore.updateSchool((school.value as schoolInfoData)).then(response=>{
      schoolFormVisible.value=false
      getSchoolList()
    })
  })
}
//上面传递了一个id
const handleDelete=(_id:string)=>{
  // 这是一个弹出确认框的方法。它显示了一条消息 “确定要删除此条数据吗？”，标题为 “Warning”，
  // 并提供了 “ok” 和 “Cencel” 两个按钮选项，同时将确认框的类型设置为 “warning”。
  ElMessageBox.confirm(
    "确定要删除此条数据吗？",
    "Warning",
    {
      confirmButtonText:"ok",
      cancelButtonText:"Cencel",
      type:"warning",
    }
    //成功后会执行
  ).then(()=>{
    schoolStore.deleteSchool(_id).then(response=>{
      getSchoolList()
      ElMessage({
        type:"success",
        message:"删除成功"
      })
    })
    //取消的执行过程 是个错误处理
  }).catch(()=>{})
}


//分页
const currentPage=ref(1)
const pageSize=ref(5)
const total=ref(0)
const totalPage=ref(1)
//数据改变触发
const handleSizeChange=(val:number)=>{
  pageSize.value=val;
  getSchoolList()
}
//当前页码改变触发
const handleCurrentChange=(val:number)=>{
  currentPage.value=val
  getSchoolList()
}
//分页
const getSchoolList=()=>{
  schoolStore.getSchoolList({page:currentPage.value,size:pageSize.value}).then(
    response=>{
      //显示学校列表
      schools.value=schoolStore.schools
      total.value=response?.total as number
      totalPage.value=total.value/pageSize.value

    }
  )
}
onMounted(()=>{
  getSchoolList()
})
</script>

<style>

</style>