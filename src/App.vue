<template>
  <div class="container">
    <div class="item" v-for="(item, index) in board" :key="index" :style="{visibility: item === 0 ? 'hidden' : 'visible'}" @click="handleClick(index)">
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import Game from "./game";
import { defineComponent, onMounted, ref } from "vue";
const game = new Game();

const board = ref<number[]>(null);

const handleClick = (index) => {
  console.log(index)
}

onMounted(() => {
  // @ts-ignore
  board.value = game.board.flat();
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
</style>
