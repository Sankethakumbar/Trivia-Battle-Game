/*--------Screen 1: Player Setup------------*/

const screen1 = document.getElementById("screen1");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const errorMsg = document.getElementById("error-msg");
const startBtn = document.getElementById("startBtn");
const screen2 = document.getElementById("screen2");

player1Name = "";
player2Name = "";

//check for players
const validatePlayer = (e) => {
    const name1 = player1.value.trim();
    const name2 = player2.value.trim();

    if (name1 === "" || name2 === "") {
        errorMsg.textContent = "Both player names are required";
        return;
    }
    if (name1.toLowerCase() === name2.toLowerCase()) {
        errorMsg.textContent = "Player names must be different";
        return;
    }

    player1Name = name1;
    player2Name = name2;

    errorMsg.textContent = "";
    screen1.style.display = "none";
    screen2.style.display = "block";

    //s2 start
    chooseCategories(); 
};
startBtn.addEventListener("click", validatePlayer);




/*----------Screen 2: Category Selection---------*/

const roundNo = document.getElementById("round-no");
const categorySelect = document.getElementById("categorySelect");
const startRoundBtn = document.getElementById("startRoundBtn");
const categoryError = document.getElementById("category-error");


let roundNumber = 1;

let currentCategory = "";
let usedCategories = [];

const allCategories = [
    "music",
    "sport_and_leisure",
    "film_and_tv",
    "arts_and_literature",
    "history",
    "society_and_culture",
    "science",
    "geography",
    "food_and_drink",
    "general_knowledge"
];


// const fetchCAyegories = async () => {
//     try {
//         const res = await fetch("");
//         const data = await res.json();

//     }
// }

//choose category 
const chooseCategories = () => {
    categorySelect.innerHTML = `<option value="" hidden selected>Choose your category</option>`;

    allCategories.forEach((category) => {
        if (!usedCategories.includes(category)) {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category.replaceAll("_", " ");
            categorySelect.appendChild(option);
        }
    })
}

const updateRound = () => {
    roundNo.textContent = `Round ${roundNumber}`
};

const handleStartRound = () => {
    const selected = categorySelect.value;
    
    if (selected === "") {
        categoryError.textContent = "Please select a category";
        return;
    }
    categoryError.textContent = "";
    currentCategory = selected;
    usedCategories.push(selected);

    console.log("Round:", roundNumber);
    console.log("Category:", currentCategory);
    console.log("Used categories:", usedCategories);

    //3rd screen
    screen2.style.display = "none";
    screen3.style.display = "block";

    fetchAllQuestions()
}
startRoundBtn.addEventListener("click", handleStartRound);



/*----------------Screen 3: Question Gameplay ------------*/
const screen3 = document.getElementById("screen3");

const roundInfo = document.getElementById("roundInfo");
const categoryInfo = document.getElementById("categoryInfo");
const difficultyInfo = document.getElementById("difficultyInfo");
const turnInfo = document.getElementById("turnInfo");

const player1ScoreDisplay = document.getElementById("player1Score");
const player2ScoreDisplay = document.getElementById("player2Score");

const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

let questions = [];
let currentQuestionIndex = 0;

let player1Score = 0;
let player2Score = 0;


//url and fetch data
const fetchData = async (category, difficulty) => {
    const url = `https://the-trivia-api.com/api/questions?categories=${category}&difficulty=${difficulty}&limit=2`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

//calling the fetch data with easy, medium, hard
const fetchAllQuestions = async () => {
    try {
        const easy = await fetchData(currentCategory, "easy");
        const medium = await fetchData(currentCategory, "medium");
        const hard = await fetchData(currentCategory, "hard");

        questions = [...easy, ...medium, ...hard];

        console.log("fetched questions", questions);
        displayQuestion();

    } catch (error) {
        console.log("error", error)
    }
};

//decide the difficulty
const getdifficultyFromIndex = (index) => {
    if (index < 2) return "Easy"
    else if (index < 4) return "Medium"
    else return "Hard"
}

//current player
const getCurrentPlayer = (index) => {
    return index % 2 === 0 ? player1Name : player2Name;
}

//score based on difficulty
const getScoreByDifficulty = (index) => {
    if (index < 2) return 10;
    if (index < 4) return 15;
    return 20;
};

//shuffle array -took help from chatgpt
const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    };

//display question
const displayQuestion = () => {
    const q = questions[currentQuestionIndex];

    if (!q) return

    roundInfo.textContent = `Round: ${roundNumber}`;
    categoryInfo.textContent = `Category: ${currentCategory.replaceAll("_", " ")}`;
    difficultyInfo.textContent = `Difficulty: ${getdifficultyFromIndex(currentQuestionIndex)}`
    turnInfo.textContent = `Turn: ${getCurrentPlayer(currentQuestionIndex)}`
    
    questionText.textContent = q.question;
    optionsDiv.innerHTML = "";
    nextBtn.disabled = true;

    const allOptions = [...q.incorrectAnswers, q.correctAnswer];

    shuffleArray(allOptions);

    allOptions.forEach((option) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.className = "option-btn"
        
        btn.addEventListener("click", () => handleOptionClick(option, btn));
        
        optionsDiv.appendChild(btn);
    });
}

const handleOptionClick = (selectedOption, selectedBtn) => {
    const q = questions[currentQuestionIndex];

    //disble the option buttons
    const allBtns = document.querySelectorAll(".option-btn");
    allBtns.forEach(btn => btn.disabled = true);

    //correct or wrong
    if (selectedOption === q.correctAnswer) {
        selectedBtn.style.backgroundColor = "green";

        const score = getScoreByDifficulty(currentQuestionIndex);

        if (currentQuestionIndex % 2 === 0) {
            player1Score += score;
        } else {
            player2Score += score;
        }
    }
    else {
        selectedBtn.style.backgroundColor = "red";

        allBtns.forEach((btn) => {
            if (btn.textContent === q.correctAnswer) {
                btn.style.backgroundColor = "green";
            }
        });
    }

    player1ScoreDisplay.textContent = `Player 1: ${player1Score}`;
    player2ScoreDisplay.textContent = `Player 2: ${player2Score}`;

    nextBtn.disabled = false;
};

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        screen3.style.display = "none";
        screen4.style.display = "block";
        updateNextRoundBtn();
    }
});

/*--------SCREEN4-----------*/
const screen4 = document.getElementById("screen4");
const nextRoundBtn = document.getElementById("nextRoundBtn");
const endGameBtn = document.getElementById("endGameBtn");


const updateNextRoundBtn = () => {
    if (usedCategories.length === allCategories.length) {
        nextRoundBtn.disabled = true;
    } else {
        nextRoundBtn.disabled = false;
    }
}

nextRoundBtn.addEventListener("click", () => {
    roundNumber++;
    currentQuestionIndex = 0;
    questions = [];

    screen4.style.display = "none";
    screen2.style.display = "block";

    //round no and categories dropdown
    updateRound();
    chooseCategories();
})

endGameBtn.addEventListener("click", () => {
    screen4.style.display = "none";
    screen5.style.display = "block";
    console.log("Game ended");
    showResult();
})



/*---Screen 5: Final Result----*/
const screen5=document.getElementById("screen5")
const scoreDisplay = document.getElementById("scoreDisplay");
const resMsg = document.getElementById("resMsg");


const showResult = () => {
    scoreDisplay.textContent = `Player 1:${player1Score} | Player 2: ${player2Score}`;

    if (player1Score > player2Score) {
        resMsg.textContent = `${player1Name} Wins 🎉`;
    } else if(player1Score<player2Score){
        resMsg.textContent = `${player2Name} Wins 🎉`;
    } else {
        resMsg.textContent = `It's a Draw 🤝`;
    }
}