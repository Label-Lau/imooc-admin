<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :collapse="!store.getters.sidebarOpened"
    :default-active="activeMenu"
    :background-color="store.getters.cssVar.menuBg"
    :text-color="store.getters.cssVar.menuText"
    :active-text-color="store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    router
  >
    <sidebar-item v-for="item in routes" :key="item.path" :route="item">
    </sidebar-item>
  </el-menu>
</template>

<script setup>
import SidebarItem from './SidebarItem'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { filterRouters, generateMenus } from '@/utils/route'
const store = useStore()
// 动态获取路由表
const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

// 计算高亮 menu 的方法
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>
