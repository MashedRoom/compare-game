const leftNumber = document.querySelector(".num-left")
const rightNumber = document.querySelector(".num-right")
const levelLabel = document.querySelector(".level") 
const choices = document.querySelectorAll(".box-choice")
const body = document.body

let startBtn = document.querySelector(".start")
let level = 0
let userAnswer
let num1, num2

startBtn.addEventListener("click", startGame)

function startGame(){
    level = 0
    choices.forEach((choice)=>{
        choice.addEventListener("click", handleUserClick)
    })
    generateQuestion()
    startBtn.classList.add("gone")
}

function generateQuestion(){
    level ++
    levelLabel.textContent = "Level " + level
    if (level < 10){
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * 10);
    } else if(level<20){
        num1 = Math.floor(Math.random() * (50 - 10) + 10);
        num2 = Math.floor(Math.random() * (50 - 10) + 10);
    } else{
        num1 = Math.floor(Math.random() * (1000 - 10) + 10);
        num2 = Math.floor(Math.random() * (1000 - 10) + 10);
    }
    leftNumber.textContent = num1
    rightNumber.textContent = num2
}

function checkAnswer(userAnswer){
    let answer
    if (num1 > num2){
        answer = "greater"
    } else if(num1 < num2){
        answer = "lower"
    } else{
        answer = "equal"
    }
    console.log(answer, userAnswer)
    if (userAnswer == answer){
        triggerBlink("green")
        generateQuestion()
    } else{
        triggerBlink("red")
        gameOver()
    }
}

function triggerBlink(color) {
    const className = `blink-${color}`;
    body.classList.add(className);
    setTimeout(() => {
        body.classList.remove(className);
    }, 500);
}

function handleUserClick(event){
    userAnswer = event.target.getAttribute("id")
    checkAnswer(userAnswer)
}

function gameOver(){
    startBtn.classList.remove("gone")
    startBtn.textContent = "Restart"
    choices.forEach((choice)=>{
        choice.removeEventListener("click", handleUserClick)
    })
}

