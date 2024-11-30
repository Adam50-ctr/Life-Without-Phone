"use strict";

// Set const
const allCards = document.querySelectorAll(".cards > div");
const cardsContainer = document.querySelector(".cards"); //The whole card container
let pageNum = 1;
const answers = {};
const fisnishBtn = document.querySelector("#finsihBtn");
const questionSection = document.querySelector(".questions");
const AResults = document.querySelector(".A-result.hidden");
const BResults = document.querySelector(".B-result.hidden");
const CResults = document.querySelector(".C-result.hidden");
const DResults = document.querySelector(".D-result.hidden");
const resultSection = document.querySelector(".result");

// Upgrade cards
function updateCards() {
  allCards.forEach((card, index) => {
    if (index === pageNum - 1) {
      card.classList.add("active");
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
      card.classList.remove("active");
    }
  });

  // Change the height when we reached the 10th card
  if (pageNum === 10) {
    cardsContainer.style.height = "37rem";
  } else {
    cardsContainer.style.height = "32rem";
  }
}

// Collect the answers
function collectAnswer() {
  const currentCard = allCards[pageNum - 1]; // The actual cards
  const selectedOption = currentCard.querySelector(
    'input[type="radio"]:checked'
  );
  if (selectedOption) {
    answers[`question${pageNum}`] = selectedOption.value;
  } else {
    answers[`question${pageNum}`] = null; // If no answer
  }
}

// The most frequent answer detect
function getMostFrequentAnswer(answers) {
  const counts = { A: 0, B: 0, C: 0, D: 0 };

  Object.values(answers).forEach((answer) => {
    if (answer && counts[answer] !== undefined) {
      counts[answer]++;
    }
  });

  const max = Math.max(...Object.values(counts));
  const mostFrequent = Object.keys(counts).filter((key) => counts[key] === max);
  return mostFrequent.length === 1 ? mostFrequent[0] : mostFrequent;
}

// Automatic step to the next question when you click an answer
function handleAnswerChange(event) {
  collectAnswer();
  if (pageNum < allCards.length) {
    pageNum++;
    updateCards();
  } else {
    // The most frequen answer
    const mostFrequent = getMostFrequentAnswer(answers);
    console.log("The most frequent:", mostFrequent);
  }
}

function addRadioListeners() {
  allCards.forEach((card) => {
    const options = card.querySelectorAll('input[type="radio"]');
    options.forEach((option) => {
      option.addEventListener("change", handleAnswerChange);
    });
  });
}

// show the results by the answers
fisnishBtn.addEventListener("click", function () {
  questionSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
  const mostFrequent = getMostFrequentAnswer(answers);
  if (mostFrequent === "A") {
    AResults.classList.remove("hidden");
  } else if (mostFrequent === "B") {
    BResults.classList.remove("hidden");
  } else if (mostFrequent === "C") {
    CResults.classList.remove("hidden");
  } else {
    DResults.classList.remove("hidden");
  }
});

// call functions
updateCards();
addRadioListeners();
