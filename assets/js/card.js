const cardValues = [
    './assets/images/22_01_25 ⚽️🤍.jpg', './assets/images/22_01_25 ⚽️🤍.jpg',
    './assets/images/cr7🤩😍🔥.jpg', './assets/images/cr7🤩😍🔥.jpg',
    './assets/images/51347b9a-e701-4792-a293-c4dfe7e36ebd.jpg', './assets/images/51347b9a-e701-4792-a293-c4dfe7e36ebd.jpg',
    './assets/images/Ja Morant Wallpaper.jpg', './assets/images/Ja Morant Wallpaper.jpg',
    './assets/images/c5297c2d-ee45-40eb-9780-8f9a704ea7ad.jpg', './assets/images/c5297c2d-ee45-40eb-9780-8f9a704ea7ad.jpg',
    './assets/images/81ffc2bf-2c19-4dc1-ac46-514c98895514.jpg', './assets/images/81ffc2bf-2c19-4dc1-ac46-514c98895514.jpg',
];
const gameContainer = document.querySelector('.game-container');
const players = document.querySelectorAll('.player');
const resetButton = document.getElementById('reset-button');

let cards = [];
let playerScores = [0, 0];
let currentPlayer = 1;
let flippedCards = [];
let matchedPairs = 0;
let gameActive = true;

function initializeGame() {
    // Clear existing cards
    gameContainer.innerHTML = '';
    cards = [];
    
    // Create and shuffle cards
    const shuffledCards = [...cardValues].sort(() => Math.random() - 0.5);
    
    shuffledCards.forEach((value, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="front">
                <img src="${value}" alt="Card Image">
            </div>
            <div class="back"></div>
        `;
        card.addEventListener('click', handleCardClick);
        gameContainer.appendChild(card);
        cards.push(card);
    });

    // Initial card flip
    cards.forEach(card => card.classList.add('flipped'));
    setTimeout(() => {
        cards.forEach(card => card.classList.remove('flipped'));
    }, 2000);
}

function handleCardClick() {
    if (!gameActive || 
        flippedCards.length === 2 || 
        this.classList.contains('flipped') || 
        this.classList.contains('matched')
    ) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        gameActive = false;
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.querySelector('img').src === card2.querySelector('img').src;

    if (isMatch) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        playerScores[currentPlayer - 1]++;
        matchedPairs++;
        updateScores();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            switchPlayer();
        }, 500);
    }

    flippedCards = [];
    gameActive = true;

    if (matchedPairs === cardValues.length / 2) {
        endGame();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    players.forEach(player => 
        player.classList.toggle('active', 
            player.dataset.player === currentPlayer.toString()
        )
    );
}

function updateScores() {
    players.forEach((player, index) => {
        player.querySelector('.score').textContent = playerScores[index];
    });
}

function endGame() {
    const winner = playerScores[0] > playerScores[1] ? 'Player 1' :
                  playerScores[1] > playerScores[0] ? 'Player 2' : 
                  'It\'s a tie!';
    alert(`Game Over! ${winner} wins!\nPlayer 1: ${playerScores[0]}\nPlayer 2: ${playerScores[1]}`);
}

function resetGame() {
    playerScores = [0, 0];
    matchedPairs = 0;
    currentPlayer = 1;
    gameActive = true;
    updateScores();
    players[0].classList.add('active');
    players[1].classList.remove('active');
    initializeGame();
}

// Initialize game
resetButton.addEventListener('click', resetGame);
initializeGame();