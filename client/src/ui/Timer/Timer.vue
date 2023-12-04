<script setup>
import { ref, computed } from 'vue'
const count = ref(0);
const minutes =  ref(25);
const seconds = ref(0);
const displayValue = computed(() => {
  let time = minutes.value * 60 + seconds.value;
  let timeToDisplay = time / 60;
  let minuteToDisplay = parseInt(timeToDisplay);
  let secondToDisplay = Math.round((time - minutes.value) * 60);
  return minuteToDisplay+":"+secondToDisplay; 
})
</script>

<template>
  <div class="card">
    <h1>Timer</h1>
    {{ minutes }}:{{ seconds }}
    {{ displayValue }}
  </div>
</template>

<style scoped>
h1{color: red;}
</style>
