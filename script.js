const grid = document.querySelector('.grid');
const status = document.querySelector('.status');
const resetBtn = document.querySelector('.reset-btn');
let clickCount = 0;
let gameActive = true;
const cells = [];

// Create grid cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleClick);
    grid.appendChild(cell);
    cells.push(cell);
}

function handleClick(e) {
    const cell = e.target;
    if (cell.textContent || !gameActive) return;

    clickCount++;
    const symbol = clickCount % 2 === 1 ? 'X' : 'O';
    cell.textContent = symbol;

    if (checkWinner(symbol)) {
        gameActive = false;
        status.textContent = `${symbol} wins!`;
        return;
    }

    if (clickCount === 9) {
        gameActive = false;
        status.textContent = "It's a tie!";
    }
}

function checkWinner(symbol) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
        if (pattern.every(index => cells[index].textContent === symbol)) {
            pattern.forEach(index => cells[index].classList.add('winner'));
            return true;
        }
    }
    return false;
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
    clickCount = 0;
    gameActive = true;
    status.textContent = '';
}

resetBtn.addEventListener('click', resetGame);