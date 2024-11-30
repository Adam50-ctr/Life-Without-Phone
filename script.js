"use strict";

// select items
const submitBtn = document.querySelector(".submit-btn");
const hours = document.querySelector("#hours");
const firstSection = document.querySelector("#article1");
const secondSection = document.querySelector("#article2");
const books = document.querySelector("#books");
const languages = document.querySelector("#languages");
const run = document.querySelector("#run");
const checkmarkContainer = document.getElementById("checkmark-container");
const dayCounter = document.querySelector(".dayCounter");
const bookhours = document.querySelector("#hoursperday");
const booksNumber = document.querySelector("#booksNumber");
const languageHours = document.querySelector("#hoursperday__language");
const learnedLanguage = document.querySelector("#learnedLanguage");
const sporthours = document.querySelector("#sporthours");
const sportkilometers = document.querySelector("#sportkilometers");

// Scroll down to the target area
const scrollDown = function () {
  secondSection.scrollIntoView({
    top: secondSection,
    behavior: "smooth",
  });
};

// transform the text
const transform = function () {
  // hide and appear sections
  firstSection.classList.add("hidden");
  secondSection.classList.remove("hidden");

  // set the text on the card
  const inputNumber = Number(hours.value) * 365;

  // a functuion that select two long words
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  books.innerHTML = truncateText(
    (books.innerHTML = `Unlock knowledge by reading <strong>${Math.floor(
      inputNumber / 5
    )} books. </strong> `),
    50
  );
  languages.innerHTML = truncateText(
    `Master <strong>${Math.floor(inputNumber / 700)} ${
      Math.floor(inputNumber / 700) > 1 ? "different languages" : "language"
    }</strong> this year.`,
    60
  );
  run.innerHTML = truncateText(
    `Train hard to run <strong>${inputNumber * 6} km/h</strong> this year.`,
    40
  );

  dayCounter.innerHTML = `Save ${Math.floor(
    inputNumber / 24
  )} days a year without phone.`;

  // write out the details in the text about the skills
  bookhours.innerHTML = `${hours.value}`;
  booksNumber.innerHTML = `${Math.floor(inputNumber / 5)}`;
  languageHours.innerHTML = `${hours.value}`;
  learnedLanguage.innerHTML = `${Math.floor(inputNumber / 700)}`;
  sporthours.innerHTML = `${hours.value}`;
  sportkilometers.innerHTML = `${inputNumber * 6}`;

  scrollDown();
};

// Check the input
const Checker = function () {
  const inputValue = hours.value.trim();
  if (!isNaN(inputValue) && inputValue !== "") {
    transform();
  } else {
    alert("Please enter a Number");
  }
};

// when click the the submit button
submitBtn.addEventListener("click", Checker);

// when press the enter
hours.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    Checker();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const checkmarkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Checkmark animáció indítása");
          checkmarkContainer.classList.add(
            "show-checkmark",
            "animate-checkmark"
          );
          checkmarkObserver.unobserve(checkmarkContainer);
        }
      });
    },
    {
      threshold: 1, //it has to be visible all of the item
    }
  );
  checkmarkObserver.observe(checkmarkContainer);

  // underline function
  const skillTitles = document.querySelectorAll(
    "#book__underline, #language__underline, #sport__underline"
  );

  const underlineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // underline appearing
        }
      });
    },
    {
      threshold: 1, //the whole item needs to be visible
    }
  );

  skillTitles.forEach((title) => underlineObserver.observe(title)); // whole subtitle looking
});
