import { GAME_OBJECTS } from '@/assets/js/index'

export class GameObject {
    constructor() {
        this.timeDelta = 0
        this.started = false
        GAME_OBJECTS.push(this)
    }

    /**
     * 一回だけ実行される、オブジェクトが生成された時に実行される
     */
    start() {
    }

    /**
     * 毎フレーム実行される、最初のフレームは実行されない
     */
    update() {

    }


    /**
     * オブジェクト破棄の時の処理
     */
    onDestroy() {

    }

    /**
     * オブジェクトが破棄された時に実行される
     */
    destroy() {
        this.onDestroy()

        for (let i = 0; i < GAME_OBJECTS.length; i++) {
            if (GAME_OBJECTS[i] === this) {
                GAME_OBJECTS.splice(i)
                break
            }
        }
    }
}

