<script setup lang="ts">
import { ref } from 'vue';
import DoneCheckmark from '../components/icons/DoneCheckmark.vue';

type square = 'snake' | 'open' | 'apple';
type direction = 'left' | 'right' | 'up' | 'down';
const BOARD_SIZE = 20;
const SNAKE_INITIAL_ROW = 7;
const SNAKE_INITIAL_COL = 5;
const FIRST_APPLE_TIMEOUT = 500;
const APPLE_GENERATION_TIMEOUT = 2000; // msec before next apple
const PLAY_AGAIN_TIMEOUT = 2000;
let board = ref<square[][]>([...Array(BOARD_SIZE)].map(() => [...Array(BOARD_SIZE)].map(() => 'open')));
let snakeLocation: number[][] = []; // list of [i, j] locations where snake exists
let snakeDirection = ref<direction>('right');
let snakeSize = ref<number>(1);
let snakeRefreshTime = ref<number>(500); // msec for snake to update
let lost = ref<boolean>(false);
let newSpeed = 500;
let showCopied= ref<boolean>(false);
let isPlayAgainDisabled = ref<boolean>(true);

// Setup initial snake location
const initialSnake: square = 'snake';
board.value[SNAKE_INITIAL_ROW][SNAKE_INITIAL_COL] = initialSnake;
snakeLocation.push([SNAKE_INITIAL_ROW, SNAKE_INITIAL_COL]);


const snakeDetails = () => {
    const snakeLength = snakeLocation.length;
    snakeSize.value = snakeLength;
    const head = snakeLocation[snakeLength - 1];
    const tail = snakeLocation[0];
    return { snakeLength, head, tail };
}

const isApple = (val: square) => {
    return val === 'apple';
}

const removeTail = (shouldRemove: boolean, tail: number[]) => {
    if (shouldRemove) {
        const [i, j] = tail;
        board.value[i][j] = 'open';
        snakeLocation.shift();
    } else {
        increaseGameSpeed();
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
    let j = getRandomInt(BOARD_SIZE);
    if (board.value[i][j] === 'snake') {
        generateApple();
    } else {
        board.value[i][j] = 'apple';
    }
}

const setDirection = (dir: direction) => {
    snakeDirection.value = dir;
}
const increaseGameSpeed = () => {
    newSpeed = newSpeed - Math.log2(newSpeed) * 8 + 50;
    snakeRefreshTime.value = newSpeed;
}

const moveSnake = (x: number, y: number) => {
    const { head, tail } = snakeDetails();
    const [i, j] = head;
    checkIllegalMove(i + y, j + x);
    if (lost.value === true) { return; }
    const next = board.value[i + y][j + x];
    const shouldRemove = !isApple(next);
    removeTail(shouldRemove, tail);
    board.value[i + y][j + x] = 'snake';
    snakeLocation.push([i + y, j + x])
}

const enablePlayAgain = () => {
    isPlayAgainDisabled.value = false;
}

const gameState = () => {
    if (lost.value === true) {
        setTimeout(enablePlayAgain, PLAY_AGAIN_TIMEOUT);
        return;
    }
    continuousMovement();
    setTimeout(gameState, snakeRefreshTime.value);
}

const appleState = () => {
    if (lost.value === true) {
        return;
    }
    generateApple();
    setTimeout(appleState, APPLE_GENERATION_TIMEOUT);
}

const continuousMovement = () => {
    const dir = snakeDirection.value;
    if (dir === 'up') {
        moveUp();
    }
    else if (dir === 'down') {
        moveDown();
    }
    else if (dir === 'left') {
        moveLeft();
    }
    else {
        moveRight();
    }
}

setTimeout(gameState, snakeRefreshTime.value);
setTimeout(appleState, FIRST_APPLE_TIMEOUT);

const replay = () => {
    location.reload();
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
            setDirection('up');
            break;
        case 'ArrowDown':
            e.preventDefault();
            setDirection('down');
            break;
        case 'ArrowLeft':
            setDirection('left');
            break;
        case 'ArrowRight':
            setDirection('right');
            break;
    }
};

const isMobile = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}

const removeCopiedIcon = () => {
    showCopied.value = false;
}

const shareResults = async () => {
    showCopied.value = true;
    let shareText = `Snake Length: ${snakeSize.value} \n`;
    for (let i=0; i<snakeSize.value; i++){
        shareText += '🟩';
    }
    setTimeout(removeCopiedIcon, PLAY_AGAIN_TIMEOUT);
    try {
        await navigator.clipboard.writeText(shareText);
    } catch ($e) {
        alert('copy failed');
    }
}

const test = () => {
    console.log(isMobile());
}
</script>


<template>
    <div class="title">
        <h1>
            Snake
        </h1>
    </div>
    <div>
        <p class="title">
            Snake Size: {{ snakeSize }}
        </p>
    </div>
    <div class="middle">
        <div class="gameArea">
            <div v-for="(row, i) in board" class="row">
                <div v-for="(col, j) in row" :class="`square ${board[i][j]}`" @click="test"></div>
            </div>
        </div>
    </div>
    <div v-if="lost" class="lost">
        <div>
            <h1>
                Game Over!
            </h1>
            <div class="again">
                <button @click="replay" class="button" :class="{ greyedOut: isPlayAgainDisabled }" :disabled="isPlayAgainDisabled">
                    Play Again
                </button>
            </div>
            <div class="again" @click="shareResults">
                <p>Share</p>
                <div class="checkMark" v-if="showCopied">
                    <DoneCheckmark />
                    <div class="copied">
                        <p> copied</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="keys" v-else-if="!lost">
        <div class="up arr" @click="setDirection('up')"><i class="fa fa-arrow-up"></i></div>
        <br />
        <div class="left arr" @click="setDirection('left')"><i class="fa fa-arrow-left"></i></div>
        <div class="down arr" @click="setDirection('down')"><i class="fa fa-arrow-down"></i></div>
        <div class="right arr" @click="setDirection('right')"><i class="fa fa-arrow-right"></i></div>
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    </div>
</template>


<style>
@import url(https://fonts.googleapis.com/css?family=Lato:300);

.keys {
    font-family: 'Lato', sans-serif;
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
    transition: all .05s linear;
}

.arr:active {
    border-bottom: 8px solid darken(grey, 20);
    text-shadow: 0 0 10px white, 0 0 10px white, 0 0 20px white;
    transform: translate(0, 2px);
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

.copied{
    position: relative;
    top: -30px;
    color: black;
}

.checkMark {
    transform: scale(.65);
    height:50px;
    position: absolute;
    padding-left: 6em;
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

.greyedOut {
    background-color: lightGrey;
}

.again {
    display: flex;
    align-items: center;
    justify-content: center;
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
    height: 20px;
    display: flex;
}

.snake {
    background-color: green;
}

.apple {
    background-color: red;
}

.gameArea {
    background-color: lightgray;
   
}
</style>