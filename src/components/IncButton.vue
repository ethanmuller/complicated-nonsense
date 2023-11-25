<script setup>
import { ref } from 'vue'


defineProps(['count'])
</script>

<style></style>

<template>
  <button @click="$emit('inc')">{{count}}</button>
  
</template>
 
