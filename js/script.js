let gameCounterInfo = document.getElementById("game-counter-info");
let gameRecordTimes = document.getElementById("game-record-times");
var tH = 0;
var tM = 0;
var tS = 0;
var counter;

const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

onload = function () {
    let allRecordTimes = localStorage.getItem("gameRecordTimes");

    console.log(allRecordTimes);

    gameRecordTimes.innerHTML = allRecordTimes;
};

startGame();

function startGame() {
    initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";

    cards.forEach((card) => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener("click", flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement("div");
    cardElementFace.classList.add(face);

    if (face === FRONT) {
        let iconElement = document.createElement("img");
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    }

    if (face === BACK) {
        cardElementFace.innerHTML = "&lt/&gt";
    }

    element.appendChild(cardElementFace);
}

function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add("flip");

        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("game-over");
                    let gameContent = document.getElementById("game-content");
                    let currentRecord = document.getElementById("current-record");

                    localStorage.setItem("currentRecord", gameCounterInfo.innerHTML);
                    currentRecordData = localStorage.getItem("currentRecord");

                    currentRecord.innerHTML += " " + currentRecordData;

                    saveRecordData(currentRecordData);

                    gameContent.classList.add("blur");
                    gameOverLayer.style.display = "flex";
                    gameOverLayer.style.opacity = "100%";

                    stopCounter();
                }
            }

            if (!game.checkMatch()) {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove("flip");
                    secondCardView.classList.remove("flip");
                    game.unflipCards();
                }, 1000);
            }
        }
    }
}

function start() {
    let cards = document.querySelectorAll(".card");
    let gameControls = document.getElementById("game-controls");

    gameControls.style.opacity = "0%";
    setTimeout(() => {
        gameControls.style.display = "none";
    }, 500);

    cards.forEach((card) => {
        card.classList.remove("flip");

        setTimeout(() => {
            card.classList.add("flip");
            card.click();
            setTimeout(() => {
                card.classList.remove("flip");
            }, 1000);
        }, 500);
    });

    setTimeout(startCounter, 1500);
}
function restart() {
    let gameOverLayer = document.getElementById("game-over");
    let gameContent = document.getElementById("game-content");

    gameContent.classList.remove("blur");
    gameOverLayer.style.opacity = "0%";
    gameOverLayer.style.display = "none";

    game.clearCards();
    startGame();
    start();
}

function startCounter() {
    counter = setInterval(() => {
        tS++;

        if (tS == 60) {
            tS = 0;
            tM++;
        } else if (tM == 60) {
            tM = 0;
            tH++;
        }

        gameCounterInfo.innerHTML =
            (tH >= 10 ? tH : "0" + tH) + ":" + (tM >= 10 ? tM : "0" + tM) + ":" + (tS >= 10 ? tS : "0" + tS);
        // (Se tH maior ou igual a 10 for verdadeiro será mostrado apenas tH, e se for falso será mostrado "0" + tH)
    }, 1000);
}
function stopCounter() {
    tH = 0;
    tM = 0;
    tS = 0;

    gameCounterInfo.innerHTML = "00:00:00";
    clearInterval(counter);
}

function saveRecordData(currentRecord) {
    gameRecordTimes.innerHTML += `<h2 class="game-record">${currentRecord}</h2>`;

    console.log(currentRecord);

    localStorage.setItem("gameRecordTimes", gameRecordTimes.innerHTML);
}
