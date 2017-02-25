var _ = require('lodash');
var FlappyBird = require('../objects/bird.js');

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

  //  A simple background for our game
  game.add.sprite(0, 0, 'sky');

  bird = new FlappyBird.FlappyBird(this.game);
  bird.createBird('bird');

  pipes = game.add.group();

  // Call the 'jump' function when the spacekey is hit
  spaceKey = game.input.keyboard.addKey(
    Phaser.Keyboard.SPACEBAR);
  spaceKey.onDown.add(jump, game);

  cursors = game.input.keyboard.createCursorKeys();

  this.timer = game.time.events.loop(1500, addRowOfPipes, game);

  scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
};


game.update = function () {
  game.physics.arcade.overlap(bird.getBody(), pipes, hitPipe, null, game);
  if (bird.checkBoundaries(0, game.world.height))
    restartGame();

  bird.rotateBody();
};

function addOnePipe(x, y) {
  // Create a pipe at the position x and y
  var pipe = game.add.sprite(x, y, 'pipe');

  // Add the pipe to our previously created group
  pipes.add(pipe);

  // Enable physics on the pipe
  game.physics.arcade.enable(pipe);

  // Add velocity to the pipe to make it move left
  pipe.body.velocity.x = -200;

  // Automatically kill the pipe when it's no longer visible
  pipe.checkWorldBounds = true;
  pipe.outOfBoundsKill = true;
}

function addRowOfPipes() {
  // Randomly pick a number between 1 and 5
  // This will be the hole position
  score++;
  scoreText.text = "Score: " + score;
  var hole = Math.floor(Math.random() * 7) + 1;

  // Add the 6 pipes
  // With one big hole at position 'hole' and 'hole + 1'
  for (var i = 0; i < 10; i++)
    if (i != hole && i != hole + 1)
      addOnePipe(game.world.width, i * 60 + 10);
}

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
  pipes.forEach(function (pipe) {
    pipe.body.velocity.x = 0;
  }, game);
}

function jump() {
  bird.jump();
}

function restartGame() {
  game.state.start('flappy');
  score = 0;
}


module.exports = game;
