<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- <component :is="Component" v-if="flag"></component> -->
      <div :key="$route.path" v-if="flag">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { settingStore } from "@/store/modules/setting";
let setting = settingStore();
let flag = ref(true);
watch(
  () => setting.refsh,
  () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  }
);
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
