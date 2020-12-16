"use strict";
let user = document.getElementsByClassName('github-username'),
	player1 = document.getElementById('player-one'),
	player2 = document.getElementById('player-two'),       
	form1 = document.getElementById('form1'),
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
	player1.style.display = "none";
	player2.style.display = "block";
	return false;
};

// Function that initiates player 2 input
function secondForm() {
	let confirmPage = document.getElementById('confirm-page');
	player2.style.display = "none";
	confirmPage.style.display = "block";
     
// Function that fetches users data from input
function fetchUsers() {
	let user1, user2;
	 fetch("https://api.github.com/users/" +user[0].value)
		.then(function (response) {
		return response.json();
	})
		.then(function (data) {
		// Log the data to the console
 		console.log(data);
 		// Cache the data to a variable
 		user1 = data;
		let myUser1 = document.getElementById('user1-container'),
			totalScore = (1* user1.followers + 1* user1.following + 0.5* user1.public_repos);
		myUser1.innerHTML = `<ul class="user-info">
<p id="firstPlayer"> Player 1 </p>
<li id="score">Score: <span class="totalScr"> ${totalScore}</span> </li>
<li><img class="avatar" src="${user1.avatar_url}"></li>
<li>Name: ${user1.name} </li>
<li>Username: ${user1.login} </li>
<li>Following: ${user1.following} </li>
<li>Followers: ${user1.followers} </li>
<li>Repository: ${user1.public_repos} </li>
</ul>`;
		//Make another API call and pass it into the stream
 		return fetch("https://api.github.com/users/" +user[1].value)
		.then(function (response) {
		//Get a JSON object from the response
		return response.json();
		})
	})
		.then(function (data) {
		//Log the data to the console
		console.log(data);
		// Cache the data to a variable
		user2 = data;
		//Now that you have both APIs back, you can do something with the data
		let myUser2 = document.getElementById('user2-container'),
			totalScore2 = (1* user2.followers + 1* user2.following + 0.5* user2.public_repos);
		myUser2.innerHTML = `<ul class="user-info">
<p id="secondPlayer"> Player 2 </p>
<li id="score2">Score: <span class="totalScr"> ${totalScore2}</span> </li>
<li><img class="avatar" src="${user2.avatar_url}"></li>
<li>Name: ${user2.name} </li>
<li>Username: ${user2.login} </li>
<li>Following: ${user2.following} </li>
<li>Followers: ${user2.followers} </li>
<li>Repository: ${user2.public_repos} </li>
</ul>`;
	})
};
	
fetchUsers();
setTimeout(function() {
	document.getElementById('control-buttons').style.display = "block";
	playAgain.style.display = "none";
}, 1500);
	return false;
};
//Function that assign users score and winner
initiate.onclick = function () {
	document.getElementById("confirm-players").innerHTML = "Winner";
	document.getElementById('score').style.display = "block";
	document.getElementById('score2').style.display = "block";
	initiate.style.display = "none";
	reSelect.style.display = "none";
	playAgain.style.display = "block";
	
	let totalScr = document.getElementsByClassName("totalScr"),
		totalScr1 = parseFloat (totalScr[0].innerText),
		totalScr2 = parseFloat(totalScr[1].innerText);

	if (totalScr1 > totalScr2) {
		document.getElementById("firstPlayer"). innerHTML = "Winner";
		document.getElementById("secondPlayer"). innerHTML = "Loser";
	}else if ( totalScr1 < totalScr2) {
		document.getElementById("firstPlayer"). innerHTML = "Loser";
      	document.getElementById("secondPlayer"). innerHTML = "Winner";
	}else {
		confirm("IT'S A TIE, PLAY AGAIN");
	};
};

reSelect.onclick = function () {
	document.getElementById('confirm-page').style.display = "none";
	player1.style.display = "block"; 
	user[0].value = null;
	user[1].value = null;
};

playAgain.onclick = function () {
  //Make this function start the game again, following the usual pattern
	location.reload();
};
