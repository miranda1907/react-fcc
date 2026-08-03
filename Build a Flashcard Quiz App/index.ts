interface FlashCard {
  questionText: string;
  questionAnswer: string;
}

class InvalidUserInputError extends Error {}

let currentCards: FlashCard[] = [];

const currentCard = document.querySelector("#flashcard")! as HTMLElement;
const deleteButton = document.querySelector("#delete-btn")! as HTMLButtonElement;

const entryForm = document.querySelector("#entry-form")! as HTMLFormElement;

const addButton = document.querySelector('#add-button') as HTMLButtonElement;

const frontTextInput = document.querySelector("#front-text") as HTMLTextAreaElement;

const backTextInput = document.querySelector("#back-text") as HTMLTextAreaElement; 

let currentCardIndex = -1;


entryForm.addEventListener(
  "submit", (e) => {
    e.preventDefault();

    if (
    frontTextInput.value.trim() === "" ||
    backTextInput.value.trim() === ""
  ) {
    throw new InvalidUserInputError();
  }

    currentCards.push(
      {questionText: frontTextInput.value,
      questionAnswer: backTextInput.value}
    );
     currentCardIndex = currentCards.length - 1;
     currentCard.textContent = currentCards[currentCardIndex].questionText;
  });

  currentCard.addEventListener("click", () => {
currentCard.classList.add("flipped");

});

deleteButton.addEventListener("click", () => {
  currentCards.splice(currentCardIndex, 1);

  currentCardIndex--;

  if (currentCardIndex >= 0) {
    currentCard.textContent =
      currentCards[currentCardIndex].questionText;
  } else {
    currentCard.textContent = "";
    currentCardIndex = -1;
  }
});

