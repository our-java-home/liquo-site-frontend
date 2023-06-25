<!--
 * @Author: kongjingchao 
 * @Date: 2023-06-17 10:23:51 
 * @Last Modified by: kongjingchao
 * @Last Modified time: 2023-06-17 10:24:19
 * @Description: 主页
-->
<template>
  <el-container>
    <!-- 顶部操作栏 -->
    <el-header>
      <div class="header_left">
        <i class="item" :class="isCollapseMenu ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="isCollapseMenu = !isCollapseMenu"></i>
        <span>卖酒后台管理系统</span>
      </div>
      <div class="header_right">
        <!-- 搜索 -->
        <i class="el-icon-search item" @click="isSearch = !isSearch"></i>
        <transition name="el-zoom-in-center">
          <el-input v-show="isSearch" v-model="searchInfo" placeholder="search" clearable class="search" size="small" />
        </transition>
        <!-- 全屏 -->
        <i class="el-icon-full-screen item" @click="toggleFullScreen"></i>
        <i class="el-icon-s-tools item"></i>
        <!-- 用户信息 -->
        <el-dropdown trigger="click" @command="setLogin">
          <span class="el-dropdown-link login_info">
            <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            &ensp;
            <span class="user_name">{{ user_name }}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">个人中心</el-dropdown-item>
            <el-dropdown-item command="1">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-divider direction="vertical"></el-divider>
        <!-- 切换字体 -->
        <el-dropdown trigger="click" @command="setLocale">
          <span class="el-dropdown-link locale_info">
            {{ $t('locale') }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container style="height: calc(100vh - 60px)">
      <!-- 菜单栏 -->
      <el-menu :default-active="$route.path" :collapse="isCollapseMenu" :collapse-transition="false"
        background-color="#2d3a4b" text-color="#fff" active-text-color="#33d9c8" router>
        <MenuList :menuList="menuList" />
      </el-menu>
      <!-- 页面主体 -->
      <el-main v-if="$route.path != '/home/dashboard'">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" :to="item.path" :replace="true">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-container">
          <router-view />
        </div>
      </el-main>
      <el-main v-else>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import screenfull from 'screenfull';
import MenuList from '@/components/MenuList';
import menuList from '@/data/menu';
export default {
  name: 'Home',
  components: {
    MenuList,
  },
  data() {
    return {
      user_name: 'admin',
      fullscreen: false,
      searchInfo: '',
      isSearch: false,
      isCollapseMenu: false,
      menuList,
    };
  },
  computed: {},
  methods: {
    setLogin(type) {
      switch (type) {
        case '0':
          console.log('个人中心');
          break;
        case '1':
          sessionStorage.removeItem('role');
          this.$router.replace({ name: 'login' });
          break;
        default:
          break;
      }
    },
    setLocale(locale) {
      sessionStorage.setItem('locale', locale);
      this.$i18n.locale = locale;
    },

    toggleFullScreen() {
      screenfull.toggle();
    },
  },
  mounted() { },
};
</script>

<style lang="scss" scoped>
// 顶部操作栏
.el-header {
  background-color: $theme-bg-color;
  border-bottom: 1px solid lightgray;
  color: $theme-text-color;
  @include flex(space-around, center);

  .item {
    margin-right: 20px;
  }

  .item:hover,
  .el-dropdown :hover {
    color: $theme-hover-color;
    cursor: pointer;
  }

  .header_right {
    flex: 1;
    height: 100%;
    @include flex(end, center);

    .search {
      width: 160px;
      margin-left: -15px;
      margin-right: 20px;
    }

    .locale_info {
      @include flex(center, center);
    }

    .login_info {
      @include flex(space-around, center);

      .el-avatar {
        margin-top: -2px;
      }
    }
  }
}

// 菜单栏
.el-menu {
  width: 200px;
}

.el-menu--collapse {
  width: 64px;
}

.el-main {
  background-color: $main-bg-color;
  height: 100%;

  .el-breadcrumb {
    margin-top: -20px;
    line-height: 40px;
    height: 40px;
  }

  .main-container {
    height: calc(100% - 20px);
    background-color: #fff;
    padding: 20px;
    overflow: auto;
  }
}
</style>
