let riddles = [];
let currentRiddle;
let guessCount = 0;

fetch ('socratease_data.json')
.then(response => response.json())
  .then(data => {
    riddles = data;
    getRiddle()
  });

  function getRiddle() {
    const index = new Date().getDate() % riddles.length;
    currentRiddle = riddles[index];

    document.getElementById("riddle").textContent = currentRiddle.riddle;
    document.getElementById("feedback").textContent = "";
    guessCount = 0;
}

function checkAnswer() {
    const input = document.getElementById("answerInput").value.trim().toLowerCase();
    if (!currentRiddle) return;

    if (input === currentRiddle.answer.toLowerCase()) {
        document.getElementById("feedback").textContent = currentRiddle.feedback_right;
    } else {
        guessCount++;
        if (guessCount < 3) {
            document.getElementById("feedback").textContent = "Not quite, but you're still cute 💕 Try again!";
        } else {
            document.getElementById("feedback").textContent = "Out of guesses! Click 'Reveal Answer' 💕";
        }
    }
}

function revealAnswer() {
    if (currentRiddle) {
        document.getElementById("feedback").textContent = `The answer is: ${currentRiddle.answer}. Still love you for trying 💋`;
    }
}