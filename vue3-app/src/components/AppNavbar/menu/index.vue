<template>
<div>
    <template v-for="(item, index) in menuList" >
      <!-- 如果当前菜单项没有children属性，证明是一级菜单项 -->
      <el-menu-item v-if="!item.children" :index="item.index" :key="item.index">
        <!-- 显示菜单文字 -->
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
      <!-- 包含子菜单项 -->
      <el-sub-menu v-if="item.children" :index="item.index" :key="item.index">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
        <!-- 使用递归组件，生成2级菜单项 -->
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </div>
</template>

<script lang="ts">
export default{
    name:"Menu",
    props:["menuList"]
};

</script>

<style>

</style>