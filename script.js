//your JS code here. If required.
 let currentPlayer = 'X';
    let gameActive = true;
    let boardState = Array(9).fill('');
    let player1Name = '';
    let player2Name = '';

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const cells = document.querySelectorAll('.cell');
    const messageDiv = document.querySelector('.message');

    function handleCellClick(event) {
      const cell = event.target;
      const cellIndex = parseInt(cell.id) - 1;

      if (boardState[cellIndex] !== '' || !gameActive) return;
      
      boardState[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;

      if (checkWin()) {
        gameActive = false;
        let winnerName = currentPlayer === 'X' ? player1Name : player2Name;
        messageDiv.textContent = winnerName + " congratulations you won!";
        return;
      }

      if (!boardState.includes('')) {
        gameActive = false;
        messageDiv.textContent = "It's a tie!";
        return;
      }
      
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      let currentPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
      messageDiv.textContent = currentPlayerName + ", you're up";
    }

    function checkWin() {
      return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
      });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    document.getElementById('submit').addEventListener('click', function() {
      const p1 = document.getElementById('player-1').value.trim();
      const p2 = document.getElementById('player-2').value.trim();
      if (p1 === "" || p2 === "") {
        alert("Please enter names for both players.");
        return;
      }
      player1Name = p1;
      player2Name = p2;
      document.getElementById('nameInput').classList.add('hidden');
      document.getElementById('gameBoard').classList.remove('hidden');
      messageDiv.textContent = player1Name + ", you're up";
    });