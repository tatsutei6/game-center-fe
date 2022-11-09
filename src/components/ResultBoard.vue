<template>
  <div class='result-board'>
    <div class='result-board-text' v-if="$store.state.play.loser === 'all'">
      Draw
    </div>
    <div class='result-board-text'
         v-else-if="$store.state.play.loser === 'A' && $store.state.play.aId === parseInt($store.state.user.id)">
      Lose
    </div>
    <div class='result-board-text'
         v-else-if="$store.state.play.loser === 'B' && $store.state.play.bId === parseInt($store.state.user.id)">
      Lose
    </div>
    <div class='result-board-text' v-else>
      Win
    </div>
    <div class='result-board-btn'>
      <button @click='restart' type='button' class='btn btn-warning btn-lg'>
        再来!
      </button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ResultBoard'
}
</script>
<script setup>

import { useStore } from 'vuex'

const store = useStore()
const restart = () => {
  store.commit('updateStatus', 'matching')
  store.commit('updateLoser', 'none')
  store.commit('updateOpponent', {
    opponentUsername: '対戦相手',
    opponentAvatarUrl: 'https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png'
  })
}

</script>

<style scoped>
.result-board {
  height: 30vh;
  width: 30vw;
  background-color: rgba(50, 50, 50, 0.5);
  position: absolute;
  top: 30vh;
  left: 35vw;
}

.result-board-text {
  text-align: center;
  color: white;
  font-size: 50px;
  font-weight: 600;
  font-style: italic;
  padding-top: 5vh;
}

.result-board-btn {
  padding-top: 7vh;
  text-align: center;
}
</style>
