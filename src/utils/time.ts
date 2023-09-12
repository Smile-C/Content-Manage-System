export default function getTime() {
    let message = ""
    const hour = new Date().getHours()
    if (hour < 9) {
        message = "早上"
    } else if (hour >= 9 && hour < 14) {
        message = "中午"
    } else if (hour >= 14 && hour < 18) {
        message = "下午"
    } else {
        message = "晚上"
    }
    return message
}