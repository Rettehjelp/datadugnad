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
    <div class="mt-2"  v-for="(validation, index) in props.validations" :key="index">
      <div v-if="validation" >
        <p> {{ validation.question }}</p>
        <p> {{ validation.answer }}</p>
      </div>
      <button class=" py-2 px-4 rounded-full" @click="setValidation(index, true)">OK</button>
      <button class=" py-2 px-4 rounded-full" @click="setValidation(index, false)">Feil</button>
    </div>
    <hr/>
    <button class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="submitValidations">Send inn</button>
  </div>
</template>

<style scoped>
/* Add styling as needed */
</style>
