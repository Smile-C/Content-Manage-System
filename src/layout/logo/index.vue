<template>
  <div class="logo-container">
    <img src="../.././../public/zjc.jpg" alt="" />
    <p class="right-info">Smile检测管理系统</p>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
.logo-container {
  width: 100%;
  height: $base-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 20px;
  }
  p {
    font-size: 20px;
    margin-left: 15px;
    white-space: nowrap;
  }
}
</style>
