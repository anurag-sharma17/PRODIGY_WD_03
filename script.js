// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("resetButton");
    const twoPlayerButton = document.getElementById("twoPlayerButton");
    const aiButton = document.getElementById("aiButton");
    const menu = document.getElementById("menu");
    const board = document.getElementById("board");
    let currentPlayer = "X";
    let gameState = Array(9).fill("");
    let isTwoPlayer = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(event) {
        const cell = event.target;
        const index = cell.getAttribute("data-index");

        if (gameState[index] !== "" || checkWinner()) {
            return;
        }

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        
        if (checkWinner()) {
            alert(`Player ${currentPlayer} wins!`);
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        if (!isTwoPlayer && currentPlayer === "O") {
            setTimeout(aiMove, 1000); // 1-second delay for AI move
        }
    }

    function checkWinner() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                cells[a].classList.add("winner");
                cells[b].classList.add("winner");
                cells[c].classList.add("winner");
                return true;
            }
        }
        return false;
    }

    function aiMove() {
        const emptyCells = gameState.map((val, index) => val === "" ? index : null).filter(val => val !== null);
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameState[randomIndex] = "O";
        cells[randomIndex].textContent = "O";
        
        if (checkWinner()) {
            alert("Player O wins!");
        } else {
            currentPlayer = "X";
        }
    }

    function resetGame() {
        gameState = Array(9).fill("");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("winner");
        });
        currentPlayer = "X";
        menu.classList.remove("hidden");
        board.classList.add("hidden");
        resetButton.classList.add("hidden");
    }

    function startGame(twoPlayer) {
        isTwoPlayer = twoPlayer;
        menu.classList.add("hidden");
        board.classList.remove("hidden");
        resetButton.classList.remove("hidden");
    }

    cells.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });

    resetButton.addEventListener("click", resetGame);
    twoPlayerButton.addEventListener("click", () => startGame(true));
    aiButton.addEventListener("click", () => startGame(false));
});
