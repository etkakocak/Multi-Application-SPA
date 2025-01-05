/**
 * Initializes the memory game inside the given container.
 * @param {HTMLElement} container - The HTML container where the memory game will be loaded.
 */
export function initMemoryGame (container) {
  container.innerHTML = `
        <div class="memory-game">
            <h2>Memory Game</h2>

            <label for="board-size">Select Board Size:</label>
            <select class="board-size">
                <option value="4x4">4x4</option>
                <option value="2x2">2x2</option>
                <option value="2x4">2x4</option>
            </select>

            <label for="emoji-set">Select Board Theme:</label>
            <select class="emoji-set">
                <option value="fruits">🍎 Fruits</option>
                <option value="animals">🐶 Animals</option>
                <option value="custom">😀 Faces</option>
            </select>

            <button class="start-game">Start Game</button>

            <div class="game-board"></div>
            <p class="status"></p>
            <p class="attempts">Attempts: 0</p>
            <button class="restart-btn hidden">Restart</button>
        </div>
    `

  const gameContainer = container.querySelector('.memory-game')
  const startButton = gameContainer.querySelector('.start-game')
  const boardSizeSelect = gameContainer.querySelector('.board-size')
  const emojiSetSelect = gameContainer.querySelector('.emoji-set')
  const gameBoard = gameContainer.querySelector('.game-board')
  const attemptsDisplay = gameContainer.querySelector('.attempts')
  const restartButton = gameContainer.querySelector('.restart-btn')

  startButton.addEventListener('click', () => {
    startMemoryGame(gameContainer)
  })

  /**
   * Starts a new memory game with the selected settings.
   * @param {HTMLElement} gameContainer - The container holding the memory game elements.
   */
  function startMemoryGame (gameContainer) {
    const boardSize = boardSizeSelect.value
    const emojiSet = emojiSetSelect.value

    let rows, cols
    if (boardSize === '4x4') {
      rows = 4; cols = 4
    } else if (boardSize === '2x2') {
      rows = 2; cols = 2
    } else {
      rows = 2; cols = 4
    }

    const emojiThemes = {
      fruits: ['🍎', '🍌', '🍇', '🍉', '🥑', '🍒', '🍍', '🥥'],
      animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
      custom: ['😀', '😂', '😎', '😍', '😡', '😭', '😱', '🤔']
    }

    const symbols = emojiThemes[emojiSet].slice(0, (rows * cols) / 2)
    let cards = [...symbols, ...symbols]
    cards = shuffle(cards)

    gameBoard.innerHTML = ''
    gameBoard.style.display = 'grid'
    gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
    gameBoard.style.margin = '0 auto'

    let selectedCards = []
    const matchedCards = []
    let attempts = 0
    let currentIndex = 0

    cards.forEach((symbol, index) => {
      const card = document.createElement('div')
      card.classList.add('card')
      card.dataset.symbol = symbol
      card.dataset.index = index
      card.innerHTML = '?'
      card.setAttribute('tabindex', '0')
      card.addEventListener('click', () => flipCard(card))
      gameBoard.appendChild(card)
    })

    restartButton.classList.remove('hidden')

    /**
     * Shuffles an array using the random sorting algorithm.
     * @param {Array} array - The array of elements to shuffle.
     * @returns {Array} - The shuffled array.
     */
    function shuffle (array) {
      return array.sort(() => Math.random() - 0.5)
    }

    /**
     * Flips a selected card to reveal its symbol.
     * @param {HTMLElement} card - The card element that was clicked.
     */
    function flipCard (card) {
      if (selectedCards.length < 2 && !selectedCards.includes(card) && !matchedCards.includes(card)) {
        card.innerHTML = card.dataset.symbol
        selectedCards.push(card)

        if (selectedCards.length === 2) {
          setTimeout(checkMatch, 500)
        }
      }
    }

    /**
     * Checks if the selected cards match and updates the game state.
     */
    function checkMatch () {
      const [card1, card2] = selectedCards
      attempts++
      attemptsDisplay.innerText = `Attempts: ${attempts}`

      if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedCards.push(card1, card2)
      } else {
        card1.innerHTML = '?'
        card2.innerHTML = '?'
      }

      selectedCards = []

      if (matchedCards.length === cards.length) {
        gameContainer.querySelector('.status').innerText = `You won in ${attempts} attempts!`
      }
    }

    gameContainer.addEventListener('keydown', (event) => {
      const allCards = gameContainer.querySelectorAll('.card')
      if (event.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % allCards.length
      } else if (event.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + allCards.length) % allCards.length
      } else if (event.key === 'Enter') {
        flipCard(allCards[currentIndex])
      }
      allCards[currentIndex].focus()
    })

    restartButton.addEventListener('click', () => {
      gameContainer.innerHTML = ''
      initMemoryGame(gameContainer)
    })
  }
}
