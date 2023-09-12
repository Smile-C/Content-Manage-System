<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由走这里 -->
    <template v-if="!item.children">
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
        @click="goRoute"
      >
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 只有1个子路由走这里 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="goRoute"
      >
        <template #title>
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有2个子路由以上走这里 -->
    <template v-if="item.children && item.children.length >= 2">
      <el-sub-menu v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <menus :menuList="item.children"></menus>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
defineProps(["menuList"]);
const router = useRouter();

const goRoute = (vc: any) => {
  router.push(vc.index);
};
</script>

<script lang="ts">
export default {
  name: "menus",
};
</script>
<style></style>
