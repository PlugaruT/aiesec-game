var preloader = {};

preloader.preload = function () {
  this.game.load.image('bird', 'images/blueman_baloon.png');

  this.game.load.image('longPipe', 'images/rectangle.png');
  this.game.load.spritesheet('towers', 'images/towers.png', 200, 400);

  this.game.load.audio('birdJump', 'audio/jump.wav');

  this.game.load.audio('beep', 'audio/beep.mp3');

  this.game.load.image('mountains-backk', 'images/3.png');
  this.game.load.image('mountains-back', 'images/2.png');
  this.game.load.image('mountains-mid1', 'images/1.png');
  this.game.load.image('mountains-mid2', 'images/0.png');
  this.game.load.image('sun', 'images/sun.png');
  this.game.load.image('moon', 'images/moon.png');
};

preloader.create = function () {
  // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;

  this.game.state.start('flappy');
};

module.exports = preloader;
