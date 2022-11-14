<template>
  <div class='playground-header'>
    <span>Blue: {{$store.state.play.aId}} - {{$store.state.play.aName}}</span>
    <span>Red: {{$store.state.play.bId}} - {{$store.state.play.bName}}</span>
  </div>
  <div class="playground-content">
    <GameMap/>
  </div>
</template>


<script>
export default {
  name: "PlayGround"
}
</script>

<script setup>
  import GameMap from "@/components/GameMap";

</script>

<style scoped>
.playground-header{
  text-align: center;
  margin-top: 5px;
}
.playground-header span{
  margin-left: 40px;
}
.playground-content {
  width: 70vw;
  height: 85vh;
  margin: 20px auto;
  background-color: lightblue;
}
</style>
