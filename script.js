
    const ROWS = 5;
    const COLS = 5;
    const MAX_NUM = 75;
    let bingoCard;
    let numbersCalled = [];

    function createBingoCard() {
      const card = [];
      const usedNumbers = new Set();

      while (usedNumbers.size < ROWS * COLS) {
        const num = Math.floor(Math.random() * MAX_NUM) + 1;

        if (!usedNumbers.has(num)) {
          usedNumbers.add(num);
        }
      }

      const numbersArray = Array.from(usedNumbers);

      for (let i = 0; i < ROWS; i++) {
        card.push(numbersArray.slice(i * COLS, (i + 1) * COLS));
      }

      return card;
    }

    function displayBingoCard(card) {
      const container = document.getElementById('bingoCard');
      container.innerHTML = '';

      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          const cell = document.createElement('div');
          cell.textContent = card[i][j];
          container.appendChild(cell);
        }
      }
    }

    function markNumber(number) {
      const cellElements = document.getElementById('bingoCard').getElementsByTagName('div');

      for (let i = 0; i < cellElements.length; i++) {
        if (cellElements[i].textContent === number.toString()) {
          cellElements[i].classList.add('marked');
          break;
        }
      }
    }

    function checkWin() {
      const cellElements = document.getElementById('bingoCard').getElementsByTagName('div');
      const markedNumbers = [];

      for (let i = 0; i < cellElements.length; i++) {
        if (cellElements[i].classList.contains('marked')) {
          markedNumbers.push(parseInt(cellElements[i].textContent));
        }
      }

      if (markedNumbers.length < 5) {
        return false;
      }

      for (let i = 0; i < ROWS; i++) {
        let rowFilled = true;
        for (let j = 0; j < COLS; j++) {
          if (!markedNumbers.includes(bingoCard[i][j])) {
            rowFilled = false;
            break;
          }
        }
        if (rowFilled) return true;
      }

      for (let i = 0; i < COLS; i++) {
        let colFilled = true;
        for (let j = 0; j < ROWS; j++) {
          if (!markedNumbers.includes(bingoCard[j][i])) {
            colFilled = false;
            break;
          }
        }
        if (colFilled) return true;
      }

      
      let diagonal1Filled = true;
      let diagonal2Filled = true;
      for (let i = 0; i < ROWS; i++) {
        if (!markedNumbers.includes(bingoCard[i][i])) {
          diagonal1Filled = false;
        }
        if (!markedNumbers.includes(bingoCard[i][ROWS - 1 - i])) {
          diagonal2Filled = false;
        }
      }
      if (diagonal1Filled || diagonal2Filled) return true;

      return false;
    }

    document.getElementById('startGame').addEventListener('click', function() {
      bingoCard = createBingoCard();
      displayBingoCard(bingoCard);
      document.getElementById('startGame').disabled = true;
      document.getElementById('generateNumber').disabled = false;
      numbersCalled = [];
      document.getElementById('result').textContent = '';
    });

    document.getElementById('generateNumber').addEventListener('click', function() {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * MAX_NUM) + 1;
      } while (numbersCalled.includes(randomNumber));
      
      numbersCalled.push(randomNumber);
      alert('Number called: ' + randomNumber);
      markNumber(randomNumber);

      if (checkWin()) {
        document.getElementById('result').textContent = 'Bingo! You win!';
        document.getElementById('generateNumber').disabled = true;
      }
    });