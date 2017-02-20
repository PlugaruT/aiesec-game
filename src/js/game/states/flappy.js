var game = {};
var score = 0;
var scoreText;
var _ = require('lodash');

// var platforms;
// var cursors;

game.create = function () {
    //  We're going to be using physics, so enable the P2 Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    cursors = game.input.keyboard.createCursorKeys();

    scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
};


game.update = function () {

    if (cursors.left.isDown) {

    }
    else if (cursors.right.isDown) {

    }
    else {
    }

};

module.exports = game;
