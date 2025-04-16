const riddles = [
    {
        question: "I speak without a mouth and hear without ears. What am I?"
        , answer: "echo",
        flirtyResponses: [
            "Nope, try again smartie 😘"
            , "Close... but not quite! You're still my favourite mind 😘"
            , "Ooh, I like how you think... but not the answer 😘"
        ],
        successMessage: "Correct! You're echoing straight into my heart 💕"
    }

];

let currentRiddle;
let guessCount = 0;

function getRiddle() {
    const today = new Date().getDate() % riddles.length;
    currentRiddle = riddles[today];
    document.getElementById("riddle").textContent = currentRiddle.question;
    document.getElementById("feedback").textContent = "";
    guessCount = 0;  
}

function checkAnswer() {
    const input = document.getElementById("answerInput").value.trim().toLowerCase();
    if (!currentRiddle) return;

    if (input === currentRiddle.answer.toLowerCase()) {
        document.getElementById("feedback").textContent = currentRiddle.successMessage;
    } else {
        guessCount++;
        if (guessCount < 3) {
            document.getElementById("feedback").textContent = currentRiddle.flirtyResponses[guessCount - 1];
        } else {
            document.getElementById("feedback").textContent = "Out of guesses! Click 'Reveal Answer' 💕"
        }
    }
}

function revealAnswer() {
    if (currentRiddle) {
        document.getElementById("feedback").textContent = "The answer is: ${currentRiddle.answer}. Still love you for trying 💋";
    }
}