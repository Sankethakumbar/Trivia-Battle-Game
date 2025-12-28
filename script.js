

/*--------Screen 1: Player Setup
------------*/

const screen1 = document.getElementById("screen1");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const errorMsg = document.getElementById("error-msg");
const startBtn = document.getElementById("startBtn");
const screen2 = document.getElementById("screen2");


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
    screen1.style.display = "none";
    screen2.style.display = "block";
    //s2 start
    chooseCategories(); 
};

startBtn.addEventListener("click", validatePlayer);




/*----------Screen 2: Category Selection (Start of a Round)------------*/

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
    fetchAllQuestions()

}

startRoundBtn.addEventListener("click", handleStartRound);



/*----------------Screen 3: Question Gameplay (6 Questions per Round)------------*/

let questions = [];
let currentQuestionIndex = 0;


const fetchData = async (category, difficulty) => {
    const url = `https://the-trivia-api.com/api/questions?categories=${category}&difficulty=${difficulty}&limit=2`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const fetchAllQuestions = async () => {
    try {
        const easy = await fetchData(currentCategory, "easy");
        const medium = await fetchData(currentCategory, "medium");
        const hard = await fetchData(currentCategory, "hard");

        questions = [...easy, ...medium, ...hard];

        console.log("fetched questions", questions);
    } catch (error) {
        console.log("error", error)
    }
};

