var preloader = {};

preloader.loadImages = function () {
  this.game.load.image('bird', 'images/blueman_baloon.png');
  this.game.load.image('ground', 'images/ground_block-1.png');
  this.game.load.image('cage', 'images/cage.png');
  this.game.load.image('dove', 'images/dove.png');
  this.game.load.image('mountains-backk', 'images/3.png');
  this.game.load.image('mountains-back', 'images/2.png');
  this.game.load.image('mountains-mid1', 'images/1.png');
  this.game.load.image('mountains-mid2', 'images/0.png');
  this.game.load.image('sun', 'images/sun.png');
  this.game.load.image('moon', 'images/moon.png');

  this.game.load.spritesheet('towers', 'images/towersA.png', 200, 400);
  this.game.load.spritesheet('block', 'images/towers.png', 200, 400, 1);
  this.game.load.spritesheet('blueMan', 'images/blueman.png', 150, 172, 48);
  this.game.load.spritesheet('buttons', 'images/buttons-1.png', 999, 1000, 9);
  this.game.load.spritesheet('chain', 'images/chain.png', 16, 26);
  this.game.load.spritesheet('blocks', 'images/blocks-2.png', 50, 50, 3);
  this.game.load.spritesheet('dove1', 'images/dove1.png', 100, 100, 12);
  this.game.load.spritesheet('posters', 'images/posters.png', 200, 200, 5);
  this.game.load.spritesheet('trampoline', 'images/trampoline-glow.png', 100, 50, 2);
  this.game.load.spritesheet('peace_progress', 'images/peace_progress.png', 400, 40);

};

preloader.loadSounds = function () {
  this.game.load.audio('birdJump', 'audio/jump.wav');
  this.game.load.audio('beep', 'audio/beep.mp3');
  this.game.load.audio('dove_flight', 'audio/dove_flight.mp3');
  this.game.load.audio('hit_cage', 'audio/hit_cage.mp3');
  this.game.load.audio('hit_poster', 'audio/hit_poster.mp3');
  this.game.load.audio('music', 'audio/music.mp3');
  this.game.load.audio('ballon-jurney', 'audio/ballon-jurney.mp3');
  this.game.load.audio('flame-short', 'audio/flame-short.mp3');
  this.game.load.audio('trampoline_jump', 'audio/trampoline_jump.mp3');

};


preloader.preload = function () {



  this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'mainMenu');
  this.logo.anchor.setTo(0.5);

  this.loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY * (3/2), 'loading');
  this.loadingBar.anchor.setTo(0.5);
  this.game.load.setPreloadSprite(this.loadingBar);

  this.loadImages();
  this.loadSounds();
};


preloader.create = function () {
  this.game.state.start('mainMenu');
};

module.exports = preloader;
