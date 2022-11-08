import { GameObject } from './GameObject'
import { Wall } from '@/assets/js/Wall'
import { Snake } from '@/assets/js/Snake'


export class GameMapObject extends GameObject {
    constructor(ctx, parent, vuexStore) {
        // 调用父类的构造函数，GameMapObject先加入到GAME_OBJECTS
        super()
        this.ctx = ctx
        this.parent = parent
        this.vuexStore = vuexStore
        // 小正方形的边长
        this.L = 0

        this.rows = 13
        this.columns = 14

        this.walls = []

        const {aRow,aColumn,bRow,bColumn} = vuexStore.state.play

        // 蛇
        this.snakes = [
            new Snake({ id: 0, color: '#4876EC', row: aRow, column: aColumn }, this),
            new Snake({ id: 1, color: '#F94848', row: bRow, column: bColumn }, this)
        ]


    }

    /**
     * 判断是否游戏结束
     */
    isGameOver(cell) {
        // 撞到墙gameOver
        for (const wall of this.walls) {
            if (wall.row === cell.row && wall.column === cell.column)
                return true
        }

        // 撞到自己或者对方gameOver
        for (const snake of this.snakes) {
            let k = snake.cells.length
            // 如果蛇尾不增加，则不判断是否碰撞蛇尾
            if (!snake.isExpandTail()) {
                k--
            }
            // 判断是否碰撞蛇身
            for (let i = 0; i < k; i++) {
                if (cell.r === snake.cells[i].row && cell.c === snake.cells[i].column) {
                    return true
                }
            }
        }
        return false
    }

    /**
     * 生成墙和障碍物
     */
    createWallsAndBarriers() {
        const g = this.vuexStore.state.play.gameMapArray

        const _rows = g.length
        const _columns = g[0].length
        // 在canvas上，生成四周的边界墙以及墙内的随机障碍物
        for (let r = 0; r < _rows; r++) {
            for (let c = 0; c < _columns; c++) {
                // 如果为边界位置，或者该位置已经有障碍物了
                if (g[r][c] === 1) {
                    this.walls.push(new Wall(r, c, this))
                }
            }
        }
    }

    /**
     * 增加事件监听
     */
    addListeningEvents() {
        // 将焦点移动到canvas上，才能监听键盘事件
        this.ctx.canvas.focus()
        // 监听键盘事件
        this.ctx.canvas.addEventListener('keydown', (e) => {
            let d = -1
            if (e.key === 'w') {
                d = 0
            } else if (e.key === 'd') {
                d = 1
            } else if (e.key === 's') {
                d = 2
            } else if (e.key === 'a') {
                d = 3
            } else if (e.key === 'ArrowUp') {
                d = 0
            } else if (e.key === 'ArrowRight') {
                d = 1
            } else if (e.key === 'ArrowDown') {
                d = 2
            } else if (e.key === 'ArrowLeft') {
                d = 3
            }
            if (d >= 0) {
                this.vuexStore.state.play.socket.send(JSON.stringify({
                    event: 'move',
                    direction: d
                }))
            }
        })
    }

    start() {
        this.createWallsAndBarriers()
        // 绑定监听函数
        this.addListeningEvents()
    }

    /**
     * 生成游戏Map的长宽
     * 随着窗口的大小变化，重新计算canvas的大小
     * 本质是求被某特定的长方形包围的最大正方形的长宽
     */
    updateSize() {
        // canvas为正方形，是多个小正方形组成，每个小正方形的边长为L
        // canvas的行数，列数和父元素的行数，列数一致
        this.L = Math.min(this.parent.clientWidth / this.columns, this.parent.clientHeight / this.rows)
        // 向下取整，消除浮点数造成的空隙
        // 单元格(小正方形)的边长
        this.L = Math.floor(this.L)
        // 设置canvas的宽度和高度
        this.ctx.canvas.width = this.L * this.columns
        this.ctx.canvas.height = this.L * this.rows
    }

    /**
     * 判断两条蛇是否准备好执行下一回合
     * @returns {boolean}
     */
    isReady() {
        for (const snake of this.snakes) {
            if (snake.status !== 'idle') return false
            if (snake.direction === -1) return false
        }
        return true
    }

    update() {
        // 随着窗口的大小变化，重新计算canvas的大小
        this.updateSize()
        // 两条蛇都准备好执行下一回合
        // 如果有一条蛇的状态为over或者move，则不执行下一回合
        if (this.isReady()) {
            // 执行两条蛇的nextRound
            for (const snake of this.snakes) {
                snake.nextRound()
            }
        }
        this.render()
    }

    render() {
        // canvas的背景色
        const colorEven = '#AAD751'
        const colorOdd = '#A2D149'

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                // 画一个小正方形
                this.ctx.fillStyle = (r + c) % 2 === 0 ? colorEven : colorOdd
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L)
            }
        }
    }
}