var Game = require('../main');
var expect = require('chai').expect;

describe('Tic Tac Toe', function() {

	it('should add a move to the board when a user inputs correct data', function() {
		var game = new Game();
		game.makeMove('0 0');

		expect(game.board[0][0]).to.equal('X');

		game.endGame();
	});

	it('should determine a winner', function() {
		var game = new Game();
		var board = [
			['X',' ',' '],
			[' ',' ',' '],
			[' ',' ',' ']
		]
		game.board = board;
		game.makeMove('0 2');
		game.makeMove('1 1');
		game.makeMove('0 1');
		expect(game.winner).to.equal('X');
	});

	it('should determine a cats game', function() {
		var game = new Game();
		var board = [
			['X',' ',' '],
			['X',' ','O'],
			['O','X','O']
		]
		game.board = board;
		game.makeMove('0 2');
		game.makeMove('0 1');
		game.makeMove('1 1');
		expect(game.winner).to.equal('C');
	});

	it('should not let players play in the same place', function() {
		var game = new Game();

		var board = [
			[' ',' ',' '],
			[' ',' ',' '],
			[' ',' ',' ']
		]
		game.board = board;

		game.makeMove('0 0');
		game.makeMove('0 0');
		expect(game.board[0][0]).to.equal('X');
		expect(game.turn).to.be.false;
	});


});