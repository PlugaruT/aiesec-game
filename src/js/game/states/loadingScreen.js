var preloader = {};

preloader.preload = function () {
  // this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'star');
  // this.preloadBar.anchor.setTo(0.5);
  // this.preloadBar.scale.setTo(3);

  // this.load.setPreloadSprite(this.preloadBar);

};


preloader.create = function () {
  // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;

  this.game.state.start('preloader');
};

module.exports = preloader;
