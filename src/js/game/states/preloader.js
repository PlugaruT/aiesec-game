var preloader = {};

preloader.preload = function () {

  this.game.load.image('mountains-backk', 'images/3.png');
  this.game.load.image('mountains-back', 'images/2.png');
  this.game.load.image('mountains-mid1', 'images/1.png');
  this.game.load.image('mountains-mid2', 'images/0.png');
  this.game.load.image('sun', 'images/sun.png');
  this.game.load.image('moon', 'images/moon.png');
};
preloader.create = function () {  
  this.game.state.start('game');
};

module.exports = preloader;
