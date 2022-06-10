<script setup lang="ts">

import { ref } from 'vue';
import type { Ref } from 'vue';

type square = 'snake' | 'open' | 'apple';
type direction = 'left' | 'right' | 'up' | 'down';
const BOARD_SIZE = 20

let board = ref<square[][]>([...Array(BOARD_SIZE)].map(() => [...Array(BOARD_SIZE)].map(() => 'open')));
let snakeLocation: number[][] = [];
let snakeDirection = ref<direction>('right');


// Setup initial snake location
for (var i: number = 3; i < 6; i++) {
    var initialSnake: square = 'snake';
    board.value[7][i] = initialSnake;
    snakeLocation.push([7, i]);
}

const isSnake = (col: square) => { if (col === 'snake') return true };
const isFood = (col: square) => { if (col === 'open') return true };

const snakeDetails = () => {
    const snakeLength = snakeLocation.length;
    const head = snakeLocation[snakeLength - 1];
    const tail = snakeLocation[0]
    return { snakeLength, head, tail }
}

const removeTail = (tail: number[]) => {
    const [i, j] = tail;
    board.value[i][j] = 'open';
    snakeLocation.shift();
}

const moveLeft = () => {
    const { snakeLength, head, tail } = snakeDetails();
    const [i, j] = head;
    board.value[i][j - 1] = 'snake';
    snakeLocation.push([i, j - 1])
    removeTail(tail)
}

const moveRight = () => {
    const { snakeLength, head, tail } = snakeDetails();
    const [i, j] = head;
    board.value[i][j + 1] = 'snake';
    snakeLocation.push([i, j + 1])
    removeTail(tail);
}

const moveUp = () => {
    const { snakeLength, head, tail } = snakeDetails();
    const [i, j] = head;
    board.value[i - 1][j] = 'snake';
    snakeLocation.push([i - 1, j])
    removeTail(tail)
}

const moveDown = () => {
    const { snakeLength, head, tail } = snakeDetails();
    const [i, j] = head;
    board.value[i + 1][j] = 'snake';
    snakeLocation.push([i + 1, j])
    removeTail(tail)
}

const moveSnake = () => {
    const dir = snakeDirection.value
    if (dir === 'up'){
        moveUp()
    }
    else if (dir === 'down'){ 
        moveDown() 
    }
    else if (dir === 'left'){ 
        moveLeft() 
    }
    else { 
        moveRight()     
    }
}


document.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowUp':
            snakeDirection.value = 'up'
            break;
        case 'ArrowDown':
            e.preventDefault();
            snakeDirection.value = 'down'
            break;
        case 'ArrowLeft':
            snakeDirection.value = 'left';
            break;
        case 'ArrowRight':
            snakeDirection.value = 'right';
            break;
    }
};

const myTimer = () => {
    moveSnake()
}

setInterval(myTimer, 100);


const test = (row: square[], col: square) => {
    console.log(col);
}
</script>


<template>
    <div v-for="row in board" class="row">
        <div v-for="col in row" class="square" :class="{ snake: isSnake(col), food: isFood(col) }"
            @click="test(row, col)"></div>
    </div>
</template>


<style>
.square {
    height: 20px;
    width: 20px;
    background-color: gray;
    outline: 1px;
    outline-color: white;
    outline-style: solid;
    color: black;
    display: inline-block;
}

.row {
    height: 20px;
}

.snake {
    background-color: green;
}

.gameArea {
    width: 500px;
    height: 500px
}
</style>