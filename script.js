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
    // Show hearts while the riddle is being fetched
    document.getElementById("loading-heart").style.display = "inline-block";  // Show the first heart
    document.getElementById("loading-heart2").style.display = "inline-block"; // Show the second heart
    document.getElementById("loading-heart3").style.display = "inline-block"; // Show the third heart
    document.getElementById("riddle").style.display = "none";  // Hide riddle initially
    document.getElementById("feedback").textContent = "";  // Clear feedback
    guessCount = 0;  // Reset guesses

    // Fetch a new riddle after a short delay (simulate loading time)
    setTimeout(() => {
        const index = new Date().getDate() % riddles.length;
        currentRiddle = riddles[index];

        document.getElementById("riddle").textContent = currentRiddle.riddle;
        document.getElementById("riddle").style.display = "block";  // Show the riddle
        document.getElementById("loading-heart").style.display = "none";  // Hide hearts after riddle is shown
        document.getElementById("loading-heart2").style.display = "none"; 
        document.getElementById("loading-heart3").style.display = "none"; 
    }, 2000);  // Simulate a 2-second loading time (you can adjust this)
}

function checkAnswer() {
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
    if (currentRiddle) {
        document.getElementById("feedback").textContent = `The answer is: ${currentRiddle.answer}. Still love you for trying 💋`;
    }
}