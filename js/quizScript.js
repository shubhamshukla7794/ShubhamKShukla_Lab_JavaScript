function Quiz(questions) {
    this.questions = questions;
    this.score=0;
    this.questionIndex=0;
}

function Question(text, choices, answer) {
    this.questionText = text;
    this.choices=choices;
    this.answer = answer;
}

Quiz.prototype.getQuestionByIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function(answer){
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

function loadQuestions() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        
        let questionTextual = document.getElementById('question');
        questionTextual.innerText = quiz.getQuestionByIndex().questionText;
        
        var choices = quiz.getQuestionByIndex().choices;

        for(var i=1; i<=choices.length; i++) {
            var element = "choice" + i;
            let currentCh = document.getElementById(element);
            currentCh.innerText = choices[i-1];
            handleOpt(i,choices[i-1]);
        }

        showProgress();
    }
}

function handleOpt(i,choice) {
    var btnElement = "btn" + i;
            let currentBtn = document.getElementById(btnElement);
            currentBtn.onclick = function() {
                quiz.checkOptionWithAnswer(choice);
                loadQuestions();
            };
}

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
  };
  
  function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + ".And mark percentage is: "+((quiz.score/questions.length)*100)+"%"+"</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
  };


let questions = [
    new Question("Javascript is an _______ language?",["Object-Oriented","Object-Based","Procedural","None of the above"],"Object-Oriented"),
    new Question("Which of the following keywords is used to define a variable in Javascript?",["var","let","Both A and B","None of the above"],"Both A and B"),
    new Question("How can a datatype be declared to be a constant type?",["let","const","var","constant"],"const"),
    new Question(" Which is the property that represents the content displayed in the page in a window?",["frame","window","content","document"],"document"),
    new Question("Which of the following built-in method is used to remove the last element from an array and return that element?",["last()","pop()","get()","None of the above"],"pop()")
];


let quiz = new Quiz(questions);

loadQuestions();