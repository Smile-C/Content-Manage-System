import { defineStore } from "pinia";
export const settingStore = defineStore("setting", {
    state: () => {
        return {
            flod: false,
            refsh: false
        }
    },
    actions: {
        changeFlod() {
            this.flod = !this.flod
        },
        changeRefsh() {
            this.refsh = !this.refsh
        }
    }
})