<script setup lang="ts">

import { ref } from 'vue';
import type { Ref } from 'vue';

type square = 'snake' | 'open' | 'apple';
type direction = 'left' | 'right' | 'up' | 'down';
const BOARD_SIZE = 25;
let board = ref<square[][]>([...Array(BOARD_SIZE)].map(() => [...Array(BOARD_SIZE)].map(() => 'open')));
let snakeLocation: number[][] = [];
let snakeDirection = ref<direction>('right');
let snakeSpeed = ref<number>(500);
let lost = ref<boolean>(false);
let grid = board.value;
let snakeSpeedChange = 200;

// Setup initial snake location
for (var i: number = 3; i < 6; i++) {
    var initialSnake: square = 'snake';
    board.value[7][i] = initialSnake;
    snakeLocation.push([7, i]);
}

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
    } else {
        increaseGameSpeed()
    }
}

const checkIllegalMove = (row: number, col: number) => {
    if (row < 0 || col < 0 || row > BOARD_SIZE - 1 || col > BOARD_SIZE - 1) {
        console.log('illegal move!')
        lost.value = true;
    }
    else if (board.value[row][col] === 'snake') {
        console.log('illegal move!')
        lost.value = true;
    }
}

const getRandomInt = (num: number) => {
    return Math.floor(Math.random() * num);
}

const generateApple = () => {
    let i = getRandomInt(BOARD_SIZE);
    let j = getRandomInt(BOARD_SIZE)
    if (board.value[i][j] === 'snake'){
        generateApple();
    } else{
        board.value[i][j] = 'apple'
    }
}
const gameState = () => {
    if (lost.value === true){
        return
    }
    continuousMovement()
    generateApple();
    setTimeout(gameState, snakeSpeed.value)

}

setTimeout(gameState, snakeSpeed.value)

const increaseGameSpeed = () => {
    snakeSpeedChange = Math.max(5, snakeSpeedChange - 50)
    snakeSpeed.value = Math.max(30, snakeSpeed.value - snakeSpeedChange);
}

const moveSnake = (x: number, y: number) => {
    const { head, tail } = snakeDetails();
    const [i, j] = head;
    checkIllegalMove(i + y, j + x);
    if (lost.value === true){ return }
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
        <div v-for="(col, j) in row" :class="`square ${board[i][j]}`" @click="test(row, col)"></div>
    </div>
    <div v-if="lost" class="lost">
        <h1>
            Game Over!
        </h1>    
    </div>

</template>


<style>
.lost {
 font-size: large;
 display: flex;
 align-items: center;
 justify-content: center;
 color:rgb(72, 203, 72);
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