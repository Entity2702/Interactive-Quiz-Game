let score = 0;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const scoreScreen = document.getElementById("score-screen");
const answerButtons = document.getElementsByClassName("ansbtn");

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
 shuffle(questions);
}

function selectAnswer(btnName){
 const btn = document.getElementById(btnName);
 if(btn.classList.contains("selected")){
  btn.classList.remove("selected");
 }
 else{
  for(const ansbtn of answerButtons){
   ansbtn.classList.remove("selected");
  }
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
 const submitButton = document.getElementById("submit-btn");
 if(isAnswerSelected()){
  submitButton.disabled = false;
 } else{
  submitButton.disabled = true;
 }
}



