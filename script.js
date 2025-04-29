const clickSound = new Audio('button_click.wav');
const correctSound = new Audio('correct.wav');
const incorrectSound = new Audio('incorrect.wav');

let riddles = [];
let currentRiddle;
let guessCount = 0;

fetch ('socratease_data.json')
.then(response => response.json())
  .then(data => {
    riddles = data;
  });

  function getRiddle() {
    clickSound.play();

    clickSound.onended = () => {
        const index = new Date().getDate() % riddles.length;
        currentRiddle = riddles[index];

    const riddleElement = document.getElementById("riddle");
    riddleElement.classList.remove('loading');
    riddleElement.textContent = currentRiddle.riddle;
    document.getElementById("feedback").textContent = "";
    guessCount = 0;

    clickSound.onended = null;
    };
}

function checkAnswer() {
    clickSound.play();

clickSound.onended = () => {
    if (input === currentRiddle.answer.toLowerCase()) {
        correctSound.play();
        document.getElementById("feedback").textContent = currentRiddle.feedback_right;
    } else {
        incorrectSound.play();
        guessCount++;
        if (guessCount === 1) {
            document.getElementById("feedback").textContent = "Hmm, not quite right... but I love the way you're thinking! 🤔💘";
        } else if (guessCount === 2) {
            document.getElementById("feedback").textContent = "Almost there! If I were a riddle, you’d be the perfect answer 😘🧩";
        } else {
            document.getElementById("feedback").textContent = "Oops, out of guesses! Click 'Reveal Answer' 💋";
        }
    }

    // Clean up the event to avoid duplicate triggers
    clickSound.onended = null;
};
}

function revealAnswer() {
    clickSound.play();

    clickSound.onended = () => {
        if (currentRiddle) {
            document.getElementById("feedback").textContent =
                `The answer is: ${currentRiddle.answer}. Still love you for trying 💋`;
        }
        clickSound.onended = null;
    };
}
