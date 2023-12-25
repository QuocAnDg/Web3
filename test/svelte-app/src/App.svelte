<script>
	import { onMount, onDestroy } from 'svelte';
  
	let ball = { x: 400, y: 300, vx: 5, vy: -2, radius: 10 };
	let player1 = { x: 50, y: 250, width: 10, height: 100 };
	let player2 = { x: 740, y: 250, width: 10, height: 100 };
	let player1Velocity = 0;
	let player2Velocity = 0;
	let scorePlayer1 = 0;
	let scorePlayer2 = 0;
  
	function update() {
	  ball.x += ball.vx;
	  ball.y += ball.vy;
  
	  if (ball.y - ball.radius < 0 || ball.y + ball.radius > 600) {
		ball.vy = -ball.vy;
	  }
  
	  if (ball.x - ball.radius < player1.x + player1.width &&
		  ball.y + ball.radius > player1.y &&
		  ball.y - ball.radius < player1.y + player1.height) {
		ball.vx = -ball.vx;
	  }
  
	  if (ball.x + ball.radius > player2.x &&
		  ball.y + ball.radius > player2.y &&
		  ball.y - ball.radius < player2.y + player2.height) {
		ball.vx = -ball.vx;
	  }
  
	  if (ball.x - ball.radius < 45) {
		// Balle dans le camp du joueur 2
		scorePlayer2 += 1;
		resetBall(player1);
	  }
  
	  if (ball.x + ball.radius > 745) {
		// Balle dans le camp du joueur 1
		scorePlayer1 += 1;
		resetBall(player2);
	  }
  
	  // Vérifications des limites de la balle
	  if (ball.y - ball.radius < 20) ball.vy = Math.abs(ball.vy);
	  if (ball.y + ball.radius > 745) ball.vy = -Math.abs(ball.vy);
  
	  // Vérifications des limites de mouvement des joueurs
	  if (player1.y < 0) player1.y = 0;
	  if (player1.y + player1.height > 600) player1.y = 600 - player1.height;
	  if (player2.y < 0) player2.y = 0;
	  if (player2.y + player2.height > 600) player2.y = 600 - player2.height;
  
	  player1.y += player1Velocity;
	  player2.y += player2Velocity;
	}
  
  
	let gameLoop;
	function resetBall(player) {
	  if (player === player1) {
		ball = { x: 400, y: 300, vx: -5, vy: -2, radius: 10 };
	  } else {
		ball = { x: 400, y: 300, vx: 5, vy: -2, radius: 10 };
	  }
	}
	function startGame() {
	  gameLoop = setInterval(update, 1000 / 60);
	}
  
	function stopGame() {
	  clearInterval(gameLoop);
	}
  
	function handleKeyDown(event) {
	  if (event.key === 'ArrowUp') {
		player2Velocity = -5;
	  } else if (event.key === 'ArrowDown') {
		player2Velocity = 5;
	  } else if (event.key === 'w') {
		player1Velocity = -5;
	  } else if (event.key === 's') {
		player1Velocity = 5;
	  }
	}
  
	function handleKeyUp(event) {
	  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
		player2Velocity = 0;
	  } else if (event.key === 'w' || event.key === 's') {
		player1Velocity = 0;
	  }
	}
  
	onMount(() => {
	  document.addEventListener('keydown', handleKeyDown);
	  document.addEventListener('keyup', handleKeyUp);
	  startGame();
	});
  
	onDestroy(() => {
	  document.removeEventListener('keydown', handleKeyDown);
	  document.removeEventListener('keyup', handleKeyUp);
	  stopGame();
	});
  </script>
  
  <style>
	.game-container {
	  position: relative;
	  width: 800px;
	  height: 600px;
	  border: 2px solid #000;
	  margin: auto;
	}
  
	.player {
	  position: absolute;
	  background-color: #000;
	}
  
	.ball {
	  position: absolute;
	  background-color: #000;
	  border-radius: 50%;
	}
  
	.score {
	position: absolute;
	top: 10px;
	left: 10px;
	color: black;
	z-index: 1;
  }
   
  </style>
  
  <div class="game-container">
  
  
	<div class="player" style="top:{player1.y}px; left:{player1.x}px; width:{player1.width}px; height:{player1.height}px;"></div>
	<div class="player" style="top:{player2.y}px; left:{player2.x}px; width:{player2.width}px; height:{player2.height}px;"></div>
	<div class="ball" style="top:{ball.y}px; left:{ball.x}px; width:{ball.radius * 2}px; height:{ball.radius * 2}px;"></div>
  </div>
  