let header = document.createElement('header');//header element, will contain the view high scores button and the timer
let nav = document.createElement('nav'); //nav element, child of header
let housingEl = document.createElement('main'); //main element, will contain the quiz data
let highScoresLink = document.createElement('button');//link to see high scores
highScoresLink.textContent = 'View High Scores';
highScoresLink.id = 'highScoresBtn'; //set id for high score btn
let timerEl = document.createElement('span');//child of header, will house timer
let timer = 75; //set global variable for timer, this way we can access its value in any scope
timerEl.textContent = timer;  //set timer into the timer element we created
timerEl.id = 'timer';//set id for timer
let startBtn = document.createElement('button');//create start button
startBtn.textContent = 'Start'; //text for start button
startBtn.id = 'startBtn'; //assign startBtn id
let playAgainBtn = document.createElement('button');//create start button
playAgainBtn.id = 'playAgainBtn'; //assign playbutton id for styling
playAgainBtn.textContent = 'Play Again'; //text for play again button
let startH1 = document.createElement('h1');//creating an element to store our start title
startH1.id = 'startH1';
startH1.textContent = 'Coding Quiz Challenge'; //start title text
startH1.style.textAlign = 'center';
let stop = 0;
let correctMessageEl = document.createElement('div');
correctMessageEl.textContent = 'Correct';
correctMessageEl.id = 'correct-message';
let incorrectMessageEl = document.createElement('div');
incorrectMessageEl.textContent = 'Wrong';
incorrectMessageEl.id = 'incorrect-message';
let viewResultsEl = document.createElement('div');
let userNameEl = document.createElement('input');
userNameEl.type = 'text';
userNameEl.value = '';
userNameEl.placeholder = 'Intials';
let userName = userNameEl.value;
let submitBtn = document.createElement('button');
submitBtn.id = 'submitBtn';
submitBtn.textContent = 'Save Your Score';
viewResultsEl.className = 'result-input';
viewResultsEl.appendChild(userNameEl);
viewResultsEl.appendChild(submitBtn);
let questionTitle = document.createElement('h3'); //create element to store each question in
questionTitle.id = 'questionTitle';
let questionUl = document.createElement('ul'); //this will house all of the li's that will store each option avalible 
let Option_1 = document.createElement('li'); //will house option a 
let Option_2 = document.createElement('li'); //will house option b
let Option_3 = document.createElement('li'); //will house option c
let Option_4 = document.createElement('li'); //will house option d
Option_1.classList.add('quiz-option'); /// class names for each option
Option_2.classList.add('quiz-option');
Option_3.classList.add('quiz-option');
Option_4.classList.add('quiz-option');
let highScoreHousingEl = document.createElement('div');
highScoreHousingEl.className = 'highScoreEl';
let highScoreListUl = document.createElement('ul');
let highScoreTitle = document.createElement('h2');
highScoreTitle.id = 'highScore-title';
let backBtn = document.createElement('button');
backBtn.id = 'backBtn';
backBtn.textContent = 'Return';
let clearBtn = document.createElement('button');
clearBtn.id = 'clearBtn';
clearBtn.textContent = 'clearBtn';
clearBtn.textContent = 'Clear High Scores';
highScoreTitle.textContent = 'HighScores';
highScoreHousingEl.appendChild(highScoreTitle);
highScoreHousingEl.appendChild(highScoreListUl);
highScoreHousingEl.appendChild(backBtn);
highScoreHousingEl.appendChild(clearBtn);
let optionSet = [Option_1, Option_2, Option_3, Option_4]; //store in array for adding event listeners to each option via for loop
let Current_Question = 0; //set current question equal to zero that way the first question set will be the first index in our quiz data array
let highScores = []; //storage location of highscores
//Quiz Questions, options, and answers 
const QuizData = [
    {
        question: 'What Does JS stand for?',
        a: 'JavaStand',
        b: 'JQuerySelect',
        c: 'JavaScript',
        d: 'JavaSkip',
        answer: 'JavaScript'
    },
    {
        question: 'What is CSS used for?',
        a: 'Styling',
        b: 'DataBase',
        c: 'Motor oil',
        d: 'Does not exist',
        answer: 'Styling'
    },
    {
        question: 'What are the keyword "const" & "let" used for in JavaScript?',
        a: 'Functions',
        b: 'Constructors',
        c: 'Assigning variables',
        d: 'For Loops',
        answer: 'Assigning variables'
    },
    {
        question: 'Which of the following is NOT considered a semantic HTML element?',
        a: 'nav',
        b: 'article',
        c: 'header',
        d: 'div',
        answer: 'div'
    },
    {
        question: 'Evaluate the following statement: CSS is more powerful than JavaScript',
        a: 'True',
        b: 'False',
        c: 'Trick question... Css is not real',
        d: 'trick question... JavaScript is not real',
        answer: 'False'
    }
    
];

function startUp() { //runs when the page loads
    document.body.appendChild(startH1); //add start title to page
    document.body.appendChild(startBtn);//add start button to page
    var stored_score = JSON.parse(localStorage.getItem('score')); //grab local storage on reload
    if(stored_score !== null) {
        highScores = stored_score;
    }

    pasteScore(); //append high scores to the DOM on reload
}

function correctAnswerMessage() { //called when the user selects the correct answer
    stop = 0; //start timer at 0
    let messageTimer = setInterval(() => {
        document.body.appendChild(correctMessageEl);
        stop++;
        if (stop === 2) {
            clearInterval(messageTimer);
            document.body.removeChild(correctMessageEl);
        }
    }, 500)
    
}
function incorrectAnswerMessage() { //called when the user selects the incorrect answer
    stop = 0;
    let messageTimer = setInterval(() => {
        document.body.appendChild(incorrectMessageEl);
        stop++;
        if (stop === 2) {
            clearInterval(messageTimer);
            document.body.removeChild(incorrectMessageEl);
        }
    }, 500)
    
}

function Timing() { //Timing function
    timer = 75; //every time this function is called, the timer will reset to 75
    let timeKeeper = setInterval(() => {
        timer--; //every second, decrement timer by 1
        timerEl.textContent = timer; //push the current value of timer to our timer element
        if (timer <= 0) { //lowest possible value of timer is 0
            timer = 0;
            
        }
        if (timer === 0 || QuizData[Current_Question] === undefined) { //when the timer equals 0 or when there are no more questions left, stop the timer and view the results
            clearInterval(timeKeeper);
            userNameEl.value = '';
            viewResult();
        }
    }, 1000)
}


function CorrectAnswer() {
    for (let i = 0; i < optionSet.length; i++) {//loop through our array of options
        optionSet[i].addEventListener('click', () => {
            if (optionSet[i].textContent == QuizData[Current_Question].answer) { //if the user selects the correct answer, increase the value of timer by 10 and generate the next question set
                correctAnswerMessage();
                
                nextQuestion();
                
            } else { //if the user selects the wrong answer, decrease the value of timmer by 10
                incorrectAnswerMessage();
                timer = timer - 10;
            }
        })
    }
}
function viewResult() {
    questionTitle.textContent = `Final Score: ${timer}`; //replace the current question with the Users score
    questionUl.removeChild(Option_1); //remove option a from page
    questionUl.removeChild(Option_2); //remove option b from page
    questionUl.removeChild(Option_3); //remove option c from page
    questionUl.removeChild(Option_4); //remove option d from page
    housingEl.appendChild(viewResultsEl);
    housingEl.appendChild(playAgainBtn); //add the play again button to the page
    
}

function nextQuestion() {
    
    Current_Question++; //increase the value of Currrent_Question by one
    if (QuizData[Current_Question] !== undefined) { //if there is another question to be generated, do the following:
        nav.appendChild(highScoresLink); //add high score button to navigation
        nav.appendChild(timerEl); //add timer to navigation
        header.appendChild(nav); //add navigation to the header
        document.body.appendChild(header); //add header to the page
        document.body.appendChild(housingEl); //add housing element that contains question and options to page
        questionTitle.textContent = (QuizData[Current_Question].question); //question
        housingEl.appendChild(questionTitle); //add question to housing element
        Option_1.textContent = QuizData[Current_Question].a; //option a
        Option_2.textContent = QuizData[Current_Question].b; //option b
        Option_3.textContent = QuizData[Current_Question].c; //option c
        Option_4.textContent = QuizData[Current_Question].d; //option d
        questionUl.appendChild(Option_1); //add each option to ul element
        questionUl.appendChild(Option_2);
        questionUl.appendChild(Option_3);
        questionUl.appendChild(Option_4);
        housingEl.appendChild(questionUl); //add options to housing element 
    } else {
        return; //exit function
    }  
}
function GenerateQuiz() {
    Timing(); //call timing function
    
    document.body.removeChild(startBtn);//remove start button from body
    document.body.removeChild(startH1);//remove start title from body
    nav.appendChild(highScoresLink); //add high score element to navigation
    nav.appendChild(timerEl); //add timer element to navigation
    header.appendChild(nav); //add navigation to header
    document.body.appendChild(header); //add header to page
    document.body.appendChild(housingEl); //add quiz content to page
    questionTitle.textContent = (QuizData[Current_Question].question);
    housingEl.appendChild(questionTitle);
    Option_1.textContent = QuizData[Current_Question].a;
    Option_2.textContent = QuizData[Current_Question].b;
    Option_3.textContent = QuizData[Current_Question].c;
    Option_4.textContent = QuizData[Current_Question].d;
    questionUl.appendChild(Option_1);
    questionUl.appendChild(Option_2);
    questionUl.appendChild(Option_3);
    questionUl.appendChild(Option_4);
    housingEl.appendChild(questionUl);
    CorrectAnswer(); //call correct answer after the first question set has been loaded
    
}
playAgainBtn.addEventListener('click', () => {
    housingEl.removeChild(viewResultsEl); //remove final score from page
    housingEl.removeChild(playAgainBtn);//remove the play again button from the page after the user has selected to generate the quiz again
    Current_Question = -1;  //set current question to -1 because when our nextQuestion() is called, the value of Current_Question is immediately increminated by 1
    Timing();// call our timer function to reset the value of timer
    nextQuestion(); //call our next question function instead of our generate quiz function because our start title and start btn have already been removed

})

submitBtn.addEventListener('click', () => {
    highScoreListUl.innerHTML = ''; //clear the ul on high scores page, this way we dont create duplicates when looking through our array of scores
    let newHighScoreEntry = userNameEl.value + ': ' + timer; //content that will be stored in memory
    highScores.push(newHighScoreEntry); //push to our high scores array
    localStorage.setItem('score', JSON.stringify(highScores)); //add highscores to our memory
    pasteScore(); //append scores to page after storage of scores has been made
    userNameEl.value = '';  //reset input to empty
})



backBtn.addEventListener('click', () => { //returns back to final score page
    document.body.removeChild(highScoreHousingEl);
    nextQuestion();
    document.body.appendChild(housingEl);
})

clearBtn.addEventListener('click', () => { //clears high scores on page and in local memory
    highScoreListUl.innerHTML = '';
    highScores = [];
    localStorage.clear();
})

function generateHighScorePage() { //generates highscore page
    document.body.appendChild(highScoreHousingEl);

}

highScoresLink.addEventListener('click', () => {
    document.body.removeChild(housingEl);
    generateHighScorePage(); 
})

startBtn.addEventListener('click', GenerateQuiz); //run generate quiz when start button is clicked
function pasteScore() { //puts scores onto page
    highScoreListUl.innerHTML = ''; //empty out any html currently housed to prevent duplicates
    for(let i = 0; i < highScores.length; i++) { //loop through array of highscores
        let newListItem = document.createElement('li'); //create new li and append it to the ul
        newListItem.className = 'highScore-item';
        newListItem.textContent = highScores[i]; //text content of li will be the current index of highscores
        highScoreListUl.appendChild(newListItem);
        
    }
}

startUp(); //intialize on load



