<template>
  <el-card class="box-card">
    <el-button type="primary" icon="plus" @click="openDialog"
      >添加品牌</el-button
    >

    <!-- Dialog对话框 -->
    <el-dialog v-model="dialogFormVisible" title="添加品牌">
      <el-form style="width: 80%">
        <el-form-item label="品牌名称">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌Logo">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <!-- 插槽 -->
      <template #footer>
        <el-button type="primary" size="default" @click="offDiaLog"
          >取消</el-button
        >
        <el-button type="primary" size="default" @click="confirmDialog"
          >确定</el-button
        >
      </template>
    </el-dialog>

    <el-table style="margin: 10px 0px" border :data="tradeMarkArr">
      <el-table-column
        label="序列"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称">
        <template #="{ row }">
          <pre style="color: black">{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌logo">
        <template #="{ row, $index }">
          <img style="width: 100px" :src="row.logoUrl" alt="图片丢失了" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button type="primary" icon="Edit" circle @click="updateDialog" />
          <!--<el-button
            type="danger"
            icon="Delete"
            circle
            @click="deleteTrade(row.id)"
          /> -->
          <el-popconfirm
            title="确定删除吗？"
            icon="delete"
            @confirm="deleteTrade(row.id)"
          >
            <template #reference>
              <el-button type="danger" icon="Delete" circle />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <div class="card-bottom">
    <el-pagination
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      :page-sizes="[3, 5, 7, 9]"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :background="true"
      @current-change="changePageNo"
      @size-change="changePageSize"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, onMounted, reactive } from "vue";
import {
  reqHasTradeMark,
  reqAddOrUpdateTradeMark,
  reqDeleteTradeMark,
} from "@/api/product/trademark";
import type { UploadProps } from "element-plus";

import type {
  TradeMarkResponseData,
  Records,
  TradeMark,
} from "@/api/product/trademark";

let pageNo = ref<number>(2);
let limit = ref<number>(3);
let total = ref<number>(0);
let tradeMarkArr = ref<Records>([]);
// 收集品牌数据
const trademarkParams = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});

const getHasTradeMark = async () => {
  const result: TradeMarkResponseData = await reqHasTradeMark(
    pageNo.value,
    limit.value
  );
  if (result.code == 200) {
    total.value = result.data.total;
    tradeMarkArr.value = result.data.records;
  }
};

const changePageNo = () => {
  getHasTradeMark();
};
const changePageSize = () => {
  pageNo.value = 1;
  getHasTradeMark();
};

// 控制对话框显示与隐藏
const dialogFormVisible = ref(false);
const openDialog = () => {
  dialogFormVisible.value = true;
};
const updateDialog = () => {
  dialogFormVisible.value = true;
};

const offDiaLog = () => {
  dialogFormVisible.value = false;
};

const confirmDialog = async () => {
  let result = await reqAddOrUpdateTradeMark(trademarkParams);
  console.log(result);
  if (result.code == 200) {
    // 添加品牌成功
    dialogFormVisible.value = false;
    ElMessage({
      type: "success",
      message: "添加品牌成功",
    });
    getHasTradeMark();
  } else {
    // 添加品牌失败
    ElMessage({
      type: "error",
      message: "添加品牌失败",
    });
  }
};

onMounted(() => {
  getHasTradeMark();
});

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  console.log("img:", response);
  trademarkParams.logoUrl = response.data;
};

/**
 * 删除品牌操作
 */
const deleteTrade = async (id: number) => {
  const result = await reqDeleteTradeMark(id);
  console.log(result);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除品牌成功",
    });
    getHasTradeMark();
  } else {
    ElMessage({
      type: "error",
      message: result.data,
    });
  }
};
</script>

<style scoped lang="scss">
.card-bottom {
  margin: 20px;
  display: flex;
  justify-content: center;
}
</style>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
