<script setup lang="ts">
import Counter from "./components/Counter.vue";
import Todos from "./components/Todos.vue";
import GameView from './views/GameView.vue'
// import router from "./router";
import HomeView from "./views/HomeView.vue";
import { RouterLink, useRouter } from "vue-router";

</script>

<template>

  <div class="game">
    <div>
      <nav>
        <RouterLink to="/game">Game</RouterLink> |
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <RouterView> </RouterView>
    </div>
  </div>


</template>



<style>
.game {
  padding-top: 5%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  width: 100px
}
</style>
