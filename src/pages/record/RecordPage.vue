<template>
  <ContentField>
    <div class='record-container'>
      <div class='row'>
        <div class='col-3'>
          <div class='card'
               style='margin-top: 20px;width: 70%;margin-left:auto; margin-right:auto;'>
            <div class='card-body'>
              <img :src='$store.state.user.avatarUrl' alt='' style='width: 100%;'>
            </div>
          </div>
        </div>
        <div class='col-8'>
          <div class='card' style='margin-top: 20px;'>
            <div class='card-header'>
              <span style='font-size: 130%'>対戦履歴</span>
            </div>
            <div class='card-body'>
              <table class='table table-striped table-hover' style='text-align: center;'>
                <thead>
                <tr>
                  <th>プレーヤーA</th>
                  <th>プレーヤーB</th>
                  <th>結果</th>
                  <th>対戦時間</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for='record in records' :key='record.id'>
                  <td>
                    <img :src='record.playerInfo.aPhoto' alt='' class='record-player-photo'>
                    &nbsp;
                    <span>{{ record.playerInfo.aName }}</span>
                  </td>
                  <td>
                    <img :src='record.playerInfo.bPhoto' alt='' class='record-player-photo'>
                    &nbsp;
                    <span>{{ record.playerInfo.bName }}</span>
                  </td>
                  <td>{{ record.playerInfo.result }}</td>
                  <td>{{ record.content.createAt }}</td>
                  <td>
                    <button type='button' class='btn btn-outline-primary'
                            style='margin-right: 10px;' @click='onReplayBtnClick(record)'>
                      観戦
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
              <nav aria-label='...'>
                <ul class='pagination' style='float: right;'>
                  <li class='page-item' @click='onClickPage(-2)'>
                    <a class='page-link' href='#'>前へ</a>
                  </li>
                  <li :class="'page-item ' + page.isActive" v-for='page in pages' :key='page.number'
                      @click='onClickPage(page.number)'>
                    <a class='page-link' href='#'>{{ page.number }}</a>
                  </li>
                  <li class='page-item' @click='onClickPage(-1)'>
                    <a class='page-link' href='#'>次へ</a>
                  </li>
                </ul>
              </nav>
              <div class='error-message'>{{ message }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentField>
</template>

<script setup>
import ContentField from '@/components/ContentField'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import router from '@/router/index'

const store = useStore()
const token = store.state.user.token || localStorage.getItem('jwt_token')
const records = ref([])
let currentPage = 1
let totalRecords = 0
let pages = ref([])
const message = ref('')

const onClickPage = (page) => {
  // -2: 前へ
  if (page === -2)
    page = currentPage - 1
  // -1: 次へ
  else if (page === -1)
    page = currentPage + 1
  let maxPage = Math.ceil(totalRecords / 10)

  if (page >= 1 && page <= maxPage) {
    currentPage = page
    fetchRecords()
  }
}

const reCalculatePages = () => {
  let maxPages = Math.ceil(totalRecords / 10)
  console.log(maxPages)
  let newPages = []
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i >= 1 && i <= maxPages) {
      newPages.push({
        number: i,
        isActive: i === currentPage ? 'active' : ''
      })
    }
  }
  pages.value = newPages
}

const fetchRecords = () => {
  axios.get('http://127.0.0.1:8080/play/record/all/' + currentPage, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => {
    const responseData = response.data
    if (responseData.message === 'success') {
      message.value = ''
      totalRecords = responseData.data.count
      console.log('responseData.count', responseData.data.count)
      records.value = responseData.data.records
      reCalculatePages()
    } else {
      message.value = responseData.message
    }

  })
}

const arrTo2DArr = (map) => {
  let g = []
  // 地图为13行，14列
  for (let i = 0, k = 0; i < 13; i++) {
    let line = []
    for (let j = 0; j < 14; j++, k++) {
      if (map[k] === '0') line.push(0)
      else line.push(1)
    }
    g.push(line)
  }
  return g
}

const onReplayBtnClick = (record) => {
  const { content } = record
  const { playerInfo } = record
  const { id, aId, aRow, aColumn, aSteps, bId, bRow, bColumn, bSteps, loser } = content
  const gameMapArray = arrTo2DArr(content.map)
  store.commit('updateIsRecord', true)
  store.commit('updateGameInfo', {
    gameMapArray,
    aId,
    aRow,
    aColumn,
    bId,
    bRow,
    bColumn
  })
  store.commit('updateRecordSteps', {
    aSteps,
    bSteps
  })

  store.commit('updateRecordPlayers', {
    aName: playerInfo.aName,
    bName: playerInfo.bName,
    aPhoto: playerInfo.aPhoto,
    bPhoto: playerInfo.bPhoto
  })

  store.commit('updateRecordLoser', loser)

  router.push({
    name: 'replay',
    params: {
      recordId: id
    }
  })
}


onMounted(() => {
  fetchRecords()
})
</script>

<style scoped>
.error-message {
  color: red;
}

img.record-player-photo {
  width: 4vh;
  border-radius: 50%;
}

</style>