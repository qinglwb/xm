<template>
  <div>
    <div style="margin: 20px 0" class="btn_box">
      <el-button type="primary" @click="handlerAdd">新增专业</el-button>
    </div>
    <!-- data修改了 -->
    <el-table :data="majors" style="width: 100%; height: 380px" border>
      <!--type="index" 获取索引值，从1开始； label 显示的标题; prop 数据字段名； width 列的宽度 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <!-- 这修改了 
      majorname
      -->
      <el-table-column prop="majorname" label="专业名称"></el-table-column>

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
   <el-dialog v-model="schoolFormVisible" title="添加专业" width="500px">
     <el-form
       :model="major"
       ref="majorFormRef"
       label-width="100px"
       label-position="right"
       style="width: 400px"
       :rules="rules"
     >
       <el-form-item label="专业" prop="majorname">
         <el-input v-model="major.majorname"></el-input>
       </el-form-item>       
     </el-form>
     <template #footer>
       <span class="dialog-footer">
         <el-button type="primary" @click="major._id == null ? addData(majorFormRef) : updateData(majorFormRef)">
           确定
         </el-button>
         <el-button @click="schoolFormVisible = false">取消</el-button>
       </span>
     </template>
   </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted,ref,reactive, nextTick} from "vue"
import {FormInstance,FormRules} from "element-plus"
import type {majorData,majorSchoolname} from "@/api/major/type"
//
const majors=ref<majorData[]|undefined>([])
import majorUserStore from "@/store/modules/major"
const majorStore=majorUserStore()
//删除时调用的提示
import {ElMessageBox,ElMessage} from "element-plus"

//表单
const majorFormRef=ref<FormInstance>()
//表单的校验
const rules=reactive<FormRules>({
  majorname:[{
    required:true,message:"请输入专业",trigger:"blur"
  }]
})
const major=ref<majorData|undefined>({
    _id:null,
    majorname:"",
})

const schoolFormVisible=ref(false)
//点击新增按钮按钮
const handlerAdd=()=>{
  schoolFormVisible.value=true
  nextTick(()=>{
    majorFormRef.value.resetFields()
  })
  major.value={
    _id:null,
    majorname:""
  }

}
const addData=(formEl:FormInstance|undefined)=>{
  if(!formEl) return
  formEl.validate(async (valid)=>{
    if(valid){
      majorStore.getMajorAdd(major.value as majorData).then(
        reponse=>{
          schoolFormVisible.value=false
          getMajorList()
      })
    }
  })
}

const handleEdit=(_id:string)=>{
  handlerAdd()
  console.log(_id);
  //更新  点击编辑时，专业显示的数据和我们的数据一致
  majorStore.getMajorQuery(_id).then(response=>{
    major.value=response
  })
}
//更新
const updateData=(formEl:FormInstance|undefined)=>{
  if(!formEl)return
  formEl.validate(async (valid)=>{
    //更新时，把值传递给后台去更新
    majorStore.getMajorUpdate(major.value as majorData).then(response=>{
      schoolFormVisible.value=false
      getMajorList()
    })
  })
}
//删除
const handleDelete=(_id:string)=>{
  // majorStore.DeleteMajor(_id)
  // getMajorList()
  ElMessageBox.confirm(
    "确定要删除此条数据吗？",
    "Warning",
    {
      confirmButtonText:"ok",
      cancelButtonText:"Cencel",
      type:"warning"
    }
  ).then(()=>{
    majorStore.DeleteMajor(_id).then(reponse=>{
      getMajorList()
      ElMessage({
        type:"success",
        message:"删除成功"
      })
    })
  }).catch(()=>{})

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
  getMajorList()
}
const handleCurrentChange=(val:number)=>{
  currentPage.value=val
  getMajorList()
}
const getMajorList=()=>{
  majorStore.getMajorList({page: currentPage.value,size:pageSize.value}).then(
    (response=>{
      majors.value=majorStore.maj
      //总条数获取来自后台数据的总条数
      total.value=response?.total as number
      //总条数除以当前显示条数  获取到应显示第几页
      totalPage.value=total.value/pageSize.value
  })
)
}
onMounted(()=>{
  getMajorList()
})
</script>

<style>

</style>