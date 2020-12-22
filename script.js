// Jquerys to add variables pointing to different DOM elements
var header = document.querySelector("#title");
var content = document.querySelector("#content");
var bottom = document.querySelector("#bottom");
var timer = document.querySelector("#time");
var highScoreButton = document.querySelector(".navbar-link");


// The array of questions
var qArray = [
    { q: "Is water wet?", ans: ["yes wet", "no", "maybe", "sometimes"], corr: "yes wet" },
    { q: "Is the sky blue?", ans: ["yes blue", "no", "maybe", "sometimes"], corr: "yes blue" }, 
    { q: "Do apples fall up?", ans: ["yes up", "no", "maybe", "sometimes"], corr: "yes up" }, 
    { q: "Are squares circles?", ans: ["yes circle", "no", "maybe", "sometimes"], corr: "yes circle" },
    { q: "Is water dry?", ans: ["yes dry", "no", "maybe", "sometimes"], corr: "yes dry" } 
    ];

// An array to add questions that have already been asked to 
var usedArray = [];

// Variable holding amount of time user has left, intialized to 60
var secondsLeft = 60;

var timerInterval;

// wrong or right text at bottom of screen
var result = document.createElement("p");

// function activated when user clicks start button
function init() {
    // resets all variables to default
    qArray = [
        { q: "Is water wet?", ans: ["yes wet", "no", "maybe", "sometimes"], corr: "yes wet" },
        { q: "Is the sky blue?", ans: ["yes blue", "no", "maybe", "sometimes"], corr: "yes blue" }, 
        { q: "Do apples fall up?", ans: ["yes up", "no", "maybe", "sometimes"], corr: "yes up" }, 
        { q: "Are squares circles?", ans: ["yes circle", "no", "maybe", "sometimes"], corr: "yes circle" },
        { q: "Is water dry?", ans: ["yes dry", "no", "maybe", "sometimes"], corr: "yes dry" } 
        ];
    usedArray = [];
    secondsLeft = 60;
    result.textContent = "";
    
    // removes button from bottom section
    bottom.removeChild(bottom.children[0]);
    // adds wrong or right text to bottom section
    bottom.appendChild(result);

    // renders question
    renderQuestion();
    // ticks down time
    timerInterval = setInterval(function() {

        timer.textContent = secondsLeft;
        
        // game over scenario
        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            gameOver();
        }
        secondsLeft--;
    }, 1000);
}

// renderer function
function renderQuestion() {
    // makes a random number to choose which question
    var tempRandNum = Math.floor(Math.random()*qArray.length);
    // writes the question of the question to the header section
    header.children[0].textContent = qArray[tempRandNum].q;
    
    // removes the instructions from content section
    content.removeChild(content.children[0]);
    
    
    // creates an html list
    var qlist = document.createElement("ol");
    // creates a temporary array containing the answers to the current question
    var tempArray = qArray[tempRandNum].ans;
    // adds answers to the html list in a random order
    for (i = 0; i < 4; i++){
        // creates a random number between 0 and the number of unrendered answers
        var randNum = Math.floor(Math.random()*(4 - i));
        // creates a list item
        var qlistItem = document.createElement("li");
        // puts the answer at the index of the random number created above in the newly made list item
        qlistItem.textContent = tempArray[randNum];
        // removes the rendered answer from the temporary array
        tempArray.splice(randNum,1);
        // adds the list item to the list
        qlist.appendChild(qlistItem);
    }
    // adds the list to the content section
    content.appendChild(qlist);
    // adds the rendered question to the array containing the questions that have been used (at the beginning)
    usedArray.unshift(qArray[tempRandNum]);
    // removes the question from the remaining questions
    qArray.splice(tempRandNum, 1);
}

function renderScores() {
    timer.textContent = "00";
    header.children[0].textContent = "Highscores";
    content.removeChild(content.children[0]);
    bottom.removeChild(bottom.children[0]);
}

function gameOver() {
    header.children[0].textContent = "Enter your initials to save your highscore";
    content.removeChild(content.children[0]);
    bottom.removeChild(bottom.children[0]);

    var form = document.createElement("form");
    var input = document.createElement("input");
    var newBtn = document.createElement("button");
    input.setAttribute("type", "text");
    form.appendChild(input);
    newBtn.textContent = "Submit";
    form.appendChild(newBtn);
    content.appendChild(form);

    newBtn.addEventListener("click", function(){
        

    });
}

// detects if user selected on of the list item answers
content.addEventListener("click", function(event) {
    event.preventDefault();
    if(event.target.matches("li")){
        if(event.target.textContent == usedArray[0].corr){
            result.textContent = "Correct!";
        }
        else{
            result.textContent = "Wrong!";
            secondsLeft -= 15;
            timer.textContent = secondsLeft;
        }
        if (qArray.length == 0){
            clearInterval(timerInterval);
            gameOver();
        }

    renderQuestion();
    }
})

// detects when user clicks start button and calls init()
bottom.addEventListener("click", function(event) {
    event.preventDefault();
    if(event.target.matches("button")){
        init();
    }
})

highScoreButton.addEventListener("click", function() {
    renderScores();
})