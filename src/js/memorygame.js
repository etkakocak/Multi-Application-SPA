export function initMemoryGame(container) {
    container.innerHTML = `
        <div class="memory-game">
            <h2>Memory Game</h2>
            <label for="board-size">Select Board Size:</label>
            <select class="board-size">
                <option value="4x4">4x4</option>
                <option value="2x2">2x2</option>
                <option value="2x4">2x4</option>
            </select>
            <button class="start-game">Start Game</button>
            <div class="game-board"></div>
            <p class="status"></p>
            <p class="attempts">Attempts: 0</p>
            <button class="restart-btn hidden">Restart</button>
        </div>
    `;

    const gameContainer = container.querySelector(".memory-game");
    const startButton = gameContainer.querySelector(".start-game");
    const boardSizeSelect = gameContainer.querySelector(".board-size");
    const gameBoard = gameContainer.querySelector(".game-board");
    const attemptsDisplay = gameContainer.querySelector(".attempts");
    const restartButton = gameContainer.querySelector(".restart-btn");

    startButton.addEventListener("click", () => {
        startMemoryGame(gameContainer);
    });

    function startMemoryGame(gameContainer) {
        const boardSize = gameContainer.querySelector(".board-size").value;
        let rows, cols;
        if (boardSize === "4x4") {
            rows = 4; cols = 4;
        } else if (boardSize === "2x2") {
            rows = 2; cols = 2;
        } else {
            rows = 2; cols = 4;
        }

        let symbols = ["🍎", "🍌", "🍇", "🍉", "🥑", "🍒", "🍍", "🥥"];
        symbols = symbols.slice(0, (rows * cols) / 2);
        let cards = [...symbols, ...symbols];
        cards = shuffle(cards);

        const gameBoard = gameContainer.querySelector(".game-board");
        gameBoard.innerHTML = "";
        gameBoard.style.display = "grid";
        gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gameBoard.style.margin = "0 auto";

        let selectedCards = [];
        let matchedCards = [];
        let attempts = 0;
        let currentIndex = 0;

        cards.forEach((symbol, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            card.innerHTML = "?";
            card.setAttribute("tabindex", "0");
            card.addEventListener("click", () => flipCard(card));
            gameBoard.appendChild(card);
        });

        restartButton.classList.remove("hidden");

        function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
        }

        function flipCard(card) {
            if (selectedCards.length < 2 && !selectedCards.includes(card) && !matchedCards.includes(card)) {
                card.innerHTML = card.dataset.symbol;
                selectedCards.push(card);

                if (selectedCards.length === 2) {
                    setTimeout(checkMatch, 500);
                }
            }
        }

        function checkMatch() {
            const [card1, card2] = selectedCards;
            attempts++;
            gameContainer.querySelector(".attempts").innerText = `Attempts: ${attempts}`;

            if (card1.dataset.symbol === card2.dataset.symbol) {
                matchedCards.push(card1, card2);
            } else {
                card1.innerHTML = "?";
                card2.innerHTML = "?";
            }

            selectedCards = [];

            if (matchedCards.length === cards.length) {
                gameContainer.querySelector(".status").innerText = `You won in ${attempts} attempts!`;
            }
        }

        gameContainer.addEventListener("keydown", (event) => {
            const allCards = gameContainer.querySelectorAll(".card");
            if (event.key === "ArrowRight") {
                currentIndex = (currentIndex + 1) % allCards.length;
            } else if (event.key === "ArrowLeft") {
                currentIndex = (currentIndex - 1 + allCards.length) % allCards.length;
            } else if (event.key === "Enter") {
                flipCard(allCards[currentIndex]);
            }
            allCards[currentIndex].focus();
        });

        restartButton.addEventListener("click", () => {
            gameContainer.innerHTML = "";
            initMemoryGame(gameContainer);
        });
    }
}
