/*-------------- Constants -------------*/
const questions = {
    easy: [
        {
            question: "How many hours are there in a day?",
            answers: ["A) 12", "B) 24", "C) 36"],
            correct: "B) 24"
        },
        {
            question: "What is 15 minutes past 3 o'clock called?",
            answers: ["A) Quarter past three", "B) Half past three", "C) Quarter to four"],
            correct: "A) Quarter past three"
        },
        {
            question: "How many seconds are there in 5 minutes?",
            answers: ["A) 120 seconds", "B) 240 seconds", "C) 300 seconds"],
            correct: "C) 300 seconds"
        }
    ],
    medium: [
        {
            question: "What time is it if the hour hand is on 5 and the minute hand is on 9?",
            answers: ["A) 5:45", "B) 5:50", "C) 5:55"],
            correct: "A) 5:45"
        },
        {
            question: "What is 45 minutes before 8:00 PM?",
            answers: ["A) 7:15 PM", "B) 7:30 PM", "C) 7:45 PM"],
            correct: "A) 7:15 PM"
        },
        {
            question: "If the minute hand points to 4, how many minutes past the hour is it?",
            answers: ["A) 20 minutes", "B) 25 minutes", "C) 30 minutes"],
            correct: "A) 20 minutes"
        }
    ],
    hard: [
        {
            question: "A clock is set correctly at 6:00 AM. If it loses 2 minutes every hour, what time will it show after 8 hours?",
            answers: ["A) 9:44 AM", "B) 9:52 AM", "C) 10:00 AM"],
            correct: "A) 9:44 AM"
        },
        {
            question: "If it is currently 3:30, what time will it be in 1 hour and 50 minutes?",
            answers: ["A) 5:10", "B) 5:20", "C) 5:30"],
            correct: "B) 5:20"
        },
        {
            question: "A clock gains 15 minutes every 3 hours. How much will it gain in a full day (24 hours)?",
            answers: ["A) 100 minutes", "B) 120 minutes", "C) 150 minutes"],
            correct: "B) 120 minutes"
        }
    ]
};
const timelimit = 15;

/*---------- Variables (state) ---------*/
let currentQuestionIndex = 0;
let score = 0;
let lastSelectedLevel = 'easy'; 

let timer; 
let timeLeft; 

/*----- Cached Element References  -----*/
const feedbackElement = document.getElementById('feedback');
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer-btn');
const tryAgainButton = document.getElementById('try-again-btn');
const timeLeftElement = document.getElementById('time-left');

/*-------------- Functions -------------*/
function displayQuestion(level) {
    score = 0; 
    currentQuestionIndex = 0; 
    feedbackElement.innerText = ''; 
    document.getElementById('quiz-section').style.display = 'block';
    tryAgainButton.style.display = 'none';

    timeLeft = timelimit; 
    counntDowntTimer(); 

    showQuestion(level);
}



function counntDowntTimer() {
    timeLeft = timelimit; 
    timeLeftElement.innerText = timeLeft; 

    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.innerText = timeLeft;

        
        if (timeLeft <= 0) {
            clearInterval(timer); 
            feedbackElement.innerText = "Time's up!";
            
            questionElement.style.display = 'none';
            answerButtons.forEach(btn => btn.style.display = 'none');
            
            currentQuestionIndex++;
            if (currentQuestionIndex < questions[lastSelectedLevel].length) {

                setTimeout(() => showQuestion(lastSelectedLevel), 1000);
            } else {
                endQuiz(lastSelectedLevel);
                clearInterval(timer);

            }
        }
    }, 1000);
}




function showQuestion(level) {
    clearInterval(timer);   
    questionElement.style.display = 'block';
    answerButtons.forEach(btn => btn.style.display = 'inline-block'); 
  
   const currentQuestion = questions[level][currentQuestionIndex];

    questionElement.innerText = currentQuestion.question;

    answerButtons.forEach((button, index) => {
        button.innerText = currentQuestion.answers[index];
        button.disabled = false; 
        button.onclick = () => checkAnswer(level, button);
    });
    counntDowntTimer(); 
    feedbackElement.innerText = ``;

}

function checkAnswer(level, button) {
    const currentQuestion = questions[level][currentQuestionIndex];
    answerButtons.forEach(btn => btn.disabled = true); 

    if (button.innerText === currentQuestion.correct) {
        feedbackElement.innerText = "Correct!";
        score++;
    } else {
        feedbackElement.innerText = `Wrong!`;

    } 
    currentQuestionIndex++;
    if (currentQuestionIndex < questions[level].length) {
        setTimeout(() => showQuestion(level), 1000);
    } else {
        endQuiz(level); 
        clearInterval(timer);

    }

}

function endQuiz(level) {
    document.getElementById('quiz-section').style.display = 'none'; 
    clearInterval(timer);

    feedbackElement.innerText = `Your score: ${score}/3`; //${questions[level].length

    if (score >= 2) {
        feedbackElement.innerText += " You've completed this level! You Win!";
    } else {
        feedbackElement.innerText += " You Failed!";
    }
    
    tryAgainButton.style.display = 'block';
 
}

/*----------- Event Listeners ----------*/
document.getElementById('easy-btn').addEventListener('click', () => {
    lastSelectedLevel = 'easy';
    displayQuestion('easy');
});
document.getElementById('medium-btn').addEventListener('click', () => {
    lastSelectedLevel = 'medium';
    displayQuestion('medium');
});
document.getElementById('hard-btn').addEventListener('click', () => {
    lastSelectedLevel = 'hard';
    displayQuestion('hard');
});

tryAgainButton.addEventListener('click', () => {
    feedbackElement.innerText = ''; 
    tryAgainButton.style.display = 'none'; 
    document.getElementById('quiz-section').style.display = 'none'; 
    displayQuestion(lastSelectedLevel); 
});
