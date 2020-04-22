// Global Variable declaration
var cardContainerEle = document.getElementById("gameCards");
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
// The modal which will inform the user they have won
var winModalEle = document.getElementById("win-modal");
var attempts = 0;
var gamesPlayed = 0;
// Stats column elements
var gamesPlayedEle = document.getElementById("games-played");
var attemptsEle = document.getElementById("attempts");
var accuracyEle = document.getElementById("accuracy");

// Event listener for a click on a card
cardContainerEle.addEventListener("click", handleClick);

// Handles the click on the cards
function handleClick(event){
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }

  event.target.classList.add("hidden");

  if (!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.classList.value;
  } else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.classList.value;
    cardContainerEle.removeEventListener("click", handleClick);

    if (firstCardClasses === secondCardClasses) {
      cardContainerEle.addEventListener("click", handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      attempts++;
      displayStats();
      if(matches===maxMatches){
        winModalEle.classList.remove("hidden");
      }
    } else {
      setTimeout(unhide, 1500);
    }
  }
}

function unhide(){
  firstCardClicked.classList.remove("hidden");
  secondCardClicked.classList.remove("hidden");
  cardContainerEle.addEventListener("click", handleClick);
  firstCardClicked = null;
  secondCardClicked = null;
  attempts++;
  displayStats();
}

function displayStats(){
  gamesPlayedEle.textContent = gamesPlayed;
  attemptsEle.textContent = attempts;
  accuracyEle.textContent = calculateAccuracy(matches, attempts);
}

function calculateAccuracy(matches, attempts){
  return `${Math.floor((matches / attempts) * 100)}%`;
}
