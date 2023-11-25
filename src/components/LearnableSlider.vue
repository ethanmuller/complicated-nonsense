<script setup>
import { ref } from 'vue'

defineProps({
  value: Number,
  CC: Number,
  learning: Boolean,
})

const midiAccess = ref(false)

const aLearn = ref(false)
const aCC = ref()

function messageIsCC(message) {
  const type = message.data[0]
  return (type >= 176 && type < 192)
}

navigator.requestMIDIAccess().then((access) => {
  midiAccess.value = access
  midiAccess.value.inputs.forEach((i) => {
    i.onmidimessage = function(message) {
      if (messageIsCC(message)) {
        if (aLearn.value) {
          aCC.value = message.data[1]
          aLearn.value = false
        }
        if (aCC.value === message.data[1]) {
          a.value = message.data[2] / 127
        }
      }
    }
  })
}).catch((err) => console.error(err))

</script>

<style>
.learning {
  background: red;
  color: white;
}
</style>

<template>
    <div class="label">{{ a }}</div>
    <button @click="aLearn = !aLearn; aCC = null" :class="aLearn ? 'learning' : ''">⏺ {{aCC}}</button>
    <input type="range" min="0" max="1" step="0.0001" :value="a" @input="a = $event.target.value" />
</template>

