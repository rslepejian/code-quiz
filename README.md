# Code Quiz Thinger

## Description

This site contains a timed quiz that scores the user based on their remaining time after answering all questions. Time is deducted for incorrect answers. It prompts users to enter initials to be paired with their scores and saves those scores in local storage unless the user specifies that they be cleared. From the highscore page the user can return to the starting page and take the quiz again. The questions are given in a random order as are the multiple choice answers. There is a timer that visibly counts down as the user takes the quiz in the top right. The highscore page can be accessed at any time from the link in the top left.

## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Git]
* [Github](https://github.com/)
* [Javascript](https://www.javascript.com/)

## Deployed Link

* [See Live Site](https://rslepejian.github.io/code-quiz/)

## Preview of Working Site

![Image]()
![Image]()

## Code Snippet
This code snippet shows the handling of the user clicking one of the potential answers to a question. It then detects whether their choice matches the attribute in the question object that corresponds to the correct answer. If the answer is correct the text "Correct!" is displayed at the bottom of the screen. If not, the text "Wrong!" is displayed and the remaining time is decreased by 15 seconds. After that, the array containing the remaining unasked questions is checked. If it is empty, there are no questions left to be asked, and the quiz is over. The gameOver() method is called and the interval, timerInterval, is cleared. This code snippet was chosen because determining if the user selected the right answer to the presented questions was the main crux of this task of running a quiz. It also presented several interesting hurdles when combined with the fact that the questions and the answers in the quiz are being shown in random orders.

```javascript
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
```

## Authors

* **Raffi Lepejian** 

## Contact Information

- [Link to Portfolio Site](#)
- [Link to Github](https://github.com/rslepejian)
- [Link to LinkedIn](https://linkedin.com/in/raffi-lepejian-071876153)