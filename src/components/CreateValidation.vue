<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  validations: Array
});

const validationResults = ref(props.validations.map(() => null)); // null, true, or false for each validation
const emits = defineEmits(['submitValidations']);

const setValidation = (index, result) => {
  validationResults.value[index] = result;
};

const submitValidations = () => {
  const results = props.validations.map((validation, index) => ({
    ...validation,
    validation: validationResults.value[index]
  }));
  emits('submitValidations', results);
};
</script>

<template>
  <div>
    <div  v-for="(validation, index) in props.validations" :key="index">
      <div >
        <p><strong>Question:</strong> {{ validation.question }}</p>
        <p><strong>Answer:</strong> {{ validation.answer }}</p>
      </div>
      <button class="btn btn-danger btn-sm" @click="setValidation(index, true)">OK</button>
      <button class="btn btn-success btn-sm" @click="setValidation(index, false)">Feil</button>
    </div>
    <hr/>
    <button class="btn btn-success" @click="submitValidations">Send inn</button>
  </div>
</template>

<style scoped>
/* Add styling as needed */
</style>
