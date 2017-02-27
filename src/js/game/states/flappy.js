var _ = require('lodash');
var FlappyBird = require('../objects/bird.js');
var Pipes = require('../objects/pipes.js');
var PauseMenu = require('../objects/pauseMenu.js');

var game = {};
var score = 0;
var scoreText;
var pipes;
var bird;
var pauseMenu;
var debugMode = false;

game.create = function () {
  //  We're going to be using physics, so enable the P2 Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  score = 'height: ' + game.world.height + ' width: ' + game.world.width;

  bird = new FlappyBird.FlappyBird(this.game);
  let playerHeight = bird.createBird('bird', -300, game.world.height / 2);
  let towerNames = ['eiffel', 'new-york', 'layered', 'pisa', 'big-ben', 'two-stuff', 'very-tower', 'egg-tower', 'thin-thing', 'golden'];
  let towersObj = {};
  // towersObj[towerNames[0]] = {sprite: game.add.sprite(x, y, 'towers', 0)};
  // towersObj[towerNames[1]] = {sprite: game.add.sprite(x, y, 'towers', 1)};
  // towersObj[towerNames[2]] = {sprite: game.add.sprite(x, y, 'towers', 2)};
  // towersObj[towerNames[3]] = {sprite: game.add.sprite(x, y, 'towers', 3)};
  // towersObj[towerNames[4]] = {sprite: game.add.sprite(x, y, 'towers', 4)};
  // towersObj[towerNames[5]] = {sprite: game.add.sprite(x, y, 'towers', 5)};
  // towersObj[towerNames[6]] = {sprite: game.add.sprite(x, y, 'towers', 6)};
  // towersObj[towerNames[7]] = {sprite: game.add.sprite(x, y, 'towers', 7)};
  // towersObj[towerNames[8]] = {sprite: game.add.sprite(x, y, 'towers', 8)};
  // towersObj[towerNames[9]] = {sprite: game.add.sprite(x, y, 'towers', 9)};

  let holeHeight = 2.5;
  pipes = new Pipes.Pipes(game, towerNames, towersObj, -200, playerHeight, holeHeight);

  // Call the 'jump' function when the spacekey is hit
  spaceKey = game.input.keyboard.addKey(
    Phaser.Keyboard.SPACEBAR);
  spaceKey.onDown.add(jump, game);

  cursors = game.input.keyboard.createCursorKeys();

  this.timer = game.time.events.loop(3000, pipes.addRowOfPipes, pipes);

  scoreText = game.add.text(16, 16, score, {fontSize: '32px', fill: '#c05f44'});

  pauseMenu = new PauseMenu.PauseMenu(game);

};


game.update = function () {
  game.physics.arcade.overlap(bird.getBody(), pipes.getPipeBodies(), hitPipe, null, game);
  if (bird.checkBoundaries(0, game.world.height))
    restartGame();
};

game.render = function () {
  if (debugMode) {
    pipes.getPipeBodies().forEach(function (pipe) {
      game.game.debug.body(pipe);
    });
    game.game.debug.body(bird.getBody());
  }
};

function onPause() {
  game.time.events.remove(this.timer);
  switchPhysics();
}

function onResume() {
  switchPhysics();
}

function switchPhysics() {
  game.physics.arcade.isPaused = !game.physics.arcade.isPaused;
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
