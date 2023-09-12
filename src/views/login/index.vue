<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">左边站位</el-col>
      <el-col :span="12" :xs="24" class="right_box">
        <el-form
          ref="login_from"
          class="login_form"
          :model="loginFrom"
          :rules="rules"
        >
          <h1>Hello</h1>
          <h2>欢迎来到Smile甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginFrom.username"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginFrom.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              size="default"
              class="login_btn"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import useUserStore from "@/store/modules/user";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import getTime from "@/utils/time";
const $router = useRouter();
const loading = ref(false);
const loginFrom = reactive({
  username: "admin",
  password: "atguigu123",
});
const login_from = ref();

const rules = {
  username: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "change",
    },
    // {
    //   required: true,
    //   min:6,
    //   max:10,
    //   message:"账号长度小于6位",
    //   trigger:"change"
    // }
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 15,
      message: "密码长度至少6位",
      trigger: "change",
    },
  ],
};

const userState = useUserStore();

const login = async () => {
  await login_from.value.validate();
  loading.value = true;
  try {
    await userState.userLogin(loginFrom);
    $router.push("/");
    ElNotification({
      type: "success",
      message: "欢迎回来",
      title: `Hi,${getTime()}好`,
    });
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
};
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
  .right_box {
    display: flex;
    justify-content: center;
    .login_form {
      position: relative;
      width: 80%;
      top: 30vh;
      background: url("@/assets/images/login_form.png") no-repeat;
      background-size: cover;
      padding: 40px;
      h1 {
        color: white;
        font-size: 40px;
      }
      h2 {
        color: white;
        font-size: 20px;
        margin: 20px 0px;
      }
      .login_btn {
        width: 100%;
      }
    }
  }
}
</style>
