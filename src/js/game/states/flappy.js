var _ = require('lodash');
var FlappyBird = require('../objects/bird.js');
var Pipes = require('../objects/pipes.js');

var game = {};
var score = 0;
var scoreText;
var spaceKey;
var pipes;
var bird;

// var platforms;
// var cursors;

game.create = function () {
  //  We're going to be using physics, so enable the P2 Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  score = 'height: ' + game.world.height + ' width: ' + game.world.width;

  bird = new FlappyBird.FlappyBird(this.game, 'bird', game.world.width / 4, game.world.height / 2);

  pipes = new Pipes.Pipes(game, 'longPipe', -200, bird.getBody().height);

  // Call the 'jump' function when the spacekey is hit
  spaceKey = game.input.keyboard.addKey(
    Phaser.Keyboard.SPACEBAR);
  spaceKey.onDown.add(jump, game);

  cursors = game.input.keyboard.createCursorKeys();

  this.timer = game.time.events.loop(3000, pipes.addRowOfPipes, pipes);

  scoreText = game.add.text(16, 16, score, {fontSize: '32px', fill: '#c05f44'});
};


game.update = function () {
  game.physics.arcade.overlap(bird.getBody(), pipes.getPipeBodies(), hitPipe,  null, game);
  if (bird.checkBoundaries(0, game.world.height))
    restartGame();

  // bird.rotateBody();
};

function hitPipe() {
  // If the bird has already hit a pipe, do nothing
  // It means the bird is already falling off the screen
  if (!bird.isAlive())
    return;

  // Set the alive property of the bird to false
  bird.killBird();

  // Prevent new pipes from appearing
  game.time.events.remove(this.timer);

  // Go through all the pipes, and stop their movement
  pipes.stopPipes();
}

function jump() {
  bird.jump();
}

function restartGame() {
  game.state.start('flappy');
  // score = 0;
}


module.exports = game;
