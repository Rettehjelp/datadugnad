<script setup lang="ts">
// import { computed } from 'vue';

const props = defineProps({
  name: String,
  description: String,
  progress: Array
});

// Progress calculation (e.g., as a percentage)
// const progressPercentage = computed(() => {
//   // Assuming a total of 9 steps (3 questions, 3 answers, 3 validations)
//   const totalSteps = 9;
//   const completedSteps = props.progress.length;
//   return (completedSteps / totalSteps) * 100;
// });
</script>

<template>
  <div>
    <p class="text-2xl">{{ props.name }}</p>
    <p class="text-xs">{{ props.description }}</p>
    <!-- <p>Progress: {{ progressPercentage }}%</p> -->
  </div>
</template>

<style scoped>
/* Add styling here */
</style>
