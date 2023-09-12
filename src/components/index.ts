import SvgIcon from "@/components/SvgIcon/index.vue"
import Category from "@/components/Category/index.vue"
import type { App, Component } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const components: { [name: string]: Component } = { SvgIcon, Category };

export default {
    install(app: App) {
        Object.keys(components).forEach(item => {
            app.component(item, components[item])
        })
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}