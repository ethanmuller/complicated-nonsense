<script setup>
import { ref } from 'vue'

const importantValue = ref(0)

navigator.requestMIDIAccess().then((access) => {
  // listening to ALL midi messages from ALL devices, which is almost definitely not what you want
  access.inputs.forEach(input => {
    input.onmidimessage = (message) => {
    console.log(message.data)
      setImportantValue(message.data[2])
    }
  })
}).catch((err) => console.error('error with midi access'))

function setImportantValue(value) {
	importantValue.value = value
}

</script>

<style>
label {
	text-align: left;
}

label span {
	display: block;
}
label div {
	display: flex;
	justify-content: space-between;
}
</style>

<template>
  <h1>{{ importantValue }}</h1>
  
  <input type="range" min="0" max="127" step="1" :value="importantValue" @input="setImportantValue($event.target.value)" />
</template>

