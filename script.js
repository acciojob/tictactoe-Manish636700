let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

document.getElementById("submit").addEventListener("click", function () {
    player1 = document.getElementById("player1").value.trim();
    player2 = document.getElementById("player2").value.trim();

    console.log(player1, player2);

    if (player1 === "" || player2 === "") {
        alert("Both players must enter their names!");
        return;
    }

    document.getElementById("playerInput").classList.add("hidden");
    document.getElementById("gameBoard").classList.remove("hidden");

    currentPlayer = player1;
    document.getElementById("message").textContent = `${currentPlayer}, you're up!`;
});

document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", function () {
        let cellIndex = parseInt(this.id) - 1;

        if (board[cellIndex] !== "" || !gameActive) {
            return;
        }

        board[cellIndex] = currentSymbol;
        this.textContent = currentSymbol;

        if (checkWinner()) {
            document.getElementById("message").textContent = `${currentPlayer}, congratulations! You won!`;
            gameActive = false;
            return;
        }

        if (!board.includes("")) {
            document.getElementById("message").textContent = "It's a draw!";
            return;
        }

        if (currentSymbol === "X") {
            currentSymbol = "O";
            currentPlayer = player2;
        } else {
            currentSymbol = "X";
            currentPlayer = player1;
        }

        document.getElementById("message").textContent = `${currentPlayer}, you're up!`;
    });
});

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
    });
}

document.getElementById("reset").addEventListener("click", function () {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentSymbol = "X";
    currentPlayer = player1;
    document.getElementById("message").textContent = "";
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
    });
    document.getElementById("playerInput").classList.remove("hidden");
    document.getElementById("gameBoard").classList.add("hidden");
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
});

