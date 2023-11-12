<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'

defineProps({
  msg: String,
})

let intervalId
onBeforeMount(() => {
	intervalId = setInterval(() => {
	if (checked.value) {
		count.value++
	}
	}, 500)
});

onBeforeUnmount(() => {
	clearInterval(intervalId)
});

const count = ref(0)
const checked = ref(false)

</script>

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
  </div>
</template>

