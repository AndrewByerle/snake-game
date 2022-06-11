<script setup lang="ts">
import Counter from "./components/Counter.vue";
import Todos from "./components/Todos.vue";
import GameView from './views/GameView.vue'
// import router from "./router";
import HomeView from "./views/HomeView.vue";
import { RouterLink, useRouter } from "vue-router";

</script>

<template>

<div>
  <div id="game">
    <nav>
      <RouterLink to="/game">Game</RouterLink> |
      <RouterLink to="/about">About</RouterLink>
    </nav>
      <RouterView> </RouterView>
  </div>

  <div>
    <Counter head="Counter1" />
    <Counter head="Counter2" />
    <Todos />
  </div>
  <div class="title">
    <h2>
      Home
    </h2>
  </div>
  </div>


</template>



<style>
#app {
  padding-left: 10%;
  padding-top: 5%;
  color: white;
  /* display: flex;
  flex-flow: column nowrap;
  gap: 1rem; */
  background-color: rgb(34, 34, 54);
}

.title {
  width: 100px
}


</style>
