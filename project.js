document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');
    
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    // Handle cell click
    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        // Check if cell already clicked or game is not active
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        // Update game state and UI
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        
        // Check if game ended
        checkResult();
    }
    
    // Check game result
    function checkResult() {
        let roundWon = false;
        
        // Check for winning conditions
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            const condition = gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
            
            if (condition) {
                roundWon = true;
                break;
            }
        }
        
        // If game is won
        if (roundWon) {
            status.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
        
        // Check for draw
        if (!gameState.includes('')) {
            status.textContent = "It's a draw!";
            gameActive = false;
            return;
        }
        
        // Continue game with next player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${currentPlayer}'s turn`;
    }
    
    // Reset game
    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `${currentPlayer}'s turn`;
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    }
    
    // Event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    resetButton.addEventListener('click', resetGame);
});