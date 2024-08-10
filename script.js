const leftNumber = document.querySelector(".num-left")
const rightNumber = document.querySelector(".num-right")
const levelLabel = document.querySelector(".level") 
const highScoreLabel = document.querySelector(".high-score") 
const body = document.body

let startBtn = document.querySelector(".start")
let level = 0
let highScore = 0
let userAnswer
let num1, num2

startBtn.addEventListener("click", startGame)

function startGame(){
    level = 0
    rightNumber.addEventListener("click", handleUserClick)
    leftNumber.addEventListener("click", handleUserClick)
    generateQuestion()
    startBtn.classList.add("gone")
}

function generateQuestion(){
    level ++
    levelLabel.textContent = "Level " + level
    do{
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
    } while (num1 == num2);

    checkStatus(num1, num2)
    leftNumber.textContent = num1
    rightNumber.textContent = num2
}

function checkStatus(left, right){
    leftNumber.setAttribute("status", "")
    rightNumber.setAttribute("status", "")
    if (right < left){ leftNumber.setAttribute("status", "greater") } 
    else{ rightNumber.setAttribute("status", "greater") }
}

function checkAnswer(userAnswer){
    if (userAnswer == "greater"){
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
    userAnswer = event.target.getAttribute("status")
    checkAnswer(userAnswer)
}

function gameOver(){
    startBtn.classList.remove("gone")
    startBtn.textContent = "Restart"
    rightNumber.removeEventListener("click", handleUserClick)
    leftNumber.removeEventListener("click", handleUserClick)
    if (level > highScore){
        highScore = level
        highScoreLabel.textContent = "Level Tertinggi : " + highScore; 
    }
}

