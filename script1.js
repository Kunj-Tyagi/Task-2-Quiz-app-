const questions = [
    {
        question: "What does the abbreviation HTML stand for?",
        answers: [
            { text:"High Text Markup Language",correct:false},
            { text:"Hyper Text Markup Language",correct:true},
            { text:"Hyper Text Markdown Language",correct:false},
            { text:"High Text Markdown Language",correct:false},
        ]
    },
    {
        question: "How many sizes of headers are available in HTML by default?",
        answers: [
            { text:"6",correct:true},
            { text:"1",correct:false},
            { text:"3",correct:false},
            { text:"2",correct:false},
        ]
    },
    {
        question: "What is the smallest header in HTML by default?",
        answers: [
            { text:"h6",correct:true},
            { text:"h1",correct:false},
            { text:"h3",correct:false},
            { text:"h2",correct:false},
        ]
    },
    {
        question: "What are the types of lists available in HTML?",
        answers: [
            { text:"Ordered,Unordered Lists",correct:true},
            { text:"Bulleted,Numbered Lists",correct:false},
            { text:"Named,Unnamed Lists",correct:false},
            { text:"None of these",correct:false},
        ]
    }
    
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let time_element = document.getElementById("timer");
const skipbutt = document.getElementById("skipbutton");

let currentQuestionIndex = 0;
let score = 0; 
let time;
const totaltime = 15;
let sec = totaltime;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    skipbutt.innerHTML = "skip";
    showQuestion();
}
function timer(){
    time_element.innerHTML = sec;
    sec--;
    if(sec==0){
        sec = totaltime;
        clearInterval(time);
        currentQuestionIndex++
        showQuestion();
        }
}
function showQuestion(){
    sec = totaltime;
    clearInterval(time);
    timer();
    time = setInterval(timer,1000);
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex  + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question; 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    }
    );
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score=score+5;
    }
    else{
        selectedBtn.classList.add("incorrect");
        score--;
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
   resetState();
   questionElement.innerHTML =`You scored ${score} out of ${5*questions.length}!`;
   nextButton.innerHTML = "Play Again";
   nextButton.style.display = "block";
   skipbutt.style.display="none";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


skipbutt.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});



startQuiz();

