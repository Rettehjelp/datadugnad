<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  questions: Array
});

const answers = ref(props.questions?.map(() => '') || []);  // Initialize an answers array based on the questions
const emits = defineEmits(['submitAnswers']);

const submitAnswers = () => {
  if (props.questions ){
  const results = props.questions.map((question, index) => ({
    question: question,
    answer: answers.value[index]
  }));
  emits('submitAnswers', results);
}
};
</script>

<template>
  <div>
    <div  v-for="(question, index) in props.questions" :key="index">

      <div class="mt-3">
              <label for="firstName" class="block">{{ question }}</label>
              <input v-model="answers[index]" type="text" class="form-control" required :placeholder="'Answer ' + (index + 1)">
              <!-- <div class="invalid-feedback">
                Valid first name is required.
              </div> -->
          </div>
      
    </div>
    <hr/>
    <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="submitAnswers">Neste</button>
  </div>
</template>

<style scoped>
/* Add styling as needed */
</style>
