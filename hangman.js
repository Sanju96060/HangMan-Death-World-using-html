let words = ['javascript', 'css', 'hangman', 'webpage', 'canvas', 'frontend', 'backend', 'html'];
    let stage = 0;
    let word = '';
    let guessed = [];
    let wrong = 0;
    const maxWrong = 6;

    const canvas = document.getElementById('hangmanCanvas');
    const ctx = canvas.getContext('2d');

    function drawHangman(wrong) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(10, 240); ctx.lineTo(190, 240); 
      ctx.moveTo(50, 240); ctx.lineTo(50, 20); ctx.lineTo(130, 20); ctx.lineTo(130, 40); 
      ctx.stroke();

      if (wrong > 0) {
        ctx.beginPath(); ctx.arc(130, 60, 20, 0, Math.PI * 2); ctx.stroke(); 
      }
      if (wrong > 1) { ctx.moveTo(130, 80); ctx.lineTo(130, 140); ctx.stroke(); } 
      if (wrong > 2) { ctx.moveTo(130, 100); ctx.lineTo(100, 120); ctx.stroke(); } 
      if (wrong > 3) { ctx.moveTo(130, 100); ctx.lineTo(160, 120); ctx.stroke(); } 
      if (wrong > 4) { ctx.moveTo(130, 140); ctx.lineTo(110, 180); ctx.stroke(); } 
      if (wrong > 5) { ctx.moveTo(130, 140); ctx.lineTo(150, 180); ctx.stroke(); } 
    }

    function updateWordDisplay() {
      const display = word.split('').map(letter => guessed.includes(letter) ? letter : '_').join(' ');
      document.getElementById('wordDisplay').textContent = display;
      return !display.includes('_');
    }

    function endGame(win) {
      const messageEl = document.getElementById('message');
      const buttons = document.querySelectorAll('.letters button');
      buttons.forEach(btn => btn.disabled = true);

      if (win) {
        messageEl.textContent = `🎉 Stage ${stage + 1} completed! Next challenge coming...`;
        setTimeout(() => {
          stage++;
          if (stage < words.length) {
            startNewGame();
          } else {
            messageEl.textContent = "🏆 Congratulations! You finished all stages!";
            document.getElementById('restartBtn').style.display = 'inline-block';
            document.getElementById('homeBtn').style.display = 'inline-block';
          }
        }, 2000);
      } else {
        messageEl.textContent = `💀 You died! The word was "${word}".`;
        document.getElementById('restartBtn').style.display = 'inline-block';
        document.getElementById('homeBtn').style.display = 'inline-block';
      }
    }

    function handleGuess(letter, btn) {
      btn.disabled = true;
      if (word.includes(letter)) {
        guessed.push(letter);
        if (updateWordDisplay()) endGame(true);
      } else {
        wrong++;
        drawHangman(wrong);
        if (wrong >= maxWrong) endGame(false);
      }
    }

    function createButtons() {
      const container = document.getElementById('letterButtons');
      container.innerHTML = '';
      for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i).toLowerCase();
        const btn = document.createElement('button');
        btn.textContent = letter;
        btn.onclick = () => handleGuess(letter, btn);
        container.appendChild(btn);
      }
    }

    function startNewGame() {
      word = words[stage];
      guessed = [];
      wrong = 0;
      document.getElementById('message').textContent = '';
      document.getElementById('restartBtn').style.display = 'none';
      document.getElementById('homeBtn').style.display = 'none';
      drawHangman(0);
      updateWordDisplay();
      createButtons();
    }

    function restartGame() {
      startNewGame();
    }

    function goHome() {
      window.location.href = 'index.html';
    }

    // Start first game on page load
    startNewGame();