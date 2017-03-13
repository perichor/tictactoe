var Game = require('../main');
var expect = require('chai').expect;

describe('Tic Tac Toe', function() {

	it('should add a move to the board when a user inputs correct data', function() {
		var game = new Game();
		game.makeMove('0 0');

		expect(game.board[0][0]).to.equal('X');
	});

	it('should determine a winner', function() {

	});

});