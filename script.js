let score = 0;
let questionNumber = 0;
const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const answers = [1, 2, 3, 4];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const scoreScreen = document.getElementById("score-screen");
const question = document.querySelector("#question h2");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");
const yourScore = document.querySelector("#score-screen h2");
const startAgainButton = document.getElementById("again");

const quizNodesContainer = document.getElementById("quiz-nodes");
const answerButtonsContainer = document.getElementById("answers");

quizNodesContainer.innerHTML = steps.map(step => `<div class="quiz-node" data-node>${step}</div>`).join("");
answerButtonsContainer.innerHTML = answers.map(answer => `<button id="ans${answer}" class="ansbtn" onclick="selectAnswer('ans${answer}')" data-ansbtn>answer</button>`).join("");


const answerButtons = document.querySelectorAll("[data-ansbtn]");
const quizNodes = document.querySelectorAll("[data-node]");

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
 if(questionNumber<9){
  questionNumber++;
  loadQuestion();
 }
 else{
  endGame();
 }
 toggleSubmitButton();
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
 for(const node of quizNodes){
  if(node.classList.contains("prev-node")) node.classList.remove("prev-node");
  if(node.classList.contains("current-node")) node.classList.remove("current-node");
  if(!node.classList.contains("next-node")) node.classList.add("next-node");
 }
}

function nextNode(){
 if(questionNumber == 0){
  quizNodes[questionNumber].classList.remove("next-node");
  quizNodes[questionNumber].classList.add("current-node");
 }
 else{
  quizNodes[questionNumber].classList.remove("next-node");
  quizNodes[questionNumber].classList.add("current-node");
  quizNodes[questionNumber-1].classList.remove("current-node");
  quizNodes[questionNumber-1].classList.add("prev-node");
 }
}