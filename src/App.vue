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
      <div class="center">
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
  /* color: black; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: large;
 color:rgb(72, 203, 72);
}

.title {
  width: 100px
}
</style>
