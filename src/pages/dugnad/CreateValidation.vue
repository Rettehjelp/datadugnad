<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  validations: Array<any>
});

const validationResults = ref(props.validations?.map(() => null) ?? []); // null, true, or false for each validation
const emits = defineEmits(['submitValidations']);

const setValidation = (index:any, result:any) => {
  validationResults.value[index] = result;
};

const submitValidations = () => {
  if (props.validations) {
  const results = props.validations.map((validation, index) => ({
    ...validation,
    validation: validationResults.value[index]
  }));
  emits('submitValidations', results);
}
};
</script>

<template>
  <div>
    <div  v-for="(validation, index) in props.validations" :key="index">
      <div v-if="validation" >
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
