<template>
  <div class='matching-square'>
    <div class='row'>
      <div class='col-4'>
        <div class='user-photo'>
          <img :src='$store.state.user.avatarUrl' alt=''>
        </div>
        <div class='user-username'>
          {{ $store.state.user.username }}
        </div>
      </div>
      <div class='col-4'>
        <div class='user-select-bot'>
          <select v-model='selectedBotId' class='form-select' aria-label='Default select example'>
            <option value='-1' selected>本人出陣</option>
            <option v-for='bot in bots' :key='bot.id' :value='bot.id'>
              {{ bot.title }}
            </option>
          </select>
        </div>
      </div>
      <div class='col-4'>
        <div class='user-photo'>
          <img :src='$store.state.play.opponentPhoto' alt=''>
        </div>
        <div class='user-username'>
          {{ $store.state.play.opponentName }}
        </div>
      </div>
      <div class='col-12' style='text-align: center; padding-top: 15vh;'>
        <button @click='onClickMatchBtn' type='button' class='btn btn-warning btn-lg'>
          {{ matchBtnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchingSquare'
}
</script>
<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

const store = useStore()
const selectedBotId = ref(-1)
const matchBtnText = ref('开始匹配')
let bots = ref([])

const onClickMatchBtn = () => {
  if (matchBtnText.value === "开始匹配") {
    matchBtnText.value = "取消";
    store.state.play.socket.send(JSON.stringify({
      event: "start-matching",
      botId: selectedBotId.value,
    }))
  } else {
    matchBtnText.value = "开始匹配";
    store.state.play.socket.send(JSON.stringify({
      event: "stop-matching",
    }))
  }
}

const token = store.state.user.token || localStorage.getItem('jwt_token')
const fetchUserBots = () => {
  axios.get('http://127.0.0.1:8080/play/bot/my', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).then(response => {
    const responseData = response.data
    if (responseData.message === 'success') {
      bots.value = responseData.data
    }
  })
}

onMounted(() => {
  fetchUserBots()
})

</script>

<style scoped>
.matching-square {
  width: 60vw;
  height: 70vh;
  margin: 40px auto;
  background-color: rgba(50, 50, 50, 0.5);
}

.user-photo {
  text-align: center;
  padding-top: 10vh;
}

.user-photo > img {
  border-radius: 50%;
  width: 20vh;
}

.user-username {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: white;
  padding-top: 2vh;
}

.user-select-bot {
  padding-top: 20vh;
}

.user-select-bot > select {
  width: 60%;
  margin: 0 auto;
}


</style>