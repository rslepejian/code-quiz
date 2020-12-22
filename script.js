// Jquerys to add variables pointing to different DOM elements
var header = document.querySelector("#title");
var content = document.querySelector("#content");
var bottom = document.querySelector("#bottom");
var timer = document.querySelector("#time");
var highScoreButton = document.querySelector(".navbar-link");

// making scores array var
var scoresArray = [];

// checking if there is scores in local storage, if so setting scores array to that
if (localStorage.getItem("scores")!= null){
    scoresArray = JSON.parse(localStorage.getItem("scores"));
}

// The array of questions
var qArray = [
    { q: "What day is Christmas?", ans: ["December 25th", "December 26th", "November 8th", "January 3rd"], corr: "December 25th" },
    { q: "In which of the following categories do humans fall?", ans: ["Mammals", "Reptiles", "Amphibians", "Insects"], corr: "Mammals" }, 
    { q: "A leap year occurs every ____ years.", ans: ["4", "8", "13", "7"], corr: "4" }, 
    { q: "How many days are there in 1 week?", ans: ["7", "5", "10", "13"], corr: "7" },
    { q: "Is water dry?", ans: ["no", "yes", "maybe", "sometimes"], corr: "no" } 
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
        { q: "What day is Christmas?", ans: ["December 25th", "December 26th", "November 8th", "January 3rd"], corr: "December 25th" },
        { q: "In which of the following categories do humans fall?", ans: ["Mammals", "Reptiles", "Amphibians", "Insects"], corr: "Mammals" }, 
        { q: "A leap year occurs every ____ years.", ans: ["4", "8", "13", "7"], corr: "4" }, 
        { q: "How many days are there in 1 week?", ans: ["7", "5", "10", "13"], corr: "7" },
        { q: "Is water dry?", ans: ["no", "yes", "maybe", "sometimes"], corr: "no" } 
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

// takes you to highscores page
function renderScores() {
    // resets timer
    timer.textContent = "00";
    // changes header to say highscores
    header.children[0].textContent = "Highscores";
    // clears content section
    content.removeChild(content.children[0]);
    // clears footer section unles it's empty
    if (bottom.children[0] != null){
        bottom.removeChild(bottom.children[0]);
    }

    // creates an ordered list for the scores
    var scoreList = document.createElement("ol");
    // loops through the array of scores and puts each item in a new list item
    for (i = 0; i < scoresArray.length; i++){
        tempListItem = document.createElement("li");
        tempListItem.textContent = scoresArray[i].name + " - " + scoresArray[i].score;
        scoreList.appendChild(tempListItem);
    }
    // appends the list to the content section
    content.appendChild(scoreList);

    // buttonsssssssss
    // creates a div for the new buttons
    var buttonsDiv = document.createElement("div");
    // creates the 2 buttons with unique names
    var backBtn = document.createElement("button");
    var clearBtn = document.createElement("button");
    // adds button text
    backBtn.textContent = "Go Back";
    clearBtn.textContent = "Clear HighScores";
    // adds button to the div
    buttonsDiv.appendChild(backBtn);
    buttonsDiv.appendChild(clearBtn);
    // adds the div to the bottom section
    bottom.appendChild(buttonsDiv);


    backBtn.addEventListener("click", function(event) {
        event.preventDefault();
        startOver();
    });


    // clear button clears local storage, empties score array, re renders score
    clearBtn.addEventListener("click", function(event) {
        event.preventDefault();
        localStorage.clear();
        scoresArray = [];
        renderScores();
    });
}

// resets the whole page to the starting position
function startOver() {
    console.log("startover");
    secondsLeft = 60;
    timer.textContent = secondsLeft;

    // resets header
    header.children[0].textContent = "Code Quiz";

    // clears content and bottom sections
    content.removeChild(content.children[0]);

    if (bottom.children[0] != null){
        bottom.removeChild(bottom.children[0]);
    }

    // recreates instruction paragraph 
    var contentSub = document.createElement("p");
    contentSub.setAttribute("id", "instruction");
    contentSub.textContent = "This is a timed quiz. Your score will be the time you have left when you've answered every question. To select an answer, click on it. Good luck!" ;
    content.appendChild(contentSub);

    // recreates start button with bootstrap class and type
    var bottomButton = document.createElement("button");
    bottomButton.textContent = "Start";
    bottomButton.setAttribute("type", "button");
    bottomButton.setAttribute("class", "btn btn-primary");
    bottom.appendChild(bottomButton);
}

// function occurs when time hits 0 or questions run out
function gameOver() {

    timer.textContent = "00";
    
    // prompts user to input high score
    header.children[0].textContent = "Enter your initials to save your highscore";
    
    // clear content and bottom sections
    if (content.children[0] != null){
        content.removeChild(content.children[0]);
    }

    if (bottom.children[0] != null){
        bottom.removeChild(bottom.children[0]);
    }

    // adds form for initials and button to submit
    // creates a form for entering initials
    var form = document.createElement("form");
    // makes the input field
    var input = document.createElement("input");
    // makes submit button
    var newBtn = document.createElement("button");
    // sets the input field to accept text
    input.setAttribute("type", "text");
    // adds the input to the form
    form.appendChild(input);
    // makes the button have submit written on it
    newBtn.textContent = "Submit";
    // adds the button to the form
    form.appendChild(newBtn);
    // adds the entire form to the page
    content.appendChild(form);

    // event listener for submit button clicked
    newBtn.addEventListener("click", function(event){
        event.preventDefault();
        // reads the users input initials
        var saveName = input.value;
        // sets the user's remaining time as the score
        if (secondsLeft < 0){
            secondsLeft = 0;
        }
        var saveScore = secondsLeft;
        // adds a score object to the scoresArray
        var newScore = {name : saveName, score : saveScore};
        scoresArray.push(newScore);

        // sorts the array of scores based on the score field of the score objects
        // score2.score - score1.score specifies to sort in descending order
        // if above is greater than 0, it swaps the array elements
        scoresArray.sort((score1,score2) => score2.score - score1.score);

        // stores updated array in local storage
        localStorage.setItem("scores", JSON.stringify(scoresArray));
        // takes to highscore page
        renderScores();
    });
}

// detects if user selected one of the list item answers
content.addEventListener("click", function(event) {
    event.preventDefault();
    if(event.target.matches("li") && timer.textContent != "00"){
        if(event.target.textContent == usedArray[0].corr){
            // say correct at bottom
            result.textContent = "Correct!";
        }
        else{
            // say wrong at bottom and remove time
            result.textContent = "Wrong!";
            secondsLeft -= 15;
            // reupdate time for smooveness
            timer.textContent = secondsLeft;
        }
        // detects if there are no questions left
        if (qArray.length == 0){
            // gamemover, man
            clearInterval(timerInterval);
            gameOver();
        }
        else{
            // continue with the quiz
            renderQuestion();
        }
    }
});

// detects when user clicks start button and calls init()
bottom.addEventListener("click", function(event) {
    event.preventDefault();
    // makes sure only the bootstrap button activates this
    if(event.target.getAttribute("class") == "btn btn-primary" && timer.textContent != "00"){
        init();
    }
});

// detects high score being clicked and takes to scores page
highScoreButton.addEventListener("click", function() {
    renderScores();
});