<template>
  <div>
    <div class="container">
      <div
        class="item"
        v-for="(item, index) in board"
        :key="index"
        :style="{ visibility: item === 0 ? 'hidden' : 'visible' }"
        @click="handleClick(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="finished" v-if="finished">
      <h1>用时: {{ finishedData[1] }}s</h1>
      <img :src="`https://qr.wd-api.com/?data=${finishedData[0]}`" /><br/>
      <h2 style="padding-bottom: 1em;">复制下方文本框内容</h2>
      <input readonly :value="finishedData[0]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Game, { toPoint } from "./game";
import { onMounted, ref } from "vue";
const game = new Game();

const board = ref<number[]>(null);
let finished = ref(false);
let finishedData = ref(null);

const handleClick = (index) => {
  game.step(toPoint(index));
  updateBoard();
};

const updateBoard = () => {
  // @ts-ignore
  board.value = game.board.flat();
  if (game.finished()) {
    finishedData.value = game.generate();
    finished.value = true;
  }
};

onMounted(() => {
  updateBoard();
});
</script>

<style scoped>
.item {
  display: flex;
  justify-content: center;
  align-content: center;
  border: 1px solid;
  border-color: black;
  border-radius: 4px;
  user-select: none;
  width: 30px;
  height: 30px;
}
.container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  grid-gap: 10px;
  margin: 0px auto;
  height: 400px;
  width: 400px;
}
.finished {
  text-align: center;
}
.finished > h1 {
  font-size: 2em;
}
</style>
