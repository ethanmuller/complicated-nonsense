<script setup>
import { ref } from 'vue'

const importantValue = ref(window.localStorage.getItem("important-value-in-storage") || 0)

function setImportantValue(value) {
	window.localStorage.setItem("important-value-in-storage", value)
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
  
  <input type="range" min="0" max="1" step="0.0001" :value="importantValue" @input="setImportantValue($event.target.value)" />
</template>

