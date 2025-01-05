export function initQuiz (container) {
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
                <button id="next-btn" style="display: none;">Next</button>
                <p id="progress"></p>
            </div>

            <div id="result-container" style="display: none;">
                <h2>Quiz Result</h2>
                <p id="final-score"></p>
                <div id="answer-details"></div>
                <button id="restart-btn">Restart</button>
            </div>
        </div>
    `

  let currentQuestionIndex = 0
  let score = 0

  let username = ''

  const quizData = [
    {
      question: 'What is the most important factor that determines the <<this>> binding in JavaScript?',
      options: ['Where the function is defined', 'The scope of variables', 'How the function is called', 'The type of variable'],
      answer: 2
    },
    {
      question: 'What is the key difference between <<map()>> and <<forEach()>> in JavaScript?',
      options: ['map() returns a new array, forEach() does not.', 'forEach() is faster.', 'map() only works with objects.', 'forEach() does not create a loop.'],
      answer: 0
    },
    {
      question: 'What condition must be met for an NxN matrix to have an inverse?',
      options: ['All elements must be positive', 'Its determinant must not be 0', 'Rows and columns must be equal', 'It must be symmetric'],
      answer: 1
    },
    {
      question: 'Which countrys football league does FC Midtjylland belong to?',
      options: ['Norway', 'Sweden', 'Denmark', 'Germany'],
      answer: 2
    },
    {
      question: 'Which is Swedens top-tier football league?',
      options: ['Allsvenskan', 'Eliteserien', 'Superligan', 'Premierligan'],
      answer: 0
    },
    {
      question: 'Which of the following cities was not a Viking settlement?',
      options: ['Uppsala', 'Sigtuna', 'Västerås', 'Eskilstuna'],
      answer: 3
    },
    {
      question: 'Which of the following was one of the allies of the Swedish Empire in the Great Northern War?',
      options: ['Norway', 'Crimean Khanate', 'Saxony', 'Duchy of Courland'],
      answer: 1
    }
  ]

  document.getElementById('start-btn').addEventListener('click', () => {
    username = document.getElementById('username-input').value.trim()
    if (username === '') {
      alert('Enter your nickname!')
      return
    }
    document.getElementById('start-screen').style.display = 'none'
    document.getElementById('quiz-container').style.display = 'block'
    loadQuestion()
  })

  function loadQuestion () {
    const questionData = quizData[currentQuestionIndex]
    document.getElementById('question-text').innerText = questionData.question

    const optionsContainer = document.getElementById('options-container')
    optionsContainer.innerHTML = ''
    document.getElementById('next-btn').style.display = 'none'

    questionData.options.forEach((option, index) => {
      const btn = document.createElement('button')
      btn.classList.add('option-btn')
      btn.innerText = option
      btn.onclick = () => checkAnswer(index, btn)
      optionsContainer.appendChild(btn)
    })

    document.getElementById('progress').innerText = `Question ${currentQuestionIndex + 1} / ${quizData.length}`
  }

  function checkAnswer (selectedIndex, selectedButton) {
    const questionData = quizData[currentQuestionIndex]
    const allButtons = document.querySelectorAll('.option-btn')

    allButtons.forEach((btn, index) => {
      if (index === questionData.answer) {
        btn.classList.add('correct')
      }
      if (index === selectedIndex && selectedIndex !== questionData.answer) {
        btn.classList.add('wrong')
      }
      btn.disabled = true
    })

    if (selectedIndex === questionData.answer) {
      score++
    }

    document.getElementById('next-btn').style.display = 'block'
  }

  document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex++
    if (currentQuestionIndex < quizData.length) {
      loadQuestion()
    } else {
      showResults()
    }
  })

  function showResults () {
    document.getElementById('quiz-container').style.display = 'none'
    document.getElementById('result-container').style.display = 'block'

    document.getElementById('final-score').innerText = `${username}, you have ${score} correct and ${quizData.length - score} wrong answers!`
  }

  document.getElementById('restart-btn').addEventListener('click', () => {
    currentQuestionIndex = 0
    score = 0
    username = ''

    document.getElementById('result-container').style.display = 'none'
    document.getElementById('start-screen').style.display = 'block'

    document.getElementById('quiz-container').style.display = 'none'
    loadQuestion()
  })
}
