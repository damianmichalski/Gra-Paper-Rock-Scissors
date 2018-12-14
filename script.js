"use strict";
window.onload = function () {
    var params = {
        computerScore: 0,
        playerScore: 0,
        roundsNumber: 0,
        newGame: document.getElementById("new-game"),
        outputInfo: document.getElementById("outputInfo"),
        outputModal: document.getElementById("game-content"),
        buttons: document.getElementById("buttons"),
        players: document.getElementById("players"),
        playerScoreText: document.getElementById("playerScore"),
        computerScoreText: document.getElementById("computerScore"),
        output: document.getElementById("output"),
        outputNewGame: document.getElementById("outputNewGame"),
        progress: [],
        tableContent: document.getElementById("content-results"),
    }


    var btnPlayerMove = document.querySelectorAll('.player-move');

    for (var i = 0; i < btnPlayerMove.length; i++) {
        var dataMove = btnPlayerMove[i].getAttribute('data-move');
        btnPlayerMove[i].addEventListener('click', function () {
            makeUserChoice(dataMove);
        });
    }

    function restartGame() {
        params.computerScore = 0;
        params.playerScore = 0;
        params.progress.computerMove = 0;
        params.progress.playerMove = 0;
        setText();
        params.roundsNumber = getNumber();
        params.outputNewGame.innerHTML = "";

    }
   function showModal() {
        document.querySelector("#modal").classList.add("show");
        document.querySelector("#modal-overlay").classList.add("show");

       for (var i = 0; i < params.progress.length; i++) {
           params.tableContent.innerHTML +=  '<tr><td>' + params.progress[i].playerMove + '</td><td>' + params.progress[i].computerMove + '</td></tr>';
       }
    };

    function getNumber() {
        var number = window.prompt("Podaj ile rund wygrywa całą grę?!");
        if (!isFinite(number)) {
            params.outputInfo.innerHTML =
                '<div class="alert alert-danger">To nie jest liczba</div>';
            return;
        } else if (number == "") {
            params.outputInfo.innerHTML =
                '<div class="alert alert-danger">Nie podałeś żadnej liczby</div>';
            return;
        } else {
            params.newGame.style.display = "none";
            params.outputInfo.style.display = "none";
            params.buttons.style.display = "";
            params.players.style.display = "";
            return number;
        }

    }

    function setText(txt) {
        params.playerScoreText.innerHTML = params.playerScore;
        params.computerScoreText.innerHTML = params.computerScore;
        params.output.innerHTML = txt || ""; //jeżeli nie ma żadnego tekstu (undefined) wtedy wstawiamy pusty ciąg
        if (params.playerScore >= params.roundsNumber || params.computerScore >= params.roundsNumber) {
            params.outputModal.innerHTML = '<div class=\"alert alert-info\" role=\"alert\">Gra zakończona! Liczba odbytych rund: '+params.roundsNumber+'</div>';
            params.buttons.style.display = "none";
            if (params.playerScore == params.roundsNumber) {
                params.outputModal.innerHTML += "<div class=\"alert alert-success\" role=\"alert\"><strong>Gratuluję</strong> wygrałeś!</div>";
            } else {
                params.outputModal.innerHTML += "<div class=\"alert alert-warning\" role=\"alert\">Niestety wygrał komputer!</div>";
            }
            params.newGame.style.display = "";
        }

    }

    function makeComputerChoice() {
        var computerChoice = "";
        var r = Math.random();
        if (r < 0.33) {
            computerChoice = "rock";
        } else if (r < 0.66) {
            computerChoice = "paper";
        } else {
            computerChoice = "scissors";
        }
        return computerChoice;
    }

    function makeUserChoice(userChoice) {
        var computerChoice = makeComputerChoice();
        var outcome = "";

        if (userChoice == computerChoice) {
            outcome = "Remis!";
        } else if (
            (userChoice == "rock" && computerChoice == "scissors") ||
            (userChoice == "scissors" && computerChoice == "paper") ||
            (userChoice == "paper" && computerChoice == "rock")
        ) {
            outcome = "Wygrałeś!";
            params.playerScore++;
        } else {
            outcome = "Przegrałeś,";
            params.computerScore++;
        }
        setText(userChoice + " vs " + computerChoice + " = " + outcome);
        params.progress.push(
            {
                computerMove: params.computerScore,
                playerMove: params.playerScore,
            }
        );
        if(params.playerScore >= params.roundsNumber || params.computerScore >= params.roundsNumber) {
            showModal();
        }
    }
    params.newGame.addEventListener("click", restartGame);

    var hideModal = function(event) {
        event.preventDefault();
        document.querySelector("#modal-overlay").classList.remove("show");
        document.querySelector("#modal").classList.remove("show");
    };

    var closeButtons = document.querySelectorAll(".modal .close");

    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", hideModal);
    }

    document.querySelector("#modal-overlay").addEventListener("click", hideModal);
};
