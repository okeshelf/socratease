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
    clickSound.currentTime = 0;
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
    const input = document.getElementById("answerInput").value.trim().toLowerCase();
    if (!currentRiddle) return;

    clickSound.currentTime = 0;
    clickSound.play();  // Play button click immediately

    let feedback = "";

    if (input === currentRiddle.answer.toLowerCase()) {
        feedback = currentRiddle.feedback_right;
        setTimeout(() => {
            correctSound.currentTime = 0;
            correctSound.play();
        }, 200); // Delay to follow click sound
    } else {
        guessCount++;
        setTimeout(() => {
            incorrectSound.currentTime = 0;
            incorrectSound.play();
        }, 200);

        if (guessCount === 1) {
            feedback = "Hmm, not quite right... but I love the way you're thinking! 🤔💘";
        } else if (guessCount === 2) {
            feedback = "Almost there! If I were a riddle, you’d be the perfect answer 😘🧩";
        } else {
            feedback = "Oops, out of guesses! Click 'Reveal Answer' 💋";
        }
    }

    document.getElementById("feedback").textContent = feedback;
}


function revealAnswer() {
    clickSound.currentTime = 0;
    clickSound.play();

    if (currentRiddle) {
        document.getElementById("feedback").textContent =
            `The answer is: ${currentRiddle.answer}. Still love you for trying 💋`;
    }
}