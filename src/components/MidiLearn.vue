<script setup>
import { ref } from 'vue'

const a = ref(0)
const aLearn = ref(false)
const aCC = ref()
const b = ref(0)
const bLearn = ref(false)
const bCC = ref()
const c = ref(0)
const cLearn = ref(false)
const cCC = ref()

const midiAccess = ref(false)


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
        if (bLearn.value) {
          bCC.value = message.data[1]
          bLearn.value = false
        }
        if (bCC.value === message.data[1]) {
          b.value = message.data[2] / 127
        }
        if (cLearn.value) {
          cCC.value = message.data[1]
          cLearn.value = false
        }
        if (cCC.value === message.data[1]) {
          c.value = message.data[2] / 127
        }
      }
    }
  })
}).catch((err) => console.error(err))

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
    <div>
      <div class="label">{{ a }}</div>
      <button @click="aLearn = !aLearn; aCC = null" :class="aLearn ? 'learning' : ''">⏺ {{aCC}}</button>
      <input type="range" min="0" max="1" step="0.0001" :value="a" @input="a = $event.target.value" />
    </div>
    <div>
      <div class="label">{{ b }}</div>
      <button @click="bLearn = !bLearn; bCC = null" :class="bLearn ? 'learning' : ''">⏺ {{bCC}}</button>
      <input type="range" min="0" max="1" step="0.0001" :value="b" @input="b = $event.target.value" />
    </div>
    <div>
      <div class="label">{{ c }}</div>
      <button @click="cLearn = !cLearn; cCC = null" :class="cLearn ? 'learning' : ''">⏺ {{cCC}}</button>
      <input type="range" min="0" max="1" step="0.0001" :value="c" @input="c = $event.target.value" />
    </div>
  </div>
</template>

