let quiz = document.getElementById("quiz");
let question = document.getElementById("question");
let timer = document.getElementById("timer");
let score = 0
let questionTime = 60;

let questions = [
  {
    question: "Which is correct based on the following array: [apples, bananas, pears, lemon",
    choices: [
      "apples[1]",
      "lemon[4]",
      "bananas[1]",
      "pears[3]",
    ],
    correct: "banans[1]",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: [
      "<script>",
      "<javascript>",
      "<scripting>",
      "<js>",
    ],
    correct: "<script>",
  },
  {
    question: "Question3",
    choices: [
      "text",
      "Hyper",
      "Home",
      "Hi",
    ],
    correct: "text",
  },
  {
    question: "Question4",
    choices: [
      "bye",
      "Hi",
      "Hello",
      "cry",
    ],
    correct: "cry",
  },
];

// create timer for game
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    questionTime--;
    timer.innerHTML = "Timer: " + questionTime;

    if (questionTime === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }
  }, 1000);
}

let startButton = document.getElementById("start-button");
startButton.addEventListener("click", setTime);

function sendMessage() {
  timer.textContent = "Times up!";
  // Add additional code here to handle what should happen when the time runs out
}



let lastQuestionIndex = questions.length - 1;
let currentQuestionIndex = 0;
renderQuestion();
currentQuestionIndex++;
renderQuestion();

function renderQuestion() {
  let q = questions[currentQuestionIndex];
  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
}

function checkAnswer() {
// need to add code to check if the answer is correct
// if it isn't, a message will display it is wrong
// if it is, a message will display it is correct and store that to current score in a percent form
}
