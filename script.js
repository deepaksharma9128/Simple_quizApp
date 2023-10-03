const questions = [
    {
        question: "what is the smallest unit of data in a computer?",
        answers: [
            { text: "Gigabyte", correct: false },
            { text: "byte", correct: false },
            { text: "bit", correct: true },
            { text: "terabyte", correct: false },
        ]
    },
    {
        question: "which of the following is NOT an anti-virus software?",
        answers: [
            { text: "Avast", correct: false },
            { text: "Linux", correct: true },
            { text: "Norton", correct: false },
            { text: "kaspersky", correct: false },
        ]
    },
    {
        question: "which unit of computer is considered as the brain of the computer?",
        answers: [
            { text: "memory unit", correct: false },
            { text: "CPU", correct: true },
            { text: "input unit", correct: false },
            { text: "output unit", correct: false },
        ]
    },
    {
        question: "what is the full form of PROM?",
        answers: [
            { text: "program read-only memory", correct: false },
            { text: "primary read-only memory", correct: false },
            { text: "programmable read-only memory", correct: true },
            { text: "program read-output memory", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
        question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
startQuiz();
