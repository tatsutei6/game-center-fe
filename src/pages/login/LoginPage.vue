<template>
  <ContentField>
    <div class='row justify-content-md-center'>
      <div class='col-3'>
        <form @submit.prevent='login'>
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
          <div class='error-msg'>{{ msg }}</div>
          <button type='submit' class='btn btn-primary login-btn'>ログイン</button>
        </form>
      </div>
    </div>
  </ContentField>
</template>

<script>
import ContentField from '@/components/ContentField'

export default {
  name: 'LoginPage',
  components: { ContentField }

}
</script>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

const username = ref('')
const password = ref('')
const msg = ref('')
const store = useStore()

const login = () => {
  const onFail = (error) => {
    msg.value = 'ログイン失敗'
  }

  const onSuccess = (value) => {
    store.dispatch('me', {
      onSuccess: (value) => {
          router.push({ name: 'home' });
      },
      onFail
    })
  }
  store.dispatch('login', {
    username: username.value,
    password: password.value,
    onSuccess,
    onFail
  })


}

// onMounted(() => {
//   const token = localStorage.getItem('jwt_token')
//   if (token) {
//     store.dispatch('me', {
//       onSuccess: (value) => {
//         router.push({ name: 'home' })
//       },
//       onFail: (error) => {
//           msg.value = error
//       }
//     })
//   }
// })

</script>

<style scoped>
.login-btn {
  width: 100%;
}

.error-msg {
  color: red;
}

</style>