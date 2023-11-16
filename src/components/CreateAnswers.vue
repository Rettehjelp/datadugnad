<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  questions: Array
});

const answers = ref(props.questions.map(() => ''));  // Initialize an answers array based on the questions
const emits = defineEmits(['submitAnswers']);

const submitAnswers = () => {
  const results = props.questions.map((question, index) => ({
    question: question,
    answer: answers.value[index]
  }));
  emits('submitAnswers', results);
};
</script>

<template>
  <div>
    <div v-for="(question, index) in props.questions" :key="index">
      <p>Spørsmål: {{ question }}</p>
      <input v-model="answers[index]" type="text" :placeholder="'Answer ' + (index + 1)">
    </div>
    <button @click="submitAnswers">Next</button>
  </div>
</template>

<style scoped>
/* Add styling as needed */
</style>
