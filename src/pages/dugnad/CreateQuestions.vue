<script setup lang="ts">
import { ref} from 'vue';

const props = defineProps({
  answers: Array
});

const questions = ref(props.answers?.map(() => '') || []);  // Initialize a questions array based on the answers
const emits = defineEmits(['submitQuestions']);

const submitQuestions = () => {
  if (props.answers){
  const results = props.answers.map((answer, index) => ({
    answer: answer,
    question: questions.value[index]
  }));
  emits('submitQuestions', results);
}
};
</script>

<template>
  <div>
    <div  v-for="(answer, index) in props.answers" :key="index">
      <div class="mt-3">
              <!-- <label  class="form-label">Spørsmål {{(index + 1)}}</label> -->
              <input  v-model="questions[index]" type="text" class="form-control" required :placeholder="'Spørsmål ' + (index + 1)">
              <!-- <div class="invalid-feedback">
                Valid first name is required.
              </div> -->
              <p  class="form-label">Svar {{ index + 1 }}: {{ answer }}</p>
          </div>

    </div>
    <hr/>
    <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="submitQuestions">Neste</button>
  </div>
</template>

<style scoped>
/* Add styling as needed */
</style>
