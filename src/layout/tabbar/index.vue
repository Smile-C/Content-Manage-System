<template>
  <div class="tabbar">
    <breadcrumd></breadcrumd>
    <dropdown></dropdown>
  </div>
</template>

<script setup lang="ts">
import breadcrumd from "@/layout/tabbar/breadcrumd/index.vue";
import dropdown from "@/layout/tabbar/dropdown/index.vue";
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
