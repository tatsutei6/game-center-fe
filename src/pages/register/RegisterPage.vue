<template>
  <ContentField>
    <div class='row justify-content-md-center'>
      <div class='col-3'>
        <form @submit.prevent='register'>
          <div class='mb-3'>
            <label for='username' class='form-label'>ユーザー名</label>
            <input v-model='username' type='text' class='form-control' id='username'
                   placeholder='ユーザー名'>
          </div>
          <div class='mb-3'>
            <label for='password' class='form-label'>パスワード</label>
            <input v-model='password' type='password' class='form-control' id='password'
                   placeholder='パスワード'>
          </div>
          <div class='mb-3'>
            <label for='confirmPassword' class='form-label'>確認パスワード</label>
            <input v-model='confirmPassword' type='password' class='form-control' id='confirmPassword'
                   placeholder='確認パスワード'>
          </div>
          <div class='error-msg'>{{ msg }}</div>
          <button type='submit' class='btn btn-primary register-btn'>登録</button>
        </form>
      </div>
    </div>
  </ContentField>
</template>

<script>
import ContentField from '@/components/ContentField'

export default {
  name: 'RegisterPage',
  components: { ContentField }
}
</script>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'

let username = ref('')
let password = ref('')
let confirmPassword = ref('')
let msg = ref('')

const register = () => {
  axios.post('http://127.0.0.1:8080/play/user/register', {
    username: username.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  }).then((response) => {
    const responseData = response.data
    if (responseData.message !== 'success') {
      msg.value = responseData.message
    }else {
      router.push({ name: 'login' })
    }
  }).catch((error) => {
    msg.value = error.message
  })
}
</script>

<style scoped>
.register-btn {
  width: 100%;
}
.error-msg {
  color: red;
}


</style>