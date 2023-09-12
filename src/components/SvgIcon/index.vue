<template>
  <svg :style="{width,height}">
    <use :xlink:href="profix+ named" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
    profix:{
        type:String,
        default:"#icon-",
    },
    named:{
        type:String,
        default:"",
        required: true
    },
    color:{
        type:String,
        default:""
    },
    width:{
        type:String,
        default:"20px"
    },
    height:{
        type:String,
        default:"20px"
    }
})
</script>

<style>

</style>