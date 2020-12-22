var header = document.querySelector("#title");
var content = document.querySelector("#content");
var bottom = document.querySelector("#bottom");
var timer = document.querySelector("#time");

var qArray = [
    { q: "Is water wet?", ans: ["yes", "no", "maybe", "sometimes"] },
    { q: "Is the sky blue?", ans: ["yes", "no", "maybe", "sometimes"] }, 
    { q: "Do apples fall up?", ans: ["yes", "no", "maybe", "sometimes"] }, 
    { q: "Are squares circles?", wrong: ["yes", "no", "maybe", "sometimes"] },
    { q: "Is water dry?", ans: ["yes", "no", "maybe", "sometimes"] } 
    ];

var secondsLeft = 60;


function init() {
    header.children[0].textContent = qArray[0].q;
    content.removeChild(content.children[0]);
    bottom.removeChild(bottom.children[0]);
    var qlist = document.createElement("ol");
    for (i = 0; i < 4; i++){
        var qlistItem = document.createElement("li");
        qlistItem.textContent = qArray[0].ans[i];
        qlist.appendChild(qlistItem);
    }
    content.appendChild(qlist);
    var timerInterval = setInterval(function() {

        timer.textContent = secondsLeft;
        
    
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
        
        }
        secondsLeft--;
    }, 1000);
}




bottom.addEventListener("click", function(event) {
    if(event.target.matches("button")){
        init();
    }
})