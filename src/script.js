let data = {};
const result = {
    answers:[],
    questions:[],
    ratings:[]
};
document.addEventListener('DOMContentLoaded', () => {
    fetchDataFromServer().then(d => {
        data = d;
        console.log('loaded', data);
        displayQuestions();
    });
});

async function fetchDataFromServer() {
    const response = await fetch('/data.json');
    return await response.json();
}

function pickRandomElements(array, count) {
    // Shuffle the array using the Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    // Slice the first 'count' elements from the shuffled array
    return array.slice(0, count);
}

function createHeader(level, title, subtitle) {
    const header = document.createElement('div');
    header.classList.add('header-section');

    const heading = document.createElement(`h${level}`);
    heading.textContent = title;
    header.appendChild(heading);

    const description = document.createElement('p');
    description.textContent = subtitle;
    header.appendChild(description);

    return header;
}


function displayQuestions() {
    const questions = pickRandomElements(data.questions, 3);
    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear existing content
    app.appendChild(createHeader(1,'Lag svar', 'Svar så godt du kan på følgende spørsmål'));

    const form = document.createElement('form');
    questions.forEach((question, index) => {
        const questionContainer = document.createElement('div');

        const questionLabel = document.createElement('label');
        questionLabel.textContent = `Question ${index + 1}: ${question}`;
        questionLabel.htmlFor = `question-${index}`;

        const questionInput = document.createElement('input');
        questionInput.type = 'text';
        questionInput.id = `question-${index}`;
        questionInput.name = `answer-${index}`;

        questionContainer.appendChild(questionLabel);
        questionContainer.appendChild(questionInput);

        form.appendChild(questionContainer);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Neste';
    form.appendChild(submitButton);

    form.onsubmit = handleFormSubmit; // Function to handle form submission
    app.appendChild(form);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const answers = [];
    for (let i = 0; event.target[`answer-${i}`]; i++) {
        answers.push(event.target[`answer-${i}`].value);
    }

    // Do something with the answers, like displaying the next step
    console.log('Collected Answers:', answers);
    result.answers = answers;
    displayAnswerCreation();
}


function displayAnswerCreation() {
    const answers = pickRandomElements(data.answers, 3);

    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear existing content

    app.appendChild(createHeader(2,'Lag spørsmål', 'Lag forslag til spørsmål som passer til svarene'));

    const form = document.createElement('form');
    answers.forEach((answer, index) => {
        const answerContainer = document.createElement('div');

        const answerLabel = document.createElement('label');
        answerLabel.textContent = `Answer ${index + 1}: ${answer}`;
        answerLabel.htmlFor = `answer-${index}`;

        const questionInput = document.createElement('input');
        questionInput.type = 'text';
        questionInput.id = `question-for-answer-${index}`;
        questionInput.name = `question-${index}`;

        answerContainer.appendChild(answerLabel);
        answerContainer.appendChild(questionInput);

        form.appendChild(answerContainer);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Neste';
    form.appendChild(submitButton);

    form.onsubmit = handleQuestionFormSubmit; // Function to handle form submission
    app.appendChild(form);
}

function handleQuestionFormSubmit(event) {
    event.preventDefault();

    const questions = [];
    for (let i = 0; event.target[`question-${i}`]; i++) {
        questions.push(event.target[`question-${i}`].value);
    }

    // Do something with the questions, like displaying the next step
    console.log('Created Questions:', questions);
    result.questions = questions;
    displayRating();
}

function displayRating() {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear existing content
    app.appendChild(createHeader(3,'Kontroller andre bidrag', 'For å sikre at det er god kvalitet på dataene ønsker vi at du sjekker at følgende spørsmål/svar er riktige, ikke er støtende, og ikke har noe bias i seg'));

    const pairs = pickRandomElements(data.pairs, 3);

    const form = document.createElement('form');
    pairs.forEach((pair, index) => {
        const pairContainer = document.createElement('div');
        pairContainer.classList.add('pair-container');

        const pairLabel = document.createElement('label');
        pairLabel.textContent = `Spørsmål: ${pair.question} - Svar: ${pair.answer}`;
        pairLabel.htmlFor = `pair-valid-${index}`;

        const pairCheckbox = document.createElement('input');
        pairCheckbox.type = 'checkbox';
        pairCheckbox.id = `pair-valid-${index}`;
        pairCheckbox.name = `pair-valid-${index}`;
        pairCheckbox.checked = pair.approved;

        pairContainer.appendChild(pairLabel);
        pairContainer.appendChild(pairCheckbox);

        form.appendChild(pairContainer);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Send inn vurderinger';
    form.appendChild(submitButton);

    form.onsubmit = handlePairRatingSubmit; // Function to handle form submission
    app.appendChild(form);
}

function handlePairRatingSubmit(event) {
    event.preventDefault();

    const ratings = [];
    for (let i = 0; event.target[`pair-valid-${i}`]; i++) {
        ratings.push({ pairIndex: i, valid: event.target[`pair-valid-${i}`].checked });
    }

    // Do something with the ratings, like sending them to the server
    console.log('Pair Ratings:', ratings);
    result.ratings = ratings;

    postDataToAPI(result);
    
    // Proceed with the next step or end the app flow
    displayThankYouMessage();
}


function displayThankYouMessage() {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear existing content

    const thankYouMessage = document.createElement('div');
    thankYouMessage.classList.add('thank-you-message');

    const heading = document.createElement('h2');
    heading.textContent = 'Takk for ditt bidrag!';

    const paragraph = document.createElement('p');
    paragraph.textContent = 'Dine svar er svært verdifulle for oss.';

    thankYouMessage.appendChild(heading);
    thankYouMessage.appendChild(paragraph);

    const submitButton = document.createElement('button');
    submitButton.type= "button";
    submitButton.textContent = 'Dette gikk greit, jeg kan lage noe til';
    submitButton.onclick =displayQuestions ;
    thankYouMessage.appendChild(submitButton);

    app.appendChild(thankYouMessage);
}



// Additional functions for other steps...

function postDataToAPI(data) {
    console.log('posting data',data);
    fetch('/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}