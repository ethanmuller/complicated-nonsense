<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'

defineProps({
  msg: String,
})

let intervalId
onBeforeMount(() => {
	intervalId = setInterval(() => {
	}, 800)
});

onBeforeUnmount(() => {
	clearInterval(intervalId)
});

function clear() {
	clearInterval(intervalId)
}

const count = ref(0)
const checked = ref(false)
const msBetweenFrames = ref(150)
const last = ref(0)


function step(timestamp) {
	if (timestamp - last.value > (1 - msBetweenFrames.value)*1000) {
		if (checked.value) {
			count.value++
			last.value = timestamp
		}
	}
	window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)

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
  <h1>{{ count }}</h1>
  
  <div>
	  <label>
		  <input type="checkbox" v-model="checked" />
		  Animate
	  </label>
  </div>


  <div style="padding-top: 1.5rem">
	  <button v-if="!checked" type="button" @click="count++">increase frame</button>
	  <label v-if="checked">
		  <div>
			  <span>Speed</span>
			  <span>{{msBetweenFrames}}</span>
		  </div>
		  <input type="range" min="0" max="1" step="0.0001" :value="msBetweenFrames" @input="msBetweenFrames = $event.target.value" />
	  </label>
  </div>
</template>

