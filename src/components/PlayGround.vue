<template>
  <div class='playground-header' v-if='$store.state.record.isRecord'>
    <span>Blue:<img style='margin-left: 5px;margin-right: 5px' :src='$store.state.record.aPhoto' alt='' class='playground-player-photo'>
      {{ $store.state.record.aName }}
    </span>
    <span>Red:<img style='margin-left: 5px;margin-right: 5px' :src='$store.state.record.bPhoto' alt='' class='playground-player-photo'>
      {{ $store.state.record.bName }}
    </span>
  </div>
  <div class='playground-header' v-else>
    <span>Blue:<img style='margin-left: 5px;margin-right: 5px' :src='$store.state.play.aPhoto' alt='' class='playground-player-photo'>
      {{ $store.state.play.aName }}
    </span>
    <span>Red:<img style='margin-left: 5px;margin-right: 5px' :src='$store.state.play.bPhoto' alt='' class='playground-player-photo'>
      {{ $store.state.play.bName }}
    </span>
  </div>
  <div class='playground-content'>
    <GameMap />
  </div>
</template>


<script>
export default {
  name: 'PlayGround'
}
</script>

<script setup>
import GameMap from '@/components/GameMap'

</script>

<style scoped>
.playground-header {
  text-align: center;
  margin-top: 5px;
}

.playground-header span {
  margin-left: 40px;
}

.playground-content {
  width: 70vw;
  height: 85vh;
  margin: 20px auto;
  background-color: lightblue;
}
img.playground-player-photo {
  width: 4vh;
  border-radius: 50%;
}
</style>
