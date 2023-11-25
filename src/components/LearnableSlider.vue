<script setup>
import { ref } from 'vue'
import Slider from '../Slider.js'

defineProps({
  slider: Slider,
})

function messageIsCC(message) {
  const type = message.data[0]
  return (type >= 176 && type < 192)
}

</script>

<style>
.learn-btn {
  font-size: 0.6rem;
  padding: 0.5rem;
  vertical-align: middle;
  width: 3.2rem;
  height: 2rem;
}
.slider {
  vertical-align: middle;
  height: 5rem;
}

.x {
  padding: 0.2rem;
  background: transparent;
  width: auto;
  opacity: 0.4;
  transition: all 0.2s;
}

.x:hover {
  opacity: 1;
}

.learning {
  background: red;
  color: white;
}

.label {
  font-size: 1.2rem;
  font-weight: bold;
  width: 5rem;
  text-align: left;
}

.shell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-align: left;
}
.group {
  display: flex;
  flex-direction: column;
}
.cc {
  width: 5rem;
}
</style>

<template>
  <div class="shell">
    <input type="range" min="0" max="1" step="0.0001" :value="slider.value" @input="$emit('update', slider, parseFloat($event.target.value, 10))" orient="vertical" class="slider" />
    <div class="group">
      <div class="label" :style="{ opacity: slider.value * 0.5 + 0.5 }">{{ slider.value.toFixed(2) }}</div>
      <div class="cc">
        <button @click="$emit('learn', slider)" :class="[slider.isLearning ? 'learning' : '', 'learn-btn']">{{slider.cc ? 'CC' : '⏺'}}{{slider.cc}}</button>
        <button v-if="slider.cc" @click="$emit('clear', slider)" class="x">&times;</button>
      </div>
    </div>
  </div>
</template>

