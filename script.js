const cardValues = [
    './images/22_01_25 ⚽️🤍.jpg', './images/22_01_25 ⚽️🤍.jpg',
    './images/cr7🤩😍🔥.jpg', './images/cr7🤩😍🔥.jpg',
    './images/51347b9a-e701-4792-a293-c4dfe7e36ebd.jpg', './images/51347b9a-e701-4792-a293-c4dfe7e36ebd.jpg',
    './images/Ja Morant Wallpaper.jpg', './images/Ja Morant Wallpaper.jpg',
    './images/c5297c2d-ee45-40eb-9780-8f9a704ea7ad.jpg', './images/c5297c2d-ee45-40eb-9780-8f9a704ea7ad.jpg',
    './images/81ffc2bf-2c19-4dc1-ac46-514c98895514.jpg', './images/81ffc2bf-2c19-4dc1-ac46-514c98895514.jpg',
];
const gameContainer = document.querySelector('.game-container');
const cards = [];

cardValues.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="front">
            <img src="${value}" alt="Card Image">
        </div>
        <div class="back"></div>
    `;
    cards.push(card);
    gameContainer.appendChild(card);
});

cards.forEach((card) => {
    card.classList.add('flipped');
});

setTimeout(() => {
    cards.forEach((card) => {
        card.classList.remove('flipped');
    });
}, 2000);

let flippedCards = [];
let matchedPairs = 0;

cards.forEach((card) => {
    card.addEventListener('click', () => {
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                checkMatch();
            }
        }
    });
});


function checkMatch() {
    const [card1, card2] = flippedCards;
    const card1Value = card1.querySelector('.front img').src;
    const card2Value = card2.querySelector('.front img').src;

    if (card1Value === card2Value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }

    if (matchedPairs === cardValues.length / 2) {
        alert('Congratulations! You won the game!');
    }
}