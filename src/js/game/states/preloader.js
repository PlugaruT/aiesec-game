var preloader = {};

preloader.preload = function () {
    // this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'star');
    // this.preloadBar.anchor.setTo(0.5);
    // this.preloadBar.scale.setTo(3);

    // this.load.setPreloadSprite(this.preloadBar);
    this.game.load.image('ground', 'images/ground_block-1.png');
    this.game.load.image('bird', 'images/bird.png');
    this.game.load.image('pipe', 'images/pipe.png');
    this.game.load.image('mainMenu', 'images/logo.png');
    this.game.load.image('cage', 'images/cage.png');
    this.game.load.image('dove', 'images/dove.png');
    this.game.load.image('poster', 'images/poster.png');
    this.game.load.image('mountains-backk', 'images/3.png');
    this.game.load.image('mountains-back', 'images/2.png');
    this.game.load.image('mountains-mid1', 'images/1.png');
    this.game.load.image('mountains-mid2', 'images/0.png');
    this.game.load.image('sun', 'images/sun.png');
    this.game.load.image('moon', 'images/moon.png');

    this.game.load.spritesheet('blueMan', 'images/blueman.png', 150, 172, 48);
    this.game.load.spritesheet('buttons', 'images/buttons-1.png', 999, 1000, 9);
    this.game.load.spritesheet('chain', 'images/chain.png', 16, 26);
    this.game.load.spritesheet('blocks', 'images/blocks-2.png', 50, 50, 3);
    this.game.load.spritesheet('dove1', 'images/dove1.png', 100, 100, 12);
    this.game.load.spritesheet('posters', 'images/posters.png', 200, 200, 5);
    this.game.load.spritesheet('trampoline', 'images/trampoline-glow.png', 100, 50, 2);
    this.game.load.spritesheet('peace_progress', 'images/peace_progress.png', 400, 40);
    // this.game.load.spritesheet('explosion', 'images/explosion.png', 283.333333, 237.5, 12);

    this.game.load.audio('birdJump', 'audio/jump.wav');
    this.game.load.audio('beep', 'audio/beep.mp3');
    this.game.load.audio('dove_flight', 'audio/dove_flight.mp3');
    this.game.load.audio('hit_cage', 'audio/hit_cage.mp3');
    this.game.load.audio('hit_poster', 'audio/hit_poster.mp3');
    this.game.load.audio('music', 'audio/music.mp3');
    this.game.load.audio('trampoline_jump', 'audio/trampoline_jump.mp3');

};

preloader.create = function () {
    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.state.start('mainMenu');
};

module.exports = preloader;
