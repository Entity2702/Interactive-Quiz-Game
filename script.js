let score = 0;
let questionNumber = 0;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const scoreScreen = document.getElementById("score-screen");
const answerButtons = document.getElementsByClassName("ansbtn");
const question = document.querySelector("#question p");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");
const yourScore = document.querySelector("#score-screen p");
const startAgainButton = document.getElementById("again");
const progressNodes = document.getElementsByClassName("quiz-node");

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function startGame(){
 startScreen.classList.add("hidden");
 quizScreen.classList.remove("hidden");
 resetNodes();
 shuffle(questions);
 loadQuestion();

}

function loadQuestion(){
 question.textContent = questions[questionNumber].question;
 let i = 0;
 for(const ansbtn of answerButtons){
  ansbtn.textContent = questions[questionNumber].options[i];
  i++;
 }
  nextNode();
}

function selectAnswer(btnName){
 const btn = document.getElementById(btnName);
 if(btn.classList.contains("selected")){
  btn.classList.remove("selected");
 }
 else{
  removeAnswers();
  btn.classList.add("selected");
 }

 toggleSubmitButton();
}

function isAnswerSelected(){
 for(const ansbtn of answerButtons){
  if(ansbtn.classList.contains("selected")) return true;
 }

 return false;
}

function toggleSubmitButton(){
 if(isAnswerSelected()){
  submitButton.disabled = false;
 } else{
  submitButton.disabled = true;
 }
}

function removeAnswers(){
 for(const ansbtn of answerButtons){
   ansbtn.classList.remove("selected");
  }
}

function disableAnswerButtons(){
 for(const ansbtn of answerButtons){
   ansbtn.disabled = true;
  }
}

function enableAnswerButtons(){
 for(const ansbtn of answerButtons){
   ansbtn.disabled = false;
  }
}

function submit(){
 const selectedAnswer = document.querySelector(".ansbtn.selected");
 const correct = questions[questionNumber].correct;
 if(selectedAnswer.textContent == answerButtons[correct].textContent){
  selectedAnswer.classList.remove("selected");
  selectedAnswer.classList.add("correct");
  score++;
 }
 else{
  selectedAnswer.classList.remove("selected");
  selectedAnswer.classList.add("wrong");
  answerButtons[correct].classList.add("correct");
 }

 disableAnswerButtons();
 submitButton.classList.add("hidden");
 nextButton.classList.remove("hidden");
}

function next(){
 if(document.querySelector(".correct") != null) document.querySelector(".correct").classList.remove("correct");
 if(document.querySelector(".wrong") != null) document.querySelector(".wrong").classList.remove("wrong");
 enableAnswerButtons();
 if(questionNumber<10){
  questionNumber++;
  loadQuestion();
  toggleSubmitButton();
 }
 else{
  endGame();
 }
 submitButton.classList.remove("hidden");
 nextButton.classList.add("hidden");
}

function endGame(){
 quizScreen.classList.add("hidden");
 scoreScreen.classList.remove("hidden");
 yourScore.textContent = `Your score is ${score}!`
}

function startAgain(){
 score = 0;
 questionNumber = 0;
 scoreScreen.classList.add("hidden");
 startScreen.classList.remove("hidden");
}

function resetNodes(){
 for(const node of progressNodes){
  if(node.classList.contains("prev-node")) node.classList.remove("prev-node");
  if(node.classList.contains("current-node")) node.classList.remove("current-node");
  if(!node.classList.contains("next-node")) node.classList.add("next-node");
 }
}

function nextNode(){
 if(questionNumber == 0){
  progressNodes[questionNumber].classList.remove("next-node");
  progressNodes[questionNumber].classList.add("current-node");
 }
 else{
  progressNodes[questionNumber].classList.remove("next-node");
  progressNodes[questionNumber].classList.add("current-node");
  progressNodes[questionNumber-1].classList.remove("current-node");
  progressNodes[questionNumber-1].classList.add("prev-node");
 }
}