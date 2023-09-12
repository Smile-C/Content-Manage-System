<template>
  <el-card>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          :disabled="scene == 1"
          placeholder="请选择"
          clearable
          v-model="categoryStore.c1Id"
          @change="getC2List"
        >
          <el-option
            v-for="item in categoryStore.c1List"
            :label="item.name"
            :key="item.id"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select
          :disabled="scene == 1"
          placeholder="请选择"
          clearable
          v-model="categoryStore.c2Id"
          @change="getC3List"
        >
          <el-option
            v-for="item in categoryStore.c2List"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select
          :disabled="scene == 1"
          placeholder="请选择"
          clearable
          v-model="categoryStore.c3Id"
          @change="queryAttrInfo"
        >
          <el-option
            v-for="item in categoryStore.c3List"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useCategoryStore from "@/store/modules/category";
const categoryStore = useCategoryStore();

defineProps(["scene"]);
/**
 * 获取一级分类
 */
const getC1List = async () => {
  await categoryStore.getC1List();
};
/**
 * 获取二级分类
 */
const getC2List = async () => {
  categoryStore.c2Id = "";
  categoryStore.c3Id = "";
  categoryStore.c3List = [];
  categoryStore.getC2List();
};
const getC3List = async () => {
  categoryStore.c3Id = "";
  categoryStore.c3List = [];
  await categoryStore.getC3List();
};
/**
 * 查修列表
 */
const queryAttrInfo = async () => {
  await categoryStore.queryAttrInfo();
};

onMounted(() => {
  getC1List();
});
</script>

<style></style>
