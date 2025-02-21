//your JS code here. If required.
 let currentPlayer = 'x';
    let gameActive = true;
    let board = ['', '', '', '', '', '', '', '', ''];
    let player1Name = '';
    let player2Name = '';
    const winningCombos = [
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
    function handleCellClick(e) {
      const cell = e.target;
      const cellIndex = parseInt(cell.id) - 1;
      if (!gameActive || board[cellIndex] !== '') return;
      board[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;
      if (checkWin()) {
        gameActive = false;
        const winnerName = currentPlayer === 'x' ? player1Name : player2Name;
        messageDiv.textContent = winnerName + " congratulations you won!";
        return;
      }
      if (!board.includes('')) {
        gameActive = false;
        messageDiv.textContent = "It's a tie!";
        return;
      }
      currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
      const currentName = currentPlayer === 'x' ? player1Name : player2Name;
      messageDiv.textContent = currentName + ", you're up";
    }
    function checkWin() {
      return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return board[a] && board[a] === board[b] && board[a] === board[c];
      });
    }
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    document.getElementById('submit').addEventListener('click', function() {
      player1Name = document.getElementById('player1').value.trim();
      player2Name = document.getElementById('player2').value.trim();
      if (player1Name === "" || player2Name === "") {
        alert("Please enter names for both players.");
        return;
      }
      document.getElementById('playerInputs').classList.add('hidden');
      document.getElementById('game').classList.remove('hidden');
      messageDiv.textContent = player1Name + ", you're up";
    });