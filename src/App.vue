<template>
  <div id="super_container">
    <div class="container">
      <div
        class="item"
        v-for="(item, index) in board"
        :key="index"
        :style="{ visibility: item === 0 ? 'hidden' : 'visible' }"
        @click="handleClick(index)"
      >
        <span>{{ item }}</span>
      </div>
    </div>
    <div class="finished" v-if="finished">
      <h1>用时: {{ finishedData[1] }}s</h1>
      <img
        :src="`https://qr.wd-api.com/?data=${finishedData[0]}&white`"
      /><br />
      <h2 style="padding-bottom: 1em;">复制下方文本框内容</h2>
      <input readonly :value="finishedData[0]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Game, { toPoint } from "./game";
import { onMounted, ref } from "vue";
const game = new Game();

const board = ref<number[]>([]);
let finished = ref(false);
let finishedData = ref(["", 0]);

const handleClick = (index: number) => {
  if (finished.value) {
    return;
  }
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
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  border: 1px solid;
  border-color: black;
  user-select: none;
  line-height: 2;
  padding-bottom: 100%;
}
.item > span {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 1.2em;
}
.container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  grid-gap: 3px;
  margin: 0px auto;
}
.finished {
  margin-top: 20px;
  text-align: center;
}
.finished > h1 {
  font-size: 2em;
}
#super_container {
  font-family: 'Rubik', sans-serif;
  padding: 20px
}
</style>
