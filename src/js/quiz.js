export function initQuiz(container) {
    container.innerHTML = `
        <div id="quiz-app">
            <div id="start-screen">
                <h2>Welcome to the Quiz Game!</h2>
                <input type="text" id="username-input" placeholder="Enter your nickname...">
                <button id="start-btn">Start</button>
            </div>

            <div id="quiz-container" style="display: none;">
                <h3 id="question-text"></h3>
                <div id="options-container"></div>
                <p id="progress"></p>
            </div>

            <div id="result-container" style="display: none;">
                <h2>Quiz Result</h2>
                <p id="final-score"></p>
                <div id="answer-details"></div>
                <button id="restart-btn">Restart</button>
            </div>
        </div>
    `;

    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
    let username = "";

    const quizData = [
        { question: "5 + 3 = ?", options: ["6", "7", "8", "9"], answer: 2 },
        { question: "12 + 7 = ?", options: ["19", "20", "21", "22"], answer: 0 },
        { question: "9 + 6 = ?", options: ["13", "14", "15", "16"], answer: 2 },
        { question: "3 + 4 = ?", options: ["5", "6", "7", "8"], answer: 2 },
        { question: "8 + 2 = ?", options: ["9", "10", "11", "12"], answer: 1 },
        { question: "7 + 5 = ?", options: ["11", "12", "13", "14"], answer: 1 },
        { question: "4 + 9 = ?", options: ["12", "13", "14", "15"], answer: 1 }
    ];

    document.getElementById("start-btn").addEventListener("click", () => {
        username = document.getElementById("username-input").value.trim();
        if (username === "") {
            alert("Enter your nickname!");
            return;
        }
        document.getElementById("start-screen").style.display = "none";
        document.getElementById("quiz-container").style.display = "block";
        loadQuestion();
    });

    function loadQuestion() {
        const questionData = quizData[currentQuestionIndex];
        document.getElementById("question-text").innerText = questionData.question;

        const optionsContainer = document.getElementById("options-container");
        optionsContainer.innerHTML = "";
        questionData.options.forEach((option, index) => {
            const btn = document.createElement("button");
            btn.classList.add("option-btn");
            btn.innerText = option;
            btn.onclick = () => checkAnswer(index);
            optionsContainer.appendChild(btn);
        });

        document.getElementById("progress").innerText = `Question ${currentQuestionIndex + 1} / ${quizData.length}`;
    }

    function checkAnswer(selectedIndex) {
        userAnswers.push({ question: currentQuestionIndex + 1, correct: selectedIndex === quizData[currentQuestionIndex].answer });

        if (selectedIndex === quizData[currentQuestionIndex].answer) {
            score++;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        document.getElementById("quiz-container").style.display = "none";
        document.getElementById("result-container").style.display = "block";

        document.getElementById("final-score").innerText = `${username}, you have ${score} correct and ${quizData.length - score} wrong answers!`;
    }

    document.getElementById("restart-btn").addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        username = "";

        document.getElementById("result-container").style.display = "none";
        document.getElementById("start-screen").style.display = "block";
    });
}
