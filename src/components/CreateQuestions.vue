<script setup lang="ts">
import { ref} from 'vue';

const props = defineProps({
  answers: Array
});

const questions = ref(props.answers.map(() => ''));  // Initialize a questions array based on the answers
const emits = defineEmits(['submitQuestions']);

const submitQuestions = () => {
  const results = props.answers.map((answer, index) => ({
    answer: answer,
    question: questions.value[index]
  }));
  emits('submitQuestions', results);
};
</script>

<template>
  <div>
    <div v-for="(answer, index) in props.answers" :key="index">
      <input v-model="questions[index]" type="text" :placeholder="'Spørsmål ... ' + (index + 1)">
      <p>Svar: {{ index + 1 }}: {{ answer }}</p>
    </div>
    <button @click="submitQuestions">Next</button>
  </div>
</template>

<style scoped>
/* Add styling as needed */
</style>
