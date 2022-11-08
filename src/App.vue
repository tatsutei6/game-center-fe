<template>
  <NavigationBar />
  <router-view />
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'

export default {
  name: 'App',
  components: {
    NavigationBar
  }

}
</script>

<script setup>
import { onMounted, ref } from 'vue'

const userInfo = ref({})
const fetchData = async () => {
  // const response = await axios.get("http://localhost:8080/play/user/info");
  // userInfo.value = response.data;
  userInfo.value = {
    username: 'test',
    email: 'test@local.dev'
  }
}

onMounted(() => {
  console.log('App onMounted')
  fetchData()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background-image: url("@/assets/images/bg.png");
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
