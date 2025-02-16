const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = 10;
let questions = [];

// Fetch questions from the Open Trivia Database API
async function fetchQuestions() {
    const response = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&type=multiple`);
    const data = await response.json();
    questions = data.results;
    startQuiz();
}

// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    nextButton.classList.add('hidden');
    showQuestion(questions[currentQuestionIndex]);
}

// Show a question
function showQuestion(question) {
    questionElement.innerHTML = decodeHtml(question.question);
    optionsElement.innerHTML = '';

    const answers = [...question.incorrect_answers, question.correct_answer];
    shuffleArray(answers);

    answers.forEach(answer => {
        const option = document.createElement('div');
        option.innerHTML = decodeHtml(answer);
        option.classList.add('option');
        option.addEventListener('click', () => selectAnswer(answer, question.correct_answer));
        optionsElement.appendChild(option);
    });
}

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Select an answer
function selectAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showScore();
    }
}

// Show the score
function showScore() {
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreElement.innerText = `${score} out of ${totalQuestions}`;
}

// Decode HTML entities
function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// Fetch questions when the page loads
fetchQuestions();


function toggleAnswer(index) {
    const answers = document.querySelectorAll(".answer");
    if (answers[index].style.display === "none" || answers[index].style.display === "") {
        answers[index].style.display = "block";
    } else {
        answers[index].style.display = "none";
    }
}





//for MATCH
let correctAnswers = [];

// Fetch Questions from Open Trivia Database API
async function fetchmatch() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=3&category=9&type=multiple');
        const data = await response.json();
        const questions = data.results;

        const questionList = document.getElementById('questions-list');
        const answerList = document.getElementById('answers-list');
        
        questions.forEach((q, index) => {
            questionList.innerHTML += `<li>${String.fromCharCode(65 + index)}. ${q.question}</li>`;
            correctAnswers.push(q.correct_answer);

            // Combine correct answer with incorrect options and shuffle
            let options = [q.correct_answer, ...q.incorrect_answers];
            options = options.sort(() => Math.random() - 0.5);

            // Create dropdown for each question
            let dropdown = `<select>
                <option value="">Select</option>`;
            options.forEach(option => {
                dropdown += `<option value="${option}">${option}</option>`;
            });

            dropdown += `</select>`;
            answerList.innerHTML += dropdown;
        });
    } catch (error) {
        console.error("Failed to fetch questions", error);
    }
}

// Check Answers
function checkAnswers() {
    const selects = document.querySelectorAll("select");
    let correct = 0;

    selects.forEach((select, index) => {
        if (select.value === correctAnswers[index]) {
            correct++;
        }
    });

    const result = document.getElementById("result");
    if (correct === correctAnswers.length) {
        result.textContent = "Congratulations! All correct!";
        result.style.color = "green";
    } else {
        result.textContent = `You got ${correct} out of ${correctAnswers.length} correct. Try again!`;
        result.style.color = "red";
    }
}

// Initialize the game
fetchmatch();