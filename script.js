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
    const input = document.getElementById("answerInput").value.trim().toLowerCase();
    if (!currentRiddle) return;

    // Play click sound first
    clickSound.play();

    // After click sound ends, evaluate answer and play correct/incorrect sound
    clickSound.onended = () => {
        let feedback = "";

        if (input === currentRiddle.answer.toLowerCase()) {
            correctSound.play();
            feedback = currentRiddle.feedback_right;
        } else {
            guessCount++;
            incorrectSound.play();

            if (guessCount === 1) {
                feedback = "Hmm, not quite right... but I love the way you're thinking! 🤔💘";
            } else if (guessCount === 2) {
                feedback = "Almost there! If I were a riddle, you’d be the perfect answer 😘🧩";
            } else {
                feedback = "Oops, out of guesses! Click 'Reveal Answer' 💋";
            }
        }

        document.getElementById("feedback").textContent = feedback;

        // Clear event handler after use to avoid stacking
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
