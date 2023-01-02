let scoreList = document.querySelector('.high-score-list');
let clearScores = document.querySelector('#clearBtn');

let highScores = localStorage.getItem("highScores");
highScores = JSON.parse(highScores);

if (highScores !== null) {
    for (let i = 0; i < highScores.length; i++) {
        let createLi = document.createElement("li");
        createLi.textContent = highScores[i].initials + " " + highScores[i].score;
        scoreList.appendChild(createLi)
    }
}

//clear scores

clearScores.addEventListener("click", function(){
    if (confirm("Are you sure you want to clear the high scores?")) {
      localStorage.clear();
      location.reload();
    }
})