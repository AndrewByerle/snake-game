import { ref, watch } from "vue";
import {
  BOARD_SIZE,
  SNAKE_INITIAL_ROW,
  SNAKE_INITIAL_COL,
  EVENT_GENERATION_TIMEOUT,
  FIRST_APPLE_TIMEOUT,
  INITIAL_SNAKE_SPEED,
} from "@/constants";

type square = "snake" | "open" | "apple";
export enum direction {
  LEFT = "left",
  RIGHT = "right",
  UP = "up",
  DOWN = "down",
}
type position = [number, number];

const emptyArray: square[] = Array(20).fill("open");

export const useSnakeGame = (boardSize: number) => {
  const board = ref<square[][]>(
    Array(20)
      .fill(null)
      .map(() => emptyArray.slice())
  );
  const snakeLocation = ref<position[]>([
    [SNAKE_INITIAL_ROW, SNAKE_INITIAL_COL],
  ]); // list of [i, j] locations where snake exists
  const snakeDirection = ref(direction.RIGHT);
  const snakeRefreshTime = ref(INITIAL_SNAKE_SPEED); // msec for snake to update
  const lost = ref(false);
  const score = ref(1);
  const isRunning = ref(false);

  const snakeDetails = () => {
    const snakeLength = snakeLocation.value.length;
    score.value = snakeLength;
    const head = snakeLocation.value[snakeLength - 1];
    const tail = snakeLocation.value[0];
    return { snakeLength, head, tail };
  };

  const isApple = (val: square) => {
    return val === "apple";
  };

  const removeTail = (tail: number[]) => {
    const [i, j] = tail;
    board.value[i][j] = "open";
    snakeLocation.value.shift();
  };

  const increaseSpeed = () => {
    snakeRefreshTime.value =
      snakeRefreshTime.value - Math.log2(snakeRefreshTime.value) * 8 + 50;
  };

  const checkIllegalMove = (row: number, col: number) => {
    if (row < 0 || col < 0 || row > BOARD_SIZE - 1 || col > BOARD_SIZE - 1) {
      console.log("illegal move!");
      lost.value = true;
      isRunning.value = false;
    } else if (board.value[row][col] === "snake") {
      console.log("illegal move!");
      lost.value = true;
      isRunning.value = false;
    }
  };

  const getRandomInt = (num: number) => {
    return Math.floor(Math.random() * num);
  };

  const generateApple = () => {
    const i = getRandomInt(BOARD_SIZE);
    const j = getRandomInt(BOARD_SIZE);
    if (board.value[i][j] === "snake") {
      generateApple();
    } else {
      board.value[i][j] = "apple";
    }
  };

  const setDirection = (dir: direction) => {
    snakeDirection.value = dir;
  };

  const moveSnake = (x: number, y: number) => {
    const { head, tail } = snakeDetails();
    const [i, j] = head;
    checkIllegalMove(i + y, j + x);
    if (lost.value === true) {
      return;
    }
    const next = board.value[i + y][j + x];
    if (isApple(next)) {
      increaseSpeed();
    } else {
      removeTail(tail);
    }
    board.value[i + y][j + x] = "snake";
    snakeLocation.value.push([i + y, j + x]);
  };

  const snakeTimer = () => {
    if (lost.value === true) {
      return;
    }
    continuousMovement();
    setTimeout(snakeTimer, snakeRefreshTime.value);
  };

  const appleTimer = () => {
    if (lost.value === true) {
      return;
    }
    generateApple();
    setTimeout(appleTimer, EVENT_GENERATION_TIMEOUT);
  };

  const continuousMovement = () => {
    switch (snakeDirection.value) {
      case "up":
        moveSnake(0, -1);
        break;
      case "right":
        moveSnake(1, 0);
        break;
      case "down":
        moveSnake(0, 1);
        break;
      case "left":
        moveSnake(-1, 0);
        break;
    }
  };

  const startGame = () => {
    resetGame();
    setTimeout(snakeTimer, snakeRefreshTime.value);
    setTimeout(appleTimer, FIRST_APPLE_TIMEOUT);
  };

  const resetGame = () => {
    snakeRefreshTime.value = INITIAL_SNAKE_SPEED; // msec for snake to update
    isRunning.value = true;
    lost.value = false;
    snakeDirection.value = direction.RIGHT;
    snakeLocation.value = [];
    board.value = Array(20)
      .fill(null)
      .map(() => emptyArray.slice());
    // Setup initial snake location
    board.value[SNAKE_INITIAL_ROW][SNAKE_INITIAL_COL] = "snake";
    snakeLocation.value = [[SNAKE_INITIAL_ROW, SNAKE_INITIAL_COL]];
  };

  return { board, lost, score, isRunning, setDirection, startGame };
};
