<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ count }}</h1>

  <button type="button" @click="count++">increase frame</button>
</template>

