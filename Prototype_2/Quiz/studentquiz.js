document.addEventListener("DOMContentLoaded", () => {

    let questions = [];
    let currentIndex = 0;

    const QUESTION_DATA = `
What is a marae mainly used for?|0:Playing sports|1:Community gathering|0:Shopping|0:Watching movies
What value means showing kindness and care?|0:Haka|1:Manaakitanga|0:Kai|0:Karakia
How should you behave on a marae?|1:Respectfully and calmly|0:Loud and playful|0:Run around|0:Ignore instructions
What should you wear to a marae?|0:Pyjamas|1:School uniform|0:Costume|1:Tidy respectful clothes
What should you do with your phone?|1:Turn it off or silence it|0:Play games|0:Take photos|0:Call friends
What is the welcome ceremony called?|0:Haka|1:Pōwhiri|0:Karakia|0:Hongi
When can you walk onto the marae?|0:Whenever you want|0:After eating|1:When welcomed|0:After talking
During speeches, you should?|1:Sit still and listen|0:Talk to friends|0:Walk around|0:Eat food
What happens after the welcome?|0:Sleeping|0:Leaving immediately|0:Playing games|1:Greeting people
What greeting involves pressing noses?|0:Harirū|1:Hongi|0:Haka|0:Karakia
What greeting is a handshake?|1:Harirū|0:Hongi|0:Haka|0:Pōwhiri
Before eating, you should?|0:Start immediately|1:Wait for karakia|0:Sit anywhere|0:Talk loudly
Who should go first when getting food?|0:Visitors|0:Students|1:Elders|0:Anyone
Is it okay to sit on tables?|0:Yes|1:No
What must you do before entering the wharenui?|1:Take off shoes|0:Clap hands|0:Run in|0:Eat food
Inside the wharenui, you should?|0:Shout|0:Run around|0:Eat snacks|1:Be quiet and respectful
Is it okay to step over people?|0:Yes|1:No
Can you take photos freely on a marae?|0:Yes|1:No
What should you do if unsure?|1:Follow your teacher|0:Guess randomly|0:Ignore rules|0:Leave
What helps you have a good experience?|0:Rushing|0:Being loud|0:Ignoring others|1:Being respectful and kind
`;

    // Elements
    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const startBtn = document.getElementById("startBtn");
    const startOverBtn = document.getElementById("startOverBtn");
    const quizCard = document.getElementById("quiz-card");
    const quizContent = document.getElementById("quiz-content");
    const progressEl = document.getElementById("progress");

    // Load questions
    function loadQuestions() {
        questions = QUESTION_DATA.trim().split("\n").map(line => {
            const parts = line.split("|");
            return {
                question: parts[0],
                answers: parts.slice(1).map(p => {
                    const [correct, text] = p.split(":");
                    return { text, correct: correct === "1" };
                })
            };
        });
    }

    // Show current question
    function showQuestion() {
    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");

    const q = questions[currentIndex];
    answersEl.innerHTML = "";

    questionEl.textContent = q.question;
    progressEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;

    q.answers.forEach(a => {
        const btn = document.createElement("button");
        btn.textContent = a.text;
        btn.onclick = () => handleAnswer(btn, a.correct);
        answersEl.appendChild(btn);
    });

    startBtn.style.display = "none";
    quizCard.classList.add("quiz-active");
}

    // Handle selected answer
    function handleAnswer(button, correct) {
        const buttons = answersEl.querySelectorAll("button");
        buttons.forEach(btn => btn.disabled = true);

        button.classList.add(correct ? "correct" : "wrong");

        setTimeout(nextQuestion, 700);
    }

    // Next question with clean fade
    function nextQuestion() {
        quizContent.classList.add("fade-out");

        setTimeout(() => {
            currentIndex++;

            if (currentIndex >= questions.length) {
                showEnd();
                return;
            }

            // Update content while faded out
            showQuestion();
            void quizContent.offsetWidth;

            // Start fade in
            quizContent.classList.remove("fade-out");
            quizContent.classList.add("fade-in");
            setTimeout(() => {
                quizContent.classList.remove("fade-in");
            }, 450);
        }, 400);
    }

    // Show end screen
    function showEnd() {
        quizContent.classList.add("fade-out");

        setTimeout(() => {
            quizContent.innerHTML = `
                <h2 id="question">Quiz Complete!</h2>
                <div id="answers"></div>
            `;

            progressEl.textContent = "Finished";
            void quizContent.offsetWidth;
            quizContent.classList.remove("fade-out");
            quizContent.classList.add("fade-in");
            setTimeout(() => {
                quizContent.classList.remove("fade-in");
            }, 450);
        }, 400);
    }

    // Reset quiz
function startAtQuestionOne() {
    currentIndex = 0;
    showQuestion();
}

function restartAtQuestionOne() {
    currentIndex = 0;
    showQuestion();
}


document.getElementById("startBtn").onclick = startAtQuestionOne;
startOverBtn.onclick = restartAtQuestionOne;

    loadQuestions();
});