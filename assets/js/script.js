// Global Variable declaration
var cardContainer = document.getElementById("gameCards");
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var winModal = document.getElementById("win-modal");

// Event listener for a click on a card
cardContainer.addEventListener("click", handleClick);

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
    cardContainer.removeEventListener("click", handleClick);

    if (firstCardClasses === secondCardClasses) {
      cardContainer.addEventListener("click", handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      if(matches===maxMatches){
        winModal.classList.remove("hidden");
      }
    } else {
      setTimeout(unhide, 1500);
    }
  }
}

function unhide(){
  firstCardClicked.classList.remove("hidden");
  secondCardClicked.classList.remove("hidden");
  cardContainer.addEventListener("click", handleClick);
  firstCardClicked = null;
  secondCardClicked = null;
}
