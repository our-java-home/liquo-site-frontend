<!-- 
 * @Author: kongjingchao
 * @Date: 2023-05-23 17:24:06
 * @Last Modified by: kongjingchao
 * @Last Modified time: 2023-05-23 17:24:06
 * @Description: 导航菜单递归组件
-->
<template>
  <div class="menu-container">
    <template v-for="item in menuList">
      <el-submenu v-if="item.children" :index="item.id" :key="item.id">
        <template v-slot:title>
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.name }}</span>
        </template>
        <MenuList :menuList="item.children" />
      </el-submenu>
      <el-menu-item v-else :key="item.id" :index="item.route" :route="item.route">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: 'MenuList',
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>
.el-menu--collapse li>.el-submenu__title>span {
  display: none;
}
</style>