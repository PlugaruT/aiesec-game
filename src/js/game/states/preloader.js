var preloader = {};

preloader.preload = function () {
    // this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'star');
    // this.preloadBar.anchor.setTo(0.5);
    // this.preloadBar.scale.setTo(3);

    // this.load.setPreloadSprite(this.preloadBar);
    this.game.load.image('player', 'images/pixel-person.png');
    this.game.load.image('sky', 'images/sky.png');
    this.game.load.image('ground', 'images/platform.png');
    this.game.load.image('star', 'images/star.png');
    this.game.load.image('bird', 'images/bird.png');
    this.game.load.image('pipe', 'images/pipe.png');
    this.game.load.spritesheet('dude', 'images/dude.png', 32, 48);
    this.game.load.spritesheet('blueMan', 'images/blueman.png', 150, 172, 48);
    this.game.load.spritesheet('buttons', 'images/buttons.png', 500, 500, 9);

    this.game.load.audio('birdJump', 'audio/jump.wav');
    this.game.load.audio('beep', 'audio/beep.mp3');

};

preloader.create = function () {
    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.state.start('flappy');
};

module.exports = preloader;
