<template>
  <div class="navbar">
        <!-- 菜单 -->
        <el-menu 
        background-color="#545c64" 
        text-color="#fff" 
        :default-openeds="['/students']" 
        default-active="$route.path"
        active-text-color="#ffd04b"
        :router="true"
        >

        <Menu :menuList="menuNodes"></Menu>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import Menu from "./menu/index.vue"
import menuList from '@/config/menuConfig';
import type {MenuData,MenuChildrenData} from "./types/type"
import useUserStore from '@/store/modules/user';
let useStore=useUserStore();
import {useRoute} from "vue-router"
const $route=useRoute();

//做权限
const hashAuth=(item:MenuData)=>{
    const {index,isPublic} =item
    const menus=useStore.user?.role.menus
    const username=useStore.user?.username
    if(username==="admin"||isPublic||menus?.indexOf(index)!=-1){
        return true
    }else if(item.children){
        //第一次取反!item.children
        //第二次是取反整个返回值
        return !!item.children.find(
            (child:MenuChildrenData)=>menus.indexOf(child.index)!=-1
        )
    }else{
        return false
    }
}
let menuNodes:any[]=[]
const getMenuNodes=()=>{
    menuList.forEach((item)=>{
        if(!item.children){
            if(hashAuth(item)){
                menuNodes.push(item)
            }
        }else{
            //二级菜单
            let tempArr=[];
            item.children.forEach(i=>{
                if(hashAuth(i)){
                    tempArr.push(i)
                }
            })
            let obj={...item,children:tempArr}
            menuNodes.push(obj)
        }
    })
}
getMenuNodes();

</script>

<style scoped>
.el-menu{
  border: 0;
  height: 100%;
}
</style>