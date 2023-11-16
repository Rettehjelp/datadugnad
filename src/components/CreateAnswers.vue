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
    <div  v-for="(question, index) in props.questions" :key="index">

      <div class="col-sm-6">
              <label for="firstName" class="form-label">{{ question }}</label>
              <input v-model="answers[index]" type="text" class="form-control" required :placeholder="'Answer ' + (index + 1)">
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
          </div>
      
    </div>
    <hr/>
    <button class="btn btn-success mt-3" @click="submitAnswers">Neste</button>
  </div>
</template>

<style scoped>
/* Add styling as needed */
</style>
