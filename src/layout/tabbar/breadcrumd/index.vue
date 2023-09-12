<template>
  <div class="tabbar-left">
    <!-- 顶部左侧图标 -->
    <el-icon style="margin-right: 10px" @click="changeIcon">
      <component :is="setting.flod ? 'fold' : 'Expand'"></component>
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        :to="item.path"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { settingStore } from "@/store/modules/setting";
import { useRoute } from "vue-router";
const setting = settingStore();
const $route = useRoute();
const changeIcon = () => {
  // setting.changeFlod();
};
</script>

<style scoped lang="scss">
.tabbar-left {
  display: flex;
  margin-left: 20px;
}
</style>
