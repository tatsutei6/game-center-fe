<template>
  <div class='container'>
    <div class='row'>
      <div class='col-3'>
        <div class='card' style='margin-top: 20px;width: 70%;margin-left:auto; margin-right:auto;'>
          <div class='card-body'>
            <img :src='$store.state.user.avatarUrl' alt='' style='width: 100%;'>
          </div>
        </div>
      </div>
      <div class='col-8'>
        <div class='card' style='margin-top: 20px;'>
          <div class='card-header'>
            <span style='font-size: 130%'>私のBot</span>
            <button type='button' class='btn btn-primary float-end'
                    @click='onCreate'>
              作成
            </button>
            <!-- Modal -->
            <el-dialog v-model='dialogFormVisible' :title='dialogTitle'>
              <el-form
                  :label-position="'top'"
                  :model='botForModal'
              >
                <el-form-item label='タイトル'>
                  <el-input v-model='botForModal.title' style='width: 100%'
                            placeholder='Botのタイトル' />
                </el-form-item>
                <el-form-item label='説明'>
                  <el-input type='textarea'
                            v-model='botForModal.description' placeholder='Botの説明' />
                </el-form-item>
                <el-form-item label='Bot Code'>
                  <el-input type='textarea'
                            v-model='botForModal.content' rows='12' />
                </el-form-item>
              </el-form>
              <div class='error-message' style='text-align:right'>{{ message }}</div>
              <template #footer>
                <div class='modal-footer'>
                  <button type='button' class='btn btn-primary' @click='addBot'>
                    確定
                  </button>
                  <button type='button' class='btn btn-secondary' style='margin-left: 20px'
                          @click='onCancel'>キャンセル
                  </button>

                </div>
              </template>
            </el-dialog>
          </div>
          <div class='card-body'>
            <table class='table table-striped table-hover'>
              <thead>
              <tr>
                <th>タイトル</th>
                <th>作成時間</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for='bot in bots' :key='bot.id'>
                <td>{{ bot.title }}</td>
                <td>{{ bot.createAt }}</td>
                <td>
                  <button type='button' class='btn btn-secondary' style='margin-right: 10px;'
                          @click='onUpdate(bot)'>編集
                  </button>
                  <button type='button' class='btn btn-danger' style='margin-left:25px;'
                          @click='deleteBot(bot.id)'>削除
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'BotPage'
}
</script>

<script setup>
import { useStore } from 'vuex'
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'


const store = useStore()
const bots = ref([])
const message = ref('')
const dialogFormVisible = ref(false)
let dialogTitle = ref('Botの作成')
const botForModal = reactive({
  title: '',
  description: '',
  content: ''
})
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

const onUpdate = (bot) => {
  dialogTitle.value = 'Botの編集'
  message.value = ''
  dialogFormVisible.value = true
  botForModal.title = bot.title
  botForModal.description = bot.description
  botForModal.content = bot.content
}

const onCreate = () => {
  dialogFormVisible.value = true
  dialogTitle.value = 'Botの作成'
  botForModal.title = ''
  botForModal.description = ''
  botForModal.content = ''
  message.value = ''
}

const onCancel = () => {
  dialogFormVisible.value = false
  message.value = ''
}

const addBot = () => {
  axios.post('http://127.0.0.1:8080/play/bot/add', {
    title: botForModal.title,
    description: botForModal.description,
    content: botForModal.content
  }, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).then(response => {
    const responseData = response.data
    if (responseData.message === 'success') {
      botForModal.content = ''
      botForModal.description = ''
      botForModal.title = ''
      message.value = ''
      dialogFormVisible.value = false
      fetchUserBots()
    } else {
      message.value = responseData.message
    }
  })
}

// const updateBot = (bot) => {
//
// }

const deleteBot = (botId) => {
  axios.post('http://127.0.0.1:8080/play/bot/delete/' + botId, {}, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).then(response => {
    const responseData = response.data
    if (responseData.message === 'success') {
      fetchUserBots()
      message.value = ''
    } else {
      message.value = responseData.message
    }
  })
}


onMounted(() => {
  fetchUserBots()
})

</script>

<style scoped>
.error-message {
  color: red;
}
</style>