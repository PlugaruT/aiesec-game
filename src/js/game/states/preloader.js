var preloader = {};

preloader.preload = function () {

  this.game.load.image('mountains-back', 'images/mountains-back.png');
  this.game.load.image('mountains-mid1', 'images/mountains-mid1.png');
  this.game.load.image('mountains-mid2', 'images/mountains-mid2.png');
  this.game.load.image('sun', 'images/sun.png');
  this.game.load.image('moon', 'images/moon.png');
};
preloader.create = function () {  
  this.game.state.start('game');
};

module.exports = preloader;
