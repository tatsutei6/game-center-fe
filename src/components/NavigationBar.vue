<template>
  <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
    <div class='container'>
      <router-link class='navbar-brand' :to="{name: 'home'}">
        <img
            src='@/assets/images/bootstrap-logo.svg'
            alt=''
            width='30'
            height='24'
            class='d-inline-block align-text-top'
        />
        ゲームセンター
      </router-link>
      <button
          class='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarText'
          aria-controls='navbarText'
          aria-expanded='false'
          aria-label='Toggle navigation'
      >
        <span class='navbar-toggler-icon'></span>
      </button>
      <div class='collapse navbar-collapse' id='navbarText'>
        <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
          <li class='nav-item'>
            <router-link :class="routeName === 'play' ? 'nav-link active' : 'nav-link'"
                         :to="{name: 'play'}">
              対戦
            </router-link>
          </li>
          <li class='nav-item'>
            <router-link :class="routeName === 'record' ? 'nav-link active' : 'nav-link'"
                         :to="{name: 'record'}">
              対戦履歴
            </router-link>
          </li>

        </ul>
        <ul class='navbar-nav' v-if='$store.state.user.isLogin'>
          <el-dropdown trigger='click'>
        <span class='el-dropdown-link user-info' style='color: #e7e7eb'>
          {{ $store.state.user.username }}<el-icon class='el-icon--right'><arrow-down /></el-icon>
        </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link class='dropdown-item' :to="{name: 'bot'}">私のBot</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a class='dropdown-item' href='#' @click='logout'>ログアウト</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </ul>
        <ul class='navbar-nav' v-else>
          <li class='nav-item'>
            <router-link class='nav-link' :to="{name: 'login' }" role='button'>
              ログイン
            </router-link>
          </li>
          <li class='nav-item'>
            <router-link class='nav-link' :to="{name: 'register'}" role='button'>
              登録
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
import {
  ArrowDown
} from '@element-plus/icons-vue'

const route = useRoute()
const store = useStore()
let routeName = computed(() => route.name)

// eslint-disable-next-line no-unused-vars
const logout = () => {
  store.dispatch('logout')
  router.push({ name: 'login' })
}

</script>

<style scoped>
.user-info {
  margin-right: 5rem;
}

</style>
