<template>
  <PlayGround v-if='$store.state.play.status==="playing"' />
  <MatchingSquare v-else />
  <ResultBoard v-if="$store.state.play.loser !== 'none'" />

</template>

<script>
export default {
  name: 'PlayPage'
}
</script>

<script setup>
import PlayGround from '@/components/PlayGround'
import { onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import MatchingSquare from '@/components/MatchingSquare.vue'
import ResultBoard from '@/components/ResultBoard.vue'

const store = useStore()
let socket = null
const token = store.state.user.token || localStorage.getItem('jwt_token')
onMounted(() => {

  store.commit('updateIsRecord', false)

  store.commit('updateOpponent', {
    opponentName: '対戦相手',
    opponentPhoto: 'https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png'
  })


  const socketUrl = 'ws://127.0.0.1:8080/websocket/' + token
  socket = new WebSocket(socketUrl)
  socket.onopen = handleOnOpenSocket

  socket.onmessage = handleOnMessage
  socket.onclose = handleOnClose
})

const handleOnClose = () => {
  console.log('websocket close')
}

const handleOnMessage = (event) => {
  let data = JSON.parse(event.data)
  console.log('PlayPage onmessage')
  // 处理匹配成功的消息
  if (data.event === 'match-success') {
    handleMatchSuccessEvent(data)
    //处理'移动'的消息
  } else if (data.event === 'move') {
    handleMoveEvent(data)
    // 处理游戏结束的消息
  } else if (data.event === 'result') {
    handleResultEvent(data)
  }
}

const handleOnOpenSocket = () => {
  console.log('websocket open')
  store.commit('updateSocket', socket)
}

const handleMatchSuccessEvent = (data) => {
  console.log('match-success event')
  console.log('match-success.data', data)
  // 将对手信息更新到vuex中
  store.commit('updateOpponent', {
    opponentName: data.opponentName,
    opponentPhoto: data.opponentPhoto
  })
  const { gameInfo } = data
  store.commit('updateGameInfo', gameInfo)
  setTimeout(() => {
    store.commit('updateStatus', 'playing')
  }, 1000)
}

const handleMoveEvent = (data) => {
  const gameMap = store.state.play.gameMapObject
  console.log('move event')
  console.log('move data', data)
  console.log('move.gameMap', gameMap)
  const [snake0, snake1] = gameMap.snakes
  const { aDirection, bDirection } = data
  // 更新蛇的方向，方向信息是由服务器发来的，已经经过了isGameOver（游戏是否结束）的验证
  snake0.setDirection(aDirection)
  snake1.setDirection(bDirection)
  console.log('move event aDirection', aDirection)
  console.log('move event bDirection', bDirection)
}

const handleResultEvent = (data) => {
  console.log('result event')
  console.log('result.data', data)
  const gameMap = store.state.play.gameMapObject
  console.log('result.gameMap', gameMap)
  const [snake0, snake1] = gameMap.snakes
  const { loser } = data
  if (loser === 'all' || loser === 'A') {
    snake0.status = 'over'
  }
  if (loser === 'all' || loser === 'B') {
    snake1.status = 'over'
  }
  // 将loser的信息更新到vuex中
  store.commit('updateLoser', loser)
}

onUnmounted(() => {
  if (socket) {
    socket.close()
  }
  store.commit('updateStatus', 'matching')
  store.commit('updateLoser', 'none')
})
</script>

<style scoped>

</style>