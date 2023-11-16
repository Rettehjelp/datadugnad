<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CreateAnswers from './components/CreateAnswers.vue';
import CreateQuestions from './components/CreateQuestions.vue';
import CreateValidation from './components/CreateValidation.vue';
import HeaderProgress from './components/HeaderProgress.vue';

// State
const data = ref<any>(null);
const currentStep = ref('questions'); // 'questions', 'answers', 'validations', 'thankYou'
const submissions = ref([]);
const randomQuestions = ref([]);
const randomAnswers = ref([]);
const randomValidations = ref([]);


// Random selection function
const selectRandomItems = (items: any[], count: number) => {
  return [...items].sort(() => 0.5 - Math.random()).slice(0, count);
};

// Data loading and preparation
onMounted(async () => {
  const response = await fetch('/input.json');
  data.value = await response.json();
  console.log('loaded', data.value);
  // Prepare initial random selections for questions, answers, and validations
  randomQuestions.value = selectRandomItems(data.value.questions, 3);
});



// Event Handlers
const handleQuestionSubmission = (answers) => {
  // Store answers and transition to the next step
  submissions.value.push(...answers);
  randomAnswers.value = selectRandomItems(data.value.answers, 3);
  currentStep.value = 'answers';
};

const handleAnswerSubmission = (questions) => {
  // Store questions and transition to the next step
  submissions.value.push(...questions);
  randomValidations.value = selectRandomItems(data.value.validations, 3);
  currentStep.value = 'validations';
};

const handleValidationSubmission = (validations) => {
  // Store validations and transition to the thank you step
  submissions.value.push(...validations);
  currentStep.value = 'thankYou';
  // Here, you can also implement the API submission logic
  
  // Post the data to the API
  postDataToAPI(submissions.value);
};

const postDataToAPI = (data) => {
    console.log('Posting data:', data);

    fetch('/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


</script>


<template>
  <div>
    <div v-if="currentStep === 'questions'">
      <HeaderProgress name="Svar på spørsmål" description="Svar på spørsmålene under" :progress="submissions"/>
      <CreateAnswers :questions="randomQuestions" @submitAnswers="handleQuestionSubmission"/>
    </div>
    <div v-else-if="currentStep === 'answers'">
      <HeaderProgress name="Lag spørsmål" description="Lag forslag til spørsmål eller tekst som passer før svaret" :progress="submissions"/>
      <CreateQuestions :answers="randomAnswers" @submitQuestions="handleAnswerSubmission"/>
    </div>
    <div v-else-if="currentStep === 'validations'">
      <HeaderProgress name="Kontroller bidrag" description="Her er et par bidrag fra andre. Om du ser noe som er feil trykker du på Feil" :progress="submissions"/>
      <CreateValidation :validations="randomValidations" @submitValidations="handleValidationSubmission"/>
    </div>
    <div v-else-if="currentStep === 'thankYou'">
      <p>Takk for at du deltok!</p>
    </div>
  </div>
</template>


<style scoped>

</style>
