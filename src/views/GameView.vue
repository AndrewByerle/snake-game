<script setup lang="ts">

import { ref } from 'vue';
import type { Ref } from 'vue';

type square = 'snake' | 'open' | 'apple';
type direction = 'left' | 'right' | 'up' | 'down';
const BOARD_SIZE = 25

let board = ref<square[][]>([...Array(BOARD_SIZE)].map(() => [...Array(BOARD_SIZE)].map(() => 'open')));
let snakeLocation: number[][] = [];
let snakeDirection = ref<direction>('right');
let grid = board.value;

// Setup initial snake location
for (var i: number = 3; i < 6; i++) {
    var initialSnake: square = 'snake';
    board.value[7][i] = initialSnake;
    snakeLocation.push([7, i]);
}
// initial food
board.value[10][10] = 'apple'

const continuousMovement = () => {
    const dir = snakeDirection.value
    if (dir === 'up') {
        moveUp()
    }
    else if (dir === 'down') {
        moveDown()
    }
    else if (dir === 'left') {
        moveLeft()
    }
    else {
        moveRight()
    }
}

const myTimer = () => {
    continuousMovement()
}

let interval = setInterval(myTimer, 100);
// clearInterval(interval);

const snakeDetails = () => {
    const snakeLength = snakeLocation.length;
    const head = snakeLocation[snakeLength - 1];
    const tail = snakeLocation[0]
    return { snakeLength, head, tail }
}

const isApple = (val: square) => {
    return val === 'apple'
}

const removeTail = (shouldRemove: boolean, tail: number[]) => {
    if (shouldRemove) {
        const [i, j] = tail;
        board.value[i][j] = 'open';
        snakeLocation.shift();
    }
}

const checkIllegalMove = (row: number, col: number) => {
    
}

const generateApple = () => {

}

const moveSnake = (x: number, y: number) => {
    const { snakeLength, head, tail } = snakeDetails();
    const [i, j] = head;
    checkIllegalMove(i + y, j + x);
    const next = board.value[i + y][j + x];
    const shouldRemove = !isApple(next);
    removeTail(shouldRemove, tail);
    board.value[i + y][j + x] = 'snake';
    snakeLocation.push([i + y, j + x])
}

const moveLeft = () => {
    moveSnake(-1, 0);
}

const moveRight = () => {
    moveSnake(1, 0);
}

const moveUp = () => {
    moveSnake(0, -1);
}

const moveDown = () => {
    moveSnake(0, 1);
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

const test = (row: square[], col: square) => {
    console.log(col);
}
</script>


<template>
    <div v-for="(row, i) in board" class="row">
        <div v-for="(col, j) in row" :class="`square ${grid[i][j]}`" @click="test(row, col)"></div>
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

.apple {
    background-color: red;
}

.gameArea {
    width: 500px;
    height: 500px
}
</style>