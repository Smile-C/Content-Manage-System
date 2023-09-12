<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="default">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px">
    <el-button type="primary" @click="addUser">添加用户</el-button>
    <el-button type="danger">批量删除</el-button>
    <el-table border style="margin: 10px 0px" :data="userList">
      <el-table-column type="selection" show-overflow-tooltip></el-table-column>
      <el-table-column
        label="序号"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        label="id"
        align="center"
        prop="id"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户名字"
        align="center"
        prop="username"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户名称"
        align="center"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="用户角色" align="center" show-overflow-tooltip>
        <template #="{ row }">
          <el-tag v-if="row.roleName" class="ml-2" type="success">{{
            row.roleName
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="260px"
        show-overflow-tooltip
      >
        <template #="{ row }">
          <el-button type="primary" size="small" @click="setRole(row)"
            >分配角色</el-button
          >
          <el-button
            type="primary"
            icon="Edit"
            circle
            style="margin: 0px 10px"
            @click="updateUser(row)"
          />
          <el-button type="danger" icon="Delete" circle />
        </template>
      </el-table-column>
    </el-table>
    <template class="bottom">
      <el-pagination
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        :page-sizes="[3, 5, 7, 9, 11]"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :background="true"
        @current-change="getAllUserData(pageNo)"
        @size-change="getAllUserData(pageNo)"
      />
    </template>
  </el-card>

  <el-drawer v-model="drawer" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">
        {{ userParams.id ? "修改用户" : "添加用户" }}
      </h4>
      <el-button type="danger" @click="close">
        <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
        Close
      </el-button>
    </template>
    <template #default>
      <el-form :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用户姓名" prop="username">
          <el-input
            v-model="userParams.username"
            placeholder="请输入用户姓名"
          ></el-input>
        </el-form-item>

        <el-form-item label="用户昵称" prop="name">
          <el-input
            v-model="userParams.name"
            placeholder="请输入用户昵称"
          ></el-input>
        </el-form-item>

        <el-form-item
          v-if="userParams.id ? false : true"
          label="用户密码"
          prop="password"
        >
          <el-input
            v-model="userParams.password"
            placeholder="请输入用户密码"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="colseDrawer">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </template>
  </el-drawer>

  <el-drawer v-model="drawer2" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">分配用户角色</h4>
      <el-button type="danger" @click="close">
        <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
        Close
      </el-button>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input
            v-model="userParams.username"
            :disabled="true"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <el-checkbox-group
            v-model="checkedRoles"
            @change="handleCheckedRolesChange"
          >
            <el-checkbox v-for="item in RoleList" :key="item" :label="item">{{
              item
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="closeDrawer2">取消</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue";
import { reqAllUser, reqAddOrUpdateUser } from "@/api/acl/user/index";
import { ALL_USER_Response_Data, UserData } from "@/api/acl/user/type";
import { ElMessage } from "element-plus";
// 表单el-form对象
const formRef = ref();
// 默认页码
let pageNo = ref<number>(1);
// 每页展示几条数据
let pageSize = ref<number>(5);
// 用户总数量
let total = ref<number>(0);
// 全部用户
let userList = ref<UserData[]>([]);
// 抽屉开关
const drawer = ref(false);
// 分配角色抽屉开关
const drawer2 = ref(false);
// 选中的职位列表
const checkedRoles = ref(["前端", "后端", "测试"]);
// 职位列表
const RoleList = [
  "超级管理员",
  "前台",
  "运行",
  "产品",
  "前端",
  "后端",
  "测试",
  "财务",
  "运维",
  "销售",
  "程序鼓励师",
];

// 设置不确定状态，仅负责样式控制
const isIndeterminate = ref(true);

// 新增和修改用户信息数据
let userParams = reactive<UserData>({
  username: "",
  name: "",
  password: "",
});
/**
 * 打开抽屉,添加用户
 */
const addUser = () => {
  drawer.value = true;
  Object.assign(userParams, {
    id: 0,
    username: "",
    name: "",
    password: "",
  });
  nextTick(() => {
    formRef.value.clearValidate("username");
    formRef.value.clearValidate("name");
    formRef.value.clearValidate("password");
  });
};

/**
 * 打开抽屉，修改用户
 */
const updateUser = (row: UserData) => {
  drawer.value = true;
  Object.assign(userParams, row);
  nextTick(() => {
    formRef.value.clearValidate("username");
    formRef.value.clearValidate("name");
  });
};
/**
 * 关闭抽屉1
 */
const colseDrawer = () => {
  drawer.value = false;
};

/**
 * 页面加载之前获取数据
 */
const getAllUserData = async (pager = 1) => {
  pageNo.value = pager;
  const result: ALL_USER_Response_Data = await reqAllUser(
    pageNo.value,
    pageSize.value
  );
  if (result.code == 200) {
    total.value = result.data.total;
    userList.value = result.data.records;
  }
};
onMounted(() => {
  getAllUserData(pageNo.value);
});
/**
 * 提交用户信息数据
 */
const save = async () => {
  await formRef.value.validate();
  const result = await reqAddOrUpdateUser(userParams);
  console.log(result);
  if (result.code === 200) {
    // 关闭抽屉
    drawer.value = false;
    //  提示添加成功
    ElMessage({
      type: "success",
      message: userParams.id ? "更新成功" : "添加成功",
    });
    // 重新获取用户列表
    // getAllUserData(userParams.id ? pageNo.value : 1);
    window.location.reload();
  } else {
    ElMessage({
      type: "error",
      message: userParams.id ? "更新失败" : "添加失败",
    });
  }
};
/**
 * 校验用户username的函数
 */
const validatorUsername = (rule: any, value: any, callBack: any) => {
  // 用户名字长度小于5
  if (value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error("用户名字至少为5位"));
  }
};
/**
 * 校验用户name的函数
 */
const validatorName = (rule: any, value: any, callBack: any) => {
  // 用户名字长度小于5
  if (value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error("用户名字至少为5位"));
  }
};
/**
 * 校验用户password的函数
 */
const validatorPassword = (rule: any, value: any, callBack: any) => {
  // 用户名字长度小于5
  if (value.trim().length >= 6) {
    callBack();
  } else {
    callBack(new Error("用户名字至少为6位"));
  }
};
/**
 * 表单校验规则对象
 */

const rules = {
  username: [
    {
      required: true,
      trigger: "blur",
      validator: validatorUsername,
    },
  ],
  name: [
    {
      required: true,
      trigger: "blur",
      validator: validatorName,
    },
  ],
  password: [
    {
      required: true,
      trigger: "blur",
      validator: validatorPassword,
    },
  ],
};

/**
 * 打开分配用户抽屉
 */
const setRole = (row: UserData) => {
  console.log(row);
  drawer2.value = true;
  Object.assign(userParams, row);
};

/**
 * 复选框全部选中
 */
const checkAll = ref<boolean>(false);

/**
 * 全选复选框的change事件
 */
const handleCheckAllChange = (val: boolean) => {
  checkedRoles.value = val ? RoleList : [];
  isIndeterminate.value = false;
};

/**
 * 复选框组全选判断
 */
const handleCheckedRolesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === RoleList.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < RoleList.length;
};

/**
 * 关闭复选框抽屉
 */
const closeDrawer2 = () => {
  drawer2.value = false;
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bottom {
  margin: 20px 0px;
  display: flex;
  justify-content: center;
}
</style>
