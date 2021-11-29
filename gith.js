"use strict";
let users = document.getElementsByClassName('github-username'),
    player1 = document.getElementById('player-one'),
    player2 = document.getElementById('player-two'),
    form1 = document.getElementById('form1'),
    player = [],
    form2 = document.getElementById('form2'),
    cont1 = document.getElementById('continue1'),
    cont2 = document.getElementById('continue2'),
    reSelect = document.getElementById('reselect-players'),
    playAgain = document.getElementById('play-again'),
    initiate = document.getElementById('initiate-battle');

// Function that activate the start button
function getStarted() {
    let startPage = document.getElementById('startPage'),
        startBtn = document.getElementById('get-started-button');
    startBtn.onclick = function() {
        startPage.style.display = "none";
        player1.style.display = "block";
    };
};
getStarted();

// Function that initiates player 1 input
function firstForm() {
    // Function that fetches users data from input
    (async() => {
        let res = await fetch("https://api.github.com/users/" + users[0].value);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        player1.style.display = "none";
        player2.style.display = "block";
        return res.json()
            .then((data) => {
                // Log the data to the console
                console.log(data);
                player[0] = data;
            });

    })().catch(function(err) {
        alert(`Player not found, ${users[0].value} is not an active user. Please try again!`);
        form1.reset();
        console.log(err);
    })
    return false;
};

// Function that initiates player 2 input
function secondForm() {
    let confirmPage = document.getElementById('confirm-page');
    (async() => {
        let res = await fetch("https://api.github.com/users/" + users[1].value);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        player2.style.display = "none";
        confirmPage.style.display = "block";
        return res.json()
            .then((data) => {
                // Log the data to the console
                console.log(data);
                player[1] = data;
            });

    })().catch(function(err) {
        alert(`Player not found, ${users[1].value} is not an active user. Please try again!`);
        form2.reset();
        console.log(err);
    });

    document.getElementById('userDiv').innerHTML = `<div id="spinner" class ="lds-spinner">
    <div></div> 
    <div></div> 
    <div></div> 
    <div></div> 
    <div></div> 
    <div></div> 
    <div></div> 
    <div></div> 
    <div></div>
    <div></div> 
    <div></div> 
    <div></div>
</div>`

    //function that calculate users scores
    function calculateScores(k) {
        return (1 * k.followers + 1 * k.following + 0.5 * k.public_repos);
    };

    //function that create user profile
    function userProfile(k, num) {
        return `<div id="user-container" class="myUser"></div>
                            <ul>
                                <p class="playersDetails"> Player ${num} </p>
                                <li class="score">Score: <span class="totalScr"> ${calculateScores(k)}</span> </li>
                                <li><img class="avatar" src="${k.avatar_url}"></li>
                                <li class="info">Name: ${k.name} </li>
                                <li class="info">Username: ${k.login} </li>
                                <li class="info">Following: ${k.following} </li>
                                <li class="info">Followers: ${k.followers} </li>
                                <li class="info">Repository: ${k.public_repos} </li>
                            </ul>
                        </div>`;
    }

    setTimeout(function() {
            document.getElementById('userDiv').innerHTML = userProfile(player[0], 1) + userProfile(player[1], 2);
            document.getElementById('control-buttons').style.display = "block";
        },
        1500);
    playAgain.style.display = "none";
    return false;
};

//Function that assign users score and winner
initiate.onclick = function() {
    document.getElementById("confirm-players").innerHTML = "Winner";
    initiate.style.display = "none";
    reSelect.style.display = "none";
    playAgain.style.display = "block";

    let totalScr = document.getElementsByClassName("totalScr"),
        totalScr1 = parseFloat(totalScr[0].innerText),
        totalScr2 = parseFloat(totalScr[1].innerText);

    if (totalScr1 > totalScr2) {
        document.getElementsByClassName("playersDetails")[0].innerHTML = "Winner";
        document.getElementsByClassName("playersDetails")[1].innerHTML = "Loser";

    } else if (totalScr1 < totalScr2) {
        document.getElementsByClassName("playersDetails")[0].innerHTML = "Loser";
        document.getElementsByClassName("playersDetails")[1].innerHTML = "Winner";
    } else {
        confirm("IT'S A TIE, PLAY AGAIN");
    };


    let scores = document.querySelectorAll(".score");
    scores[0].style.display = "block";
    scores[1].style.display = "block";
};

reSelect.onclick = function() {
    document.getElementById('confirm-page').style.display = "none";
    player1.style.display = "block";
    users[0].value = null;
    users[1].value = null;
};

playAgain.onclick = function() {
    //Make this function start the game again, following the usual pattern
    location.reload();
}
