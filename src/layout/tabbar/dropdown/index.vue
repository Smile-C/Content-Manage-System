<template>
  <div class="tabbar-right">
    <el-button type="primary" icon="Refresh" circle @click="updateRefsh" />
    <el-button type="primary" icon="FullScreen" circle @click="fullScreen" />
    <el-button type="primary" icon="Setting" circle />
    <img
      :src="userState.avatar"
      alt=""
      style="width: 40px; height: 40px; margin: 20px 20px; border-radius: 50px"
    />

    <!-- 下拉列表 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userState.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { settingStore } from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
import { useRouter } from "vue-router";
const userState = useUserStore();
const $router = useRouter();

// 用户用户信息
let setting = settingStore();
const updateRefsh = () => {
  setting.changeRefsh();
};

const fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const logout = async () => {
  await userState.userLogout();
  $router.push({ path: "/login" });
};
</script>

<style scoped lang="scss">
.tabbar-right {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
</style>
