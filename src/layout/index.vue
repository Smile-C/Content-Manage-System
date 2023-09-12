<template>
  <div class="layout_container">
    <div class="left_layout" :class="{ flod: setting.flod }">
      <logo></logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          mode="vertical"
          :collapse="setting.flod"
          background-color="001529"
          text-color="white"
          :default-active="$route.path"
        >
          <menus :menuList="useState.menuRoutes"></menus>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="top_layout" :class="{ flod: setting.flod }">
      <tabbar></tabbar>
    </div>
    <div class="main_layout" :class="{ flod: setting.flod }">
      <mains></mains>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "@/layout/logo/index.vue";
import menus from "@/layout/menus/index.vue";
import useUserStore from "@/store/modules/user";
import mains from "@/layout/main/index.vue";
import tabbar from "@/layout/tabbar/index.vue";
import { useRoute } from "vue-router";
import { settingStore } from "@/store/modules/setting";
const setting = settingStore();
const $route = useRoute();
const useState = useUserStore();
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .left_layout {
    width: $base-meau-width;
    height: 100vh;
    background: $base-meau-background;
    color: white;
    transition: all 0.3s;
    &.flod {
      width: $base-meau-min-width;
    }
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }

  .top_layout {
    position: fixed;
    width: calc(100% - $base-meau-width);
    height: 50px;
    left: $base-meau-width;
    top: 0px;
    transition: all 0.3s;
    &.flod {
      width: calc(100vw - $base-meau-min-width);
      left: $base-meau-min-width;
    }
  }
  .main_layout {
    position: absolute;
    width: calc(100% - $base-meau-width);
    height: calc(100vh - 50px);
    left: $base-meau-width;
    top: 50px;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.flod {
      width: calc(100vw - $base-meau-min-width);
      left: $base-meau-min-width;
    }
  }
}
</style>
