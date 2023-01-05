let question = document.querySelector('#question');
let choices = Array.from(document.querySelectorAll('.choice-text'));
let container = document.querySelector('.container')
let timerText = document.querySelector('#timer');
let score = 0;
let timer = 60;
let currentQuestionIndex = 0;
  let AnswerMessage = document.querySelector(
    "#incorrect"
  );
  let initialsInput = document.querySelector('#initials');
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
    choice3: "for (i = 1 to 5)",
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

// hide the input box and submit button initially
document.querySelector('#initials').style.display = 'none';
document.querySelector('.end-quiz').style.display = 'none';

// define a function to show the input box and submit button
function showInput() {
  document.querySelector('#initials').style.display = 'block';
  document.querySelector('.end-quiz').style.display = 'block';
}

let timerInterval;

function startTimer() {
  // set interval to update timer every second
  timerInterval = setInterval(function () {
    timer--;
    timerText.textContent = "Timer: " + timer;

    if (timer === 0) {
      clearInterval(timerInterval);
      // show an alert saying "Time is up!" 
      alert("Time is up!");

      let finalScore = (score / questions.length) * 100;
      let results = document.querySelector("#results");
      results.innerHTML = `Quiz is over! Your score is ${finalScore}%`;
      container.style.display = "none";
      // show the input box and submit button when game is over or timer is up
      document.querySelector("#initials").style.display = "block";
      document.querySelector(".end-quiz").style.display = "block";
    }
  }, 1000);
}

startTimer();
renderQuestion();
 
function renderQuestion() {
  if (currentQuestionIndex >= questions.length) {
    // quiz is over, calculate and display final score
  let finalScore = (score / questions.length) * 100;
    let results = document.querySelector('#results');
    results.innerHTML = `Quiz is over!`;
    results.innerHTML += `<br> Your score is ${finalScore}%`;
    container.style.display = "none";
    // show the input box and submit button
    showInput();

    // stop timer
    clearInterval(timerInterval);
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
      // answer is correct, increment score and display "Correct!" message
      score++;
      AnswerMessage.innerHTML = "Correct!";
    } else {
      // answer is incorrect, decrease timer and display "Incorrect answer! 10 seconds have been deducted" message
      timer -= 10;
      AnswerMessage.innerHTML =
        "Incorrect answer! 10 seconds have been deducted";
    }
    // add a delay before rendering the next question
    setTimeout(function () {
      // clear the message before rendering the next question
      AnswerMessage.innerHTML = "";
      currentQuestionIndex++;
      renderQuestion();
    }, 1000); 
  });
});

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