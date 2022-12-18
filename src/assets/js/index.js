export const GAME_OBJECTS = []

console.log('game index.js')
// 前回実行したタイムスタンプ
let lastRunTimestamp
const step = timestamp => {
    // 遍历所有游戏对象
    for (let ele of GAME_OBJECTS) {
        // 如果游戏对象处于非"开始"状态，就调用start方法
        if (!ele.started) {
            ele.started = true
            ele.start()
        } else {
            ele.timeDelta = timestamp - lastRunTimestamp
            ele.update()
        }
    }

    lastRunTimestamp = timestamp
    // 递归调用step方法，实现每帧执行
    requestAnimationFrame(step)
}
// requestAnimationFrame 是浏览器提供的一个方法，用于在下一帧执行函数
// 第一次调用step方法
requestAnimationFrame(step)