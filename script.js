const screen1 = document.getElementById("screen1");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const errorMsg = document.getElementById("error-msg");
const startBtn = document.getElementById("startBtn");
const screen2 = document.getElementById("screen2");

//Screen_1
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
};

startBtn.addEventListener("click", validatePlayer);
