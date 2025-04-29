const clickSound = new Audio('button_click.wav');

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
    const index = new Date().getDate() % riddles.length;
    currentRiddle = riddles[index];

    const riddleElement = document.getElementById("riddle");
    riddleElement.classList.remove('loading');
    riddleElement.textContent = currentRiddle.riddle;
    document.getElementById("feedback").textContent = "";
    guessCount = 0;
}

function checkAnswer() {
    clickSound.play();
    const input = document.getElementById("answerInput").value.trim().toLowerCase();
    if (!currentRiddle) return;

    if (input === currentRiddle.answer.toLowerCase()) {
        document.getElementById("feedback").textContent = currentRiddle.feedback_right;
    } else {
        guessCount++;
        if (guessCount === 1) {
            document.getElementById("feedback").textContent = "Hmm, not quite right... but I love the way you're thinking! 🤔💘";
        } else if (guessCount === 2) {
            document.getElementById("feedback").textContent = "Almost there! If I were a riddle, you’d be the perfect answer 😘🧩";
        } else {
            document.getElementById("feedback").textContent = "Oops, out of guesses! Click 'Reveal Answer' 💋";
        }
    }
}

function revealAnswer() {
    clickSound.play();
    if (currentRiddle) {
        document.getElementById("feedback").textContent = `The answer is: ${currentRiddle.answer}. Still love you for trying 💋`;
    }
}