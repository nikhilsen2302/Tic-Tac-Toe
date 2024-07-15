let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
let scoreX = 0;
let scoreO = 0;

function initializeGame() {
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
        e.addEventListener("click", handleClick, { once: true });
    });
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#popup").style.display = "none";
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
}

function handleClick() {
    if (!isGameOver && this.innerHTML === "") {
        this.innerHTML = turn;
        checkWin();
        checkDraw();
        changeTurn();
    }
}

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        let [a, b, c] = winConditions[i];
        let v0 = boxes[a].innerHTML;
        let v1 = boxes[b].innerHTML;
        let v2 = boxes[c].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            if (turn === "X") scoreX++;
            else scoreO++;
            updateScores();
            displayPopup(turn + " Wins!");
            return;
        }
    }
}

function checkDraw() {
    if (!isGameOver) {
        let isDraw = Array.from(boxes).every(e => e.innerHTML !== "");
        if (isDraw) {
            isGameOver = true;
            displayPopup("Draw");
        }
    }
}

function updateScores() {
    document.querySelector("#score-x").innerText = scoreX;
    document.querySelector("#score-o").innerText = scoreO;
}

function displayPopup(result) {
    document.querySelector("#popup-result").innerHTML = result;
    document.querySelector("#popup").style.display = "flex";
}

document.querySelector("#play-again-popup").addEventListener("click", initializeGame);

// Initialize the game on page load
initializeGame();
