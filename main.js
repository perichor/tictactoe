var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var board = [
	[' ',' ',' '],
	[' ',' ',' '],
	[' ',' ',' ']
];

console.reset = function () {
  return process.stdout.write('\033c');
}

var Game = function() {
	this.board = board.slice();
	this.turn = true;
	this.winner = ' ';


	this.isTheSame = function(a, b, c) {
		if (a === b && a === c && a !== ' ') {
			this.winner = a;
			return true;
		}
		return false;
	};

	this.checkWin = function() {
		var board = this.board;
		this.isTheSame(board[0][0], board[1][0], board[2][0]);
		this.isTheSame(board[0][1], board[1][1], board[2][1]);
		this.isTheSame(board[0][2], board[1][2], board[2][2]);
		this.isTheSame(board[0][0], board[0][1], board[0][2]);
		this.isTheSame(board[1][0], board[1][1], board[1][2]);
		this.isTheSame(board[2][0], board[2][1], board[2][2]);
		this.isTheSame(board[0][0], board[1][1], board[2][2]);
		this.isTheSame(board[2][0], board[1][1], board[0][2]);
	};

	this.checkCats = function() {
		var board = this.board;
		if (board[0][0] !== ' ' &&
		 	board[1][0] !== ' ' &&
		  board[2][0] !== ' ' &&
		  board[0][1] !== ' ' &&
		  board[1][1] !== ' ' &&
		  board[2][1] !== ' ' &&
		  board[0][2] !== ' ' &&
		  board[1][2] !== ' ' &&
		  board[2][2] !== ' ') {
				this.winner = 'C';
		}
	};

	this.logBoard = function() {
		board = this.board;
		console.log('\n\n' + board[0][0] + '|' + board[0][1] + '|' + board[0][2] + '\n' + '-----' + '\n' + board[1][0] + '|' + board[1][1] + '|' + board[1][2] + '\n' + '-----' + '\n' + board[2][0] + '|' + board[2][1] + '|' + board[2][2] + '\n\n');
	}

	this.logWinner = function() {
		if (this.winner === 'X') {
			console.log('\n\n\t\tPlayer One Wins\n\n');
		} else if (this.winner === 'O') {
			console.log('\n\n\t\tPlayer Two Wins\n\n');
		} else {
			console.log('\n\n\t\tCats Game!\n\n');	
		}
		this.endGame();
	}

	this.makeMove = function(move) {
		var move = move.split(' ');
		if (this.board[move[0]][move[1]] === ' ') {	
			if (this.turn) {
				this.board[move[0]][move[1]] = 'X';
			} else {
				this.board[move[0]][move[1]] = 'O';
			}
			this.turn = !this.turn;
		}
		console.reset();
		this.checkCats();
		this.checkWin();
		if (this.winner !== ' ') {
			this.logWinner();
		} else {
			this.startTurn();
		}
	}

	this.turnPrompt = function(player) {
		this.logBoard();
		rl.question('Player ' + player + ': ', (move) => {
			this.makeMove(move);
		});
	}

	this.endGame = function() {
		console.reset();
		rl.close()
	}

	this.startTurn = function() {
		if (this.turn) {
			this.turnPrompt('One');
		} else {
			this.turnPrompt('Two');
		}
	}

	console.reset()
	this.startTurn();
}

new Game();

module.exports = Game;