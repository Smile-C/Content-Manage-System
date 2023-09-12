import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import GloableCom from "@/components"
import "@/styles/index.scss"
import "@/utils/request"
import router from "@/router"
import pinia from './store'
import "@/permission.ts"



createApp(App).use(GloableCom).use(ElementPlus).use(router).use(pinia).mount('#app')
