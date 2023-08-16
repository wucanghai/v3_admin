<script lang="ts" setup>
import { ref } from 'vue'

const pageTitle = ref<string>('dashboard')
</script>

<template>
  <div>{{ pageTitle }}</div>
</template>
