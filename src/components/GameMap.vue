<template>
  <div ref='parent' class='game-map'>
    <canvas ref='canvas' tabindex='0'></canvas>
  </div>
</template>

<script>
export default {
  name: 'GameMap'
}
</script>
<script setup>
import { ref, onMounted } from 'vue'
import { GameMapObject } from '@/assets/js/GameMapObject'
import { useStore } from 'vuex'

const parent = ref(null)
const canvas = ref(null)

onMounted(() => {
  const store = useStore()
  const gameMapObject = new GameMapObject(canvas.value.getContext('2d'), parent.value, store)
  store.commit('updateGameMapObject', gameMapObject)
})

</script>
<style scoped>
.game-map {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>