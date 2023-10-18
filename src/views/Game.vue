<script setup lang="ts">
import { useSnakeGame } from "@/composables/snakeGame";
import { BOARD_SIZE } from "@/constants";
import { direction } from "@/composables/snakeGame";
import Share from "../components/share/Share.vue";

const { board, lost, score, isRunning, setNewDirection, startGame } =
  useSnakeGame(BOARD_SIZE);

document.onkeyup = function (e) {
  e.preventDefault();
  switch (e.key) {
    case "ArrowUp":
      setNewDirection(direction.UP);
      break;
    case "ArrowDown":
      setNewDirection(direction.DOWN);
      break;
    case "ArrowLeft":
      setNewDirection(direction.LEFT);
      break;
    case "ArrowRight":
      setNewDirection(direction.RIGHT);
      break;
  }
};

const copyScore = async () => {
  const scoreText = `Snake Length: ${score.value} \n`;
  const snakeEmoji = "🟩".repeat(score.value);
  try {
    await navigator.clipboard.writeText(scoreText + snakeEmoji);
  } catch (e) {
    alert("copy failed");
  }
};
</script>

<template>
  <div class="title">
    <h1>Snake</h1>
  </div>
  <div>
    <p class="title">Snake Size: {{ score }}</p>
  </div>
  <div class="middle">
    <div class="gameArea">
      <div v-for="(row, i) in board" class="row">
        <div v-for="(col, j) in row" :class="`square ${board[i][j]}`"></div>
      </div>
      <div class="play" v-if="!isRunning">
        <button @click="startGame" class="button">Play</button>
      </div>
    </div>
  </div>

  <div v-if="lost" class="lost">
    <div>
      <h1>Game Over!</h1>
      <Share @share="copyScore" />
    </div>
  </div>
  <div class="keys" v-else-if="!lost">
    <button class="up arr" @click="setNewDirection(direction.UP)">
      <i class="fa fa-arrow-up"></i>
    </button>
    <br />
    <button class="left arr" @click="setNewDirection(direction.LEFT)">
      <i class="fa fa-arrow-left"></i>
    </button>
    <button class="down arr" @click="setNewDirection(direction.DOWN)">
      <i class="fa fa-arrow-down"></i>
    </button>
    <button class="right arr" @click="setNewDirection(direction.RIGHT)">
      <i class="fa fa-arrow-right"></i>
    </button>
    <link
      href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"
      rel="stylesheet"
    />
  </div>
</template>

<style>
@import url(https://fonts.googleapis.com/css?family=Lato:300);

.keys {
  font-family: "Lato", sans-serif;
  text-align: center;
}

.arr {
  cursor: pointer;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: lightgrey;
  color: white;
  font-size: 20px;
  border-right: 10px solid darken(grey, 20);
  border-bottom: 10px solid darken(grey, 20);
  border-left: 10px solid darken(grey, 15);
  border-top: 10px solid darken(grey, 10);
  display: inline-block;
  margin: 5px;
  transition: all 0.05s linear;
  border: none;
}

.arr:active {
  border-bottom: 8px solid darken(grey, 20);
  text-shadow: 0 0 10px white, 0 0 10px white, 0 0 20px white;
  transform: translate(0, 2px);
}

.play {
  position: absolute;
  top: 41%;
  left: 38%;
}

.title {
  font-size: large;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(72, 203, 72);
}

.middle {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  background-color: rgb(72, 203, 72);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 20px;
  font-size: 16px;
}

.lost {
  font-size: large;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(72, 203, 72);
}

.square {
  height: 20px;
  width: 20px;
  background-color: lightgray;
  outline: 1px;
  outline-color: white;
  outline-style: solid;
  color: black;
  display: inline-block;
}

.row {
  height: auto;
  display: flex;
  /* position: absolute; */
}

.snake {
  background-color: green;
}

.apple {
  background-color: red;
}

.gameArea {
  background-color: lightgray;
  position: relative;
}
</style>
