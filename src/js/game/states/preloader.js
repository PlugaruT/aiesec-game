var preloader = {};

preloader.preload = function () {
    this.game.load.image('logo', 'images/phaser.png');
    this.game.load.image('player', 'images/pixel-person.png');
    this.game.load.image('sky', 'images/sky.png');
    this.game.load.image('ground', 'images/platform.png');
    this.game.load.image('star', 'images/star.png');
    this.game.load.spritesheet('dude', 'images/dude.png', 32, 48);
};

preloader.create = function () {
    this.game.state.start('game');
};

module.exports = preloader;
