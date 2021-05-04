<template>
  <div>Hello</div>
</template>

<script lang="ts">
import Game from './game'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  mounted(){
    let g = new Game()
  }
})
</script>