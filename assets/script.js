let question = document.querySelector('#question');
let choices = Array.from(document.querySelectorAll('.choice-text'));
let container = document.querySelector('.container')
let timerText = document.querySelector("#timer");
let score = 0;
let timer = 60;
let currentQuestionIndex = 0;
  let AnswerMessage = document.querySelector(
    "#incorrect"
  );
  let initialsInput = document.querySelector("#initials");
  let Submit = document.querySelector('.end-quiz');
  
let questions = [
  {
    question: "When do you use ===?",
    choice1: "Not equal in value",
    choice2: "Equal in value and type",
    choice3: "Equal in type",
    choice4: "Not equal in value or type",
    answer: 2,
  },
  {
    question: "How do you write 'Hello World' in the alert box?",
    choice1: "alert('Hello World')",
    choice2: "alertMsg('Hello World)",
    choice3: "msg('Hello World')",
    choice4: "msgAlert('Hello World')",
    answer: 1,
  },
  {
    question: "How does a FOR loop start?",
    choice1: "for (i <=2; i++)",
    choice2: "for (i = 0; i <= 2, i++)",
    choice3: "for i = 1 to 5)",
    choice4: "for (i = 0; i <=5)",
    answer: 2,
  },
  {
    question: "What is the correct way to write a class in CSS",
    choice1: ".conatiner {}",
    choice2: "#container {}",
    choice3: "container {}",
    choice4: "=container {}",
    answer: 1,
  }
];


function startTimer() {
  // set interval to update timer every second
  let timerInterval = setInterval(function () {
    timer--;
     timerText.textContent = "Timer: " + timer;

    if (timer === 0) {
      clearInterval(timerInterval);
      // add code here to handle what should happen when the timer reaches 0
    }
  }, 1000);
}

startTimer();
renderQuestion();
 
function renderQuestion() {
  if (currentQuestionIndex >= questions.length) {
    // quiz is over, calculate and display final score
  let finalScore = (score / questions.length) * 100;
    let results = document.querySelector("#results");
    results.innerHTML = `Quiz is over!`;
    results.innerHTML += `<br> Your score is ${finalScore}%`;
    container.style.display = "none";
  } else {
    let currentQuestion = questions[currentQuestionIndex];
    question.innerHTML = currentQuestion.question;
    choices.forEach((choice) => {
      choice.parentElement.style.display = "block";
      choice.innerHTML = currentQuestion[`choice${choice.dataset.number}`];
    });
  }
}

choices.forEach((choice) => {
  choice.addEventListener("click", function () {
    let choiceNumber = parseInt(this.dataset.number, 10);
    if (choiceNumber === questions[currentQuestionIndex].answer) {
      // answer is correct, increment score and currentQuestionIndex, and render next question
      score++;
      currentQuestionIndex++;
      AnswerMessage.innerHTML =
        "Correct!";
      renderQuestion();
    } else {
      // answer is incorrect, decrease timer and display message to user
      timer -= 10; 
      AnswerMessage.innerHTML =
        "Incorrect answer! 10 seconds have been subtracted from your timer.";
      currentQuestionIndex++; // move on to the next question
      renderQuestion(); // re-render the quiz
    }
  });
});

// when i submit my initials it will bring me to the high score html and display my high score. 
// I can clear the high scores 
// the high scores will stay and can be accessed from the welcome page if i dont clear them


let SubmitInitials = document.createElement("button");
SubmitInitials.setAttribute("type", "Submit");
SubmitInitials.setAttribute("id", "Submit");
SubmitInitials.textContent = "Submit";

Submit.appendChild(SubmitInitials); 

SubmitInitials.addEventListener("click", function () {
  let initials = initialsInput.value;
  if (initials === null || initials === "") {
    alert("Enter initials!");
  } else {
    // Save the initials and score to local storage
    let finalScore = (score / questions.length) * 100;
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: initials, score: finalScore });
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Redirect to the high scores page
    window.location.href = "./highscore.html";
  }
});