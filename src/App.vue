<script setup lang="ts">
import Counter from "./components/Counter.vue";
import Todos from "./components/Todos.vue";
import Game from './views/Game.vue'
// import router from "./router";
import HomeView from "./views/HomeView.vue";
import { RouterLink, useRouter } from "vue-router";
</script>

<template>
  <div class="center">
    <div>
      <div class="title">
        <h1>
          Snake
        </h1>
      </div>
      <Game />
    </div>
  </div>
</template>



<style>
.center {
  padding-top: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
 font-size: large;
 display: flex;
 align-items: center;
 justify-content: center;
 color:rgb(72, 203, 72);
}
</style>
