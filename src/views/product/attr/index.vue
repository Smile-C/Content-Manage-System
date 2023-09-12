<template>
  <category :scene="isShow"></category>
  <el-card style="margin: 10px 0px" v-show="isShow == 0">
    <el-button
      :disabled="categoryStore.c3Id ? false : true"
      type="primary"
      icon="plus"
      size="default"
      style="margin: 10px 0px"
      @click="addAttr"
      >添加属性</el-button
    >
    <el-table border :data="categoryStore.AttrInfoList">
      <el-table-column type="index" label="序号" align="center" width="150px" />
      <el-table-column prop="attrName" label="属性名称" align="center" />
      <el-table-column label="属性值名称" align="center">
        <template #="{ row }">
          <el-tag
            style="margin: 5px 5px"
            class="ml-2"
            type="success"
            v-for="item in row.attrValueList"
            :key="item.attrId"
            >{{ item.valueName }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template #="{ row }">
          <div>
            <el-button
              type="primary"
              icon="Edit"
              circle
              @click="updateAttr(row)"
            />
            <el-popconfirm
              title="您确定要删除吗?"
              @confirm="deleteAttr(row.id)"
            >
              <template #reference>
                <el-button type="danger" icon="Delete" circle />
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- ---------------新增属性页面----------------------- -->

  <el-card style="margin: 10px 0px" v-show="isShow == 1">
    <el-form :inline="true">
      <el-form-item label="属性名称">
        <el-input
          placeholder="请输入属性名称"
          v-model="attrParams.attrName"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button
      :disabled="attrParams.attrName ? false : true"
      type="primary"
      size="default"
      icon="plus"
      @click="addAttrValue"
      >添加属性值</el-button
    >
    <el-button type="default" size="default" @click="cancle">取消</el-button>
    <el-table border style="margin: 10px 0px" :data="attrParams.attrValueList">
      <el-table-column
        label="序号"
        align="center"
        width="80px"
        type="index"
      ></el-table-column>
      <el-table-column label="属性值名称" align="center">
        <template #="{ row, $index }">
          <div>
            <el-input
              v-if="row.flag"
              @blur="toLook(row, $index)"
              v-model="row.valueName"
              placeholder="请输入属性值"
            ></el-input>
            <div v-else @click="toEdit(row)">{{ row.valueName }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="属性值操作" align="center">
        <template #="{ row, $index }">
          <div>
            <el-button
              type="danger"
              icon="Delete"
              circle
              @click="attrParams.attrValueList.splice($index, 1)"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      :disabled="attrParams.attrValueList.length > 0 ? false : true"
      type="primary"
      size="default"
      icon="plus"
      @click="save"
      >保存</el-button
    >
    <el-button type="default" size="default" @click="cancle">取消</el-button>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeUnmount } from "vue";
import useCategoryStore from "@/store/modules/category";
import type { AttrinfoListData, AttrValueData } from "@/api/product/attr/type";
import { reqInsertOrUpdateAttr, reqDeleteAttr } from "@/api/product/attr/index";
import { ElMessage } from "element-plus";

onBeforeUnmount(() => {
  categoryStore.$reset();
});
const categoryStore = useCategoryStore();

const toLook = (row: AttrValueData, $index: number) => {
  let result = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName;
    }
  });

  // 情况一：为空
  if (row.valueName.trim() == "") {
    attrParams.attrValueList.splice($index, 1);
    ElMessage({
      type: "error",
      message: "属性值不能为空",
    });
  }
  if (result) {
    /**
     * 情况二：有重复的
     */
    // 重复
    attrParams.attrValueList.splice($index, 1);
    ElMessage({
      type: "error",
      message: "属性值已存在",
    });
  }
  row.flag = false;
};
const toEdit = (row: AttrValueData) => {
  row.flag = true;
};

/**
 * 新增/修改页面显示与隐藏
 */
let isShow = ref<number>(0);
/**
 * 切换新增属性
 */
const addAttr = () => {
  Object.assign(attrParams, {
    attrName: "",
    attrValueList: [],
    categoryId: "",
    categoryLevel: 3,
  });
  isShow.value = 1;
  attrParams.categoryId = categoryStore.c3Id;
};

/**
 * 切换到属性列表页面
 */
const cancle = () => {
  isShow.value = 0;
};

/**
 * 切换到修改属性页面
 */

const updateAttr = (row: AttrValueData) => {
  isShow.value = 1;
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
};

const attrParams = reactive<AttrinfoListData>({
  attrName: "",
  attrValueList: [],
  categoryId: "",
  categoryLevel: 3,
});
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: "",
    flag: true,
  });
};

/**
 * 提交服务器（新增属性）
 */
const save = async () => {
  let result: any = await reqInsertOrUpdateAttr(attrParams);
  console.log("新增:", result);
  if (result.code == 200) {
    await categoryStore.queryAttrInfo();
    isShow.value = 0;
    ElMessage({
      type: "success",
      message: attrParams.id ? "修改成功" : "添加成功",
    });
  }
};

/**
 * 删除属性
 */
const deleteAttr = async (id: number) => {
  console.log(id);
  let result: any = await reqDeleteAttr(id);
  if (result.code == 200) {
    await categoryStore.queryAttrInfo();
    ElMessage({
      type: "success",
      message: "删除成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};
</script>

<style></style>
