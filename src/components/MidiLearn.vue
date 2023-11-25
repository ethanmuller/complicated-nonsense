<script setup>
import { ref, reactive, watch } from 'vue'
import LearnableSlider from './LearnableSlider.vue'
import Slider from '../Slider.js'

const first = reactive(new Slider(0.5, false, 'CC-A'))
const second = reactive(new Slider(0.5, false, 'CC-B'))
const third = reactive(new Slider(0.5, false, 'CC-C'))
const fourth = reactive(new Slider(0.5, false, 'CC-D'))
const fifth = reactive(new Slider(0.5, false, 'CC-E'))
const sixth = reactive(new Slider(0.5, false, 'CC-F'))

const all = [first, second, third, fourth, fifth, sixth]

all.forEach(slider => {
  watch(() => slider.cc, (newCC, oldCC) => {
      if (newCC !== oldCC) {
        window.localStorage.setItem(slider.storageKey, newCC)
      }
  })
})

function messageIsCC(message) {
  const type = message.data[0]
  return (type >= 176 && type < 192)
}

function handleMIDIMessage(message) {
  if (messageIsCC(message)) {
    all.forEach(slider => {
      if (slider.isLearning) {
        slider.cc = message.data[1]
        slider.isLearning = false
      }
      if (slider.cc === message.data[1]) {
        slider.value = message.data[2] / 127
      }
    })
  }
}

navigator.requestMIDIAccess().then((access) => {
  access.inputs.forEach((i) => {
    i.onmidimessage = handleMIDIMessage
  })
}).catch((err) => console.error(err))

function handleUpdate(slider, value) {
  slider.value = value
}

function handleLearn(slider) {
  slider.isLearning = !slider.isLearning

  if (slider.isLearning) {
    slider.cc = null
  }
}

function handleClear(slider) {
  slider.cc = null
}
</script>

<style>
.grid {
  display: grid;
  grid-gap: 3em;
  grid-template-columns: 1fr 1fr 1fr;
}
.label {
}

.learning {
  background: red;
  color: white;
}
</style>

<template>
  <div class="grid">
    <LearnableSlider :slider="first" @update="handleUpdate" @learn="handleLearn" @clear="handleClear" />
    <LearnableSlider :slider="second" @update="handleUpdate" @learn="handleLearn" @clear="handleClear" />
    <LearnableSlider :slider="third" @update="handleUpdate" @learn="handleLearn" @clear="handleClear" />
    <LearnableSlider :slider="fourth" @update="handleUpdate" @learn="handleLearn" @clear="handleClear" />
    <LearnableSlider :slider="fifth" @update="handleUpdate" @learn="handleLearn" @clear="handleClear" />
    <LearnableSlider :slider="sixth" @update="handleUpdate" @learn="handleLearn" @clear="handleClear" />
  </div>
</template>

