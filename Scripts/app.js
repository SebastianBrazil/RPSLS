//Declarations
let topTitle = document.getElementById("topTitle");
let onePlayerMode = document.getElementById("onePlayerMode");
let twoPlayerMode = document.getElementById("twoPlayerMode");
let rulesBtn = document.getElementById("rulesBtn");
let resetBtn = document.getElementById("resetBtn");

let nameInput = document.getElementById("nameInput");
let submitNameOne = document.getElementById("submitNameOne");
let submitNameTwo = document.getElementById("submitNameTwo");

let BOO = document.getElementById("BOO");
let BOF = document.getElementById("BOF");
let BOS = document.getElementById("BOS");

let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");
let lizard = document.getElementById("lizard");
let spock = document.getElementById("spock");

let displayResult = document.getElementById("displayResult");
let displayChoice = document.getElementById("displayChoice");
let submitPOneChoice = document.getElementById("submitPOneChoice");
let submitPTwoChoice = document.getElementById("submitPTwoChoice");
let continueAfterResult = document.getElementById("continueAfterResult");
let restartOnceMore = document.getElementById("restartOnceMore");

//Variables
let isPlayerTwo = false;
let isP1Turn = true;
let playerOneName;
let playerTwoName;
let winningPoints = 0;
let p1Points = 0;
let p2Points = 0;
let playerOneChoice = "";
let playerTwoChoice = "";

//Start page
onePlayerMode.addEventListener('click', function (e) {
    resetBtn.style.display = 'block';
    P1_Name();
});

twoPlayerMode.addEventListener('click', function (e) {
    resetBtn.style.display = 'block';
    isPlayerTwo = true;
    P1_Name();
});

//Enter names
function P1_Name() {
    topTitle.textContent = "Enter Player One's Name";
    onePlayerMode.style.display = 'none';
    twoPlayerMode.style.display = 'none';
    submitNameOne.style.display = 'block';
    nameInput.style.display = 'block';
};

submitNameOne.addEventListener('click', function (e) {
    if (nameInput.value === "") {
        playerOneName = "Player One";
    } else {
        playerOneName = nameInput.value;
    };

    if (isPlayerTwo === true) {
        P2_Name();
    } else {
        ChooseRounds();
    };
});

function P2_Name() {
    nameInput.value = "";
    topTitle.textContent = "Enter Player Two's Name";
    submitNameOne.style.display = 'none';
    submitNameTwo.style.display = 'block';
};

submitNameTwo.addEventListener('click', function (e) {
    if (nameInput.value === "") {
        playerTwoName = "Player Two";
    } else {
        playerTwoName = nameInput.value;
    };
    ChooseRounds();
});

//Choose Number of Rounds
function ChooseRounds() {
    topTitle.textContent = "Choose How Many Rounds You Wish To Play";
    submitNameOne.style.display = 'none';
    nameInput.style.display = 'none';
    submitNameTwo.style.display = 'none';

    BOO.style.display = 'block';
    BOF.style.display = 'block';
    BOS.style.display = 'block';
};

BOO.addEventListener('click', function (e) {
    winningPoints = 1;
    P1_StartTurn();
});

BOF.addEventListener('click', function (e) {
    winningPoints = 3;
    P1_StartTurn();
});

BOS.addEventListener('click', function (e) {
    winningPoints = 4;
    P1_StartTurn();
});

//Starts game, displays choices
function P1_StartTurn() {
    BOO.style.display = 'none';
    BOF.style.display = 'none';
    BOS.style.display = 'none';
    displayResult.style.display = 'none';
    continueAfterResult.style.display = 'none';

    topTitle.textContent = `${playerOneName}'s Turn`;
    displayChoice.innerText = "You Have Not Selected Anything";

    rock.style.display = 'block';
    paper.style.display = 'block';
    scissors.style.display = 'block';
    lizard.style.display = 'block';
    spock.style.display = 'block';
    displayChoice.style.display = 'block';
    submitPOneChoice.style.display = 'block';
};

rock.addEventListener('click', e => {
    if (isP1Turn === true) {
        playerOneChoice = "Rock";
        displayChoice.innerText = `You Have Selected: ${playerOneChoice}`;
    } else {
        playerTwoChoice = "Rock";
        displayChoice.innerText = `You Have Selected: ${playerTwoChoice}`;
    };
});

paper.addEventListener('click', e => {
    if (isP1Turn === true) {
        playerOneChoice = "Paper";
        displayChoice.innerText = `You Have Selected: ${playerOneChoice}`;
    } else {
        playerTwoChoice = "Paper";
        displayChoice.innerText = `You Have Selected: ${playerTwoChoice}`;
    };
});

scissors.addEventListener('click', e => {
    if (isP1Turn === true) {
        playerOneChoice = "Scissors";
        displayChoice.innerText = `You Have Selected: ${playerOneChoice}`;
    } else {
        playerTwoChoice = "Scissors";
        displayChoice.innerText = `You Have Selected: ${playerTwoChoice}`;
    };
});

lizard.addEventListener('click', e => {
    if (isP1Turn === true) {
        playerOneChoice = "Lizard";
        displayChoice.innerText = `You Have Selected: ${playerOneChoice}`;
    } else {
        playerTwoChoice = "Lizard";
        displayChoice.innerText = `You Have Selected: ${playerTwoChoice}`;
    };
});

spock.addEventListener('click', e => {
    if (isP1Turn === true) {
        playerOneChoice = "Spock";
        displayChoice.innerText = `You Have Selected: ${playerOneChoice}`;
    } else {
        playerTwoChoice = "Spock";
        displayChoice.innerText = `You Have Selected: ${playerTwoChoice}`;
    };
});

submitPOneChoice.addEventListener('click', function (e) {
    if (isPlayerTwo === true && playerOneChoice !== "") {
        P2_StartTurn();
    } else if (playerOneChoice === "") {
        displayChoice.innerText = "Please Select Before Submitting";
    } else {
        ComputerTurn();
    };
});

//Function if playing single player
async function ComputerTurn() {
    const promise = await fetch('https://rpslsapi.azurewebsites.net/RPSLS')
    const data = await promise.text();

    submitPOneChoice.style.display = 'none';
    playerTwoName = "The Singularity";
    playerTwoChoice = data;
    OpenResults();
};

//function if playing multiplayer
function P2_StartTurn() {
    isP1Turn = false;
    topTitle.textContent = `${playerTwoName}'s Turn`;
    displayChoice.innerText = "You Have Not Selected Anything";
    submitPOneChoice.style.display = 'none';
    submitPTwoChoice.style.display = 'block';
};

submitPTwoChoice.addEventListener('click', function (e) {
    if (playerTwoChoice === "") {
        displayChoice.innerText = "Please Select Before Submitting";
    } else {
        OpenResults();
    };
});

//Function displays results for current round, has logic for win/lose round condition
function OpenResults() {
    topTitle.textContent = "Round End";

    rock.style.display = 'none';
    paper.style.display = 'none';
    scissors.style.display = 'none';
    lizard.style.display = 'none';
    spock.style.display = 'none';
    submitPTwoChoice.style.display = 'none';

    displayResult.style.display = 'block';
    continueAfterResult.style.display = 'block';
    displayChoice.innerText = `${playerOneName} selected ${playerOneChoice} and ${playerTwoName} selected ${playerTwoChoice}`;

    if (playerOneChoice === playerTwoChoice) {
        displayResult.innerText = `You both selected ${playerOneChoice}. Its a Tie!`
    } else {
        switch (playerOneChoice) {
            case "Rock":
                if (playerTwoChoice === "Paper") {
                    displayResult.innerText = `Paper covers rock. ${playerTwoName} gains +1 point!`
                    p2Points++;
                } else if (playerTwoChoice === "Scissors") {
                    displayResult.innerText = `Rock crushes scissors. ${playerOneName} gains +1 point!`
                    p1Points++;
                } else if (playerTwoChoice === "Lizard") {
                    displayResult.innerText = `Rock crushes lizard. ${playerOneName} gains +1 point!`
                    p1Points++;
                } else if (playerTwoChoice === "Spock") {
                    displayResult.innerText = `Spock vaporizes rock. ${playerTwoName} gains +1 point!`
                    p2Points++;
                };
                break;
            case "Paper":
                if (playerTwoChoice === "Rock") {
                    displayResult.innerText = `Paper covers rock. ${playerOneName} gains +1 point!`
                    p1Points++;
                } else if (playerTwoChoice === "Scissors") {
                    displayResult.innerText = `Scissors cuts paper. ${playerTwoName} gains +1 point!`
                    p2Points++;
                } else if (playerTwoChoice === "Lizard") {
                    displayResult.innerText = `Lizard eats paper. ${playerTwoName} gains +1 point!`
                    p2Points++;
                } else if (playerTwoChoice === "Spock") {
                    displayResult.innerText = `Paper disproves Spock. ${playerOneName} gains +1 point!`
                    p1Points++;
                };
                break;
            case "Scissors":
                if (playerTwoChoice === "Rock") {
                    displayResult.innerText = `Rock crushes scissors. ${playerTwoName} gains +1 point!`
                    p2Points++;
                } else if (playerTwoChoice === "Paper") {
                    displayResult.innerText = `Scissors cuts paper. ${playerOneName} gains +1 point!`
                    p1Points++;
                } else if (playerTwoChoice === "Lizard") {
                    displayResult.innerText = `Scissors decapitates lizard. ${playerOneName} gains +1 point!`
                    p1Points++;
                } else if (playerTwoChoice === "Spock") {
                    displayResult.innerText = `Spock smashes scissors. ${playerTwoName} gains +1 point!`
                    p2Points++;
                };
                break;
            case "Lizard":
                if (playerTwoChoice === "Rock") {
                    displayResult.innerText = `Rock crushes lizard. ${playerTwoName} gains +1 point!`
                    p2Points++;
                } else if (playerTwoChoice === "Paper") {
                    displayResult.innerText = `Lizard eats paper. ${playerOneName} gains +1 point!`
                    p1Points++;
                } else if (playerTwoChoice === "Scissors") {
                    displayResult.innerText = `Scissors decapitates lizard. ${playerTwoName} gains +1 point!`
                    p2Points++;
                } else if (playerTwoChoice === "Spock") {
                    displayResult.innerText = `Lizard poisons Spock. ${playerOneName} gains +1 point!`
                    p1Points++;
                };
                break;
            case "Spock":
                if (playerTwoChoice === "Rock") {
                    displayResult.innerText = `Spock vaporizes rock. ${playerOneName} gains +1 point!`
                    p1Points++;
                } else if (playerTwoChoice === "Paper") {
                    displayResult.innerText = `Paper disproves Spock. ${playerTwoName} gains +1 point!`
                    p2Points++;
                } else if (playerTwoChoice === "Scissors") {
                    displayResult.innerText = `Spock smashes scissors. ${playerOneName} gains +1 point!`
                    p1Points++;
                } else if (playerTwoChoice === "Lizard") {
                    displayResult.innerText = `Lizard poisons Spock. ${playerTwoName} gains +1 point!`
                    p2Points++;
                };
                break;
        };
    };
};

//Checks if winningPoints number is met by any player
continueAfterResult.addEventListener('click', function (e) {
    if (p1Points !== winningPoints && p2Points !== winningPoints) {
        isP1Turn = true;
        P1_StartTurn();
    } else {
        endDisplay();
    };
});

//Displays the end screen
function endDisplay() {
    continueAfterResult.style.display = "none";
    restartOnceMore.style.display = "block";

    if (p1Points === winningPoints) {
        displayResult.style.display = 'none';
        topTitle.textContent = "Game End";
        displayChoice.textContent = `${playerOneName} has won! They scored ${p1Points} points while ${playerTwoName} scored ${p2Points} points.`;
    } else if (p2Points === winningPoints) {
        displayResult.style.display = 'none';
        topTitle.textContent = "Game End";
        displayChoice.textContent = `${playerTwoName} has won! They scored ${p2Points} points while ${playerOneName} scored ${p1Points} points.`;
    };
};

restartOnceMore.addEventListener('click', function (e) {
    restartGame();
});

//Button to restart game at any point
resetBtn.addEventListener('click', function (e) {
    restartGame();
});

//Function clears out everything for new game
function restartGame() {
    displayChoice.style.display = 'none';
    restartOnceMore.style.display = 'none';
    nameInput.style.display = 'none';
    submitNameOne.style.display = 'none';
    submitNameTwo.style.display = 'none';
    BOO.style.display = 'none';
    BOF.style.display = 'none';
    BOS.style.display = 'none';
    rock.style.display = 'none';
    paper.style.display = 'none';
    scissors.style.display = 'none';
    lizard.style.display = 'none';
    spock.style.display = 'none';
    displayResult.style.display = 'none';
    continueAfterResult.style.display = 'none';
    submitPOneChoice.style.display = 'none';
    submitPTwoChoice.style.display = 'none';
    resetBtn.style.display = 'none';

    onePlayerMode.style.display = 'block';
    twoPlayerMode.style.display = 'block';
    rulesBtn.style.display = 'block';
    topTitle.textContent = "Rock Paper Scissors (Lizard Spock)";

    isPlayerTwo = false;
    isP1Turn = true;
    playerOneName;
    playerTwoName;
    winningPoints = 0;
    p1Points = 0;
    p2Points = 0;
    playerOneChoice = "";
    playerTwoChoice = "";
    nameInput.value = "";
};