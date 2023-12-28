let turn = "X";
let gameover = false;
let draw = false;

const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

function openPopup(message) {
    document.getElementById('popupMessage').innerText = message;
    document.getElementById('customPopup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('customPopup').style.display = 'none';
    resetState();
}

function showPopupOnWin(winner) {
    openPopup(winner + " wins!");
}

function showPopupOnDraw() {
    openPopup("It's a draw!");
}

const Win = () => {
    const gridtext = document.getElementsByClassName("gridtext");
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6] // diagonal
    ];

    let winner = null;

    wins.forEach(e => {
        if (
            (gridtext[e[0]].innerText === gridtext[e[1]].innerText) &&
            (gridtext[e[1]].innerText === gridtext[e[2]].innerText) &&
            (gridtext[e[0]].innerText !== "")
        ) {
            winner = gridtext[e[0]].innerText;
            gameover = true;
        }
    });

    if (winner) {
        document.querySelector('.info').innerText = winner + " wins";

        setTimeout(() => {
            showPopupOnWin(winner);
        }, 100);

        return; // Exit the function if there is a winner
    }

    // Check for a draw
    if (Array.from(gridtext).every(cell => cell.innerText !== '')) {
        document.querySelector('.info').innerText = "It's a draw!";
        gameover = true;

        setTimeout(() => {
            showPopupOnDraw();
        }, 100);
    }
};

let Box = document.getElementsByClassName("grid");
Array.from(Box).forEach(element => {
    let boxText = element.querySelector(".gridtext");
    element.addEventListener('click', () => {

        if (gameover) {
            return;
        }

        if (boxText.innerText === '') {
            boxText.innerText = turn;
            turn = changeTurn();
            Win();

            // Update the info only if the game is still ongoing
            if (!gameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

document.getElementById("reset").addEventListener("click", () => {
    // Close the popup without triggering resetState
    document.getElementById('customPopup').style.display = 'none';
    resetState();
});

function resetState() {
    // Reset the game state
    Array.from(Box).forEach((element) => {
        element.querySelector(".gridtext").innerText = "";
    });

    turn = "X";
    gameover = false;
    draw = true;
    document.querySelector(".info").innerText = "Turn for X";
}
