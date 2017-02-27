var preloader = {};

preloader.preload = function () {
    // this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'star');
    // this.preloadBar.anchor.setTo(0.5);
    // this.preloadBar.scale.setTo(3);

    // this.load.setPreloadSprite(this.preloadBar);
    this.game.load.image('player', 'images/pixel-person.png');
    this.game.load.image('sky', 'images/sky.png');
    this.game.load.image('ground', 'images/ground_block.png');
    this.game.load.image('star', 'images/star.png');
    this.game.load.image('bird', 'images/bird.png');
    this.game.load.image('pipe', 'images/pipe.png');
    this.game.load.image('mainMenu', 'images/menu.png');
    this.game.load.image('cage', 'images/cage.png');
    this.game.load.image('dove', 'images/dove.png');
    this.game.load.image('poster', 'images/poster.png');

    this.game.load.spritesheet('dude', 'images/dude.png', 32, 48);
    this.game.load.spritesheet('blueMan', 'images/blueman.png', 150, 172, 48);
    this.game.load.spritesheet('buttons', 'images/buttons-1.png', 1000, 1000, 9);
    this.game.load.spritesheet('chain', 'images/chain.png', 16, 26);
    this.game.load.spritesheet('blocks', 'images/blocks.png', 50, 50, 3);
    this.game.load.spritesheet('dove1', 'images/dove1.png', 100, 100, 12);
    this.game.load.spritesheet('posters', 'images/posters.png', 200, 200, 5);
    this.game.load.spritesheet('trampoline', 'images/trampoline.png', 100, 50, 4);
    this.game.load.spritesheet('peace_progress', 'images/peace_progress.png', 400, 40);

    this.game.load.audio('birdJump', 'audio/jump.wav');
    this.game.load.audio('beep', 'audio/beep.mp3');

};

preloader.create = function () {
    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.state.start('mainMenu');
};

module.exports = preloader;
