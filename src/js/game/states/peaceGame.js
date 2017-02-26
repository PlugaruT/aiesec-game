var game = {};
var score = 0;
var scoreSprite;
var scoreText;
var _ = require('lodash');
var player;
var platforms;
var cages;
var hitCageSound;
var BlueMan = require('../objects/blueMan.js');
var CageFactory = require('../objects/cageFactory.js');
var PosterFactory = require('../objects/posterFactory.js');
var Platform = require('../objects/platform.js');
var winScore = 10;
// var cursors;

game.create = function () {
    //  We're going to be using physics, so enable the P2 Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    player = new BlueMan.BlueMan(game);
    cageFactory = new CageFactory.CageFactory(game);
    posterFactory = new PosterFactory.PosterFactory(game);

    cursors = game.input.keyboard.createCursorKeys();

    this.timer = game.time.events.loop(5000, spawnCage, game);
    this.timer = game.time.events.loop(6000, spawnPoster, game);
    // this.timer = game.time.events.loop(4000, spawnPlatform, game);

    // scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
    scoreSprite = this.game.add.sprite(16, 16, 'peace_progress', 0);
    scoreSprite.scale.setTo(0.5);
};


game.update = function () {

    // so that doves appears INSIDE the cage
    game.world.bringToTop(cageFactory.cages);

    var hitPlatform = game.physics.arcade.collide(player.getBody(), platforms);
    
    game.physics.arcade.overlap(player.getBody(), cageFactory.getCages(), 
        playerCageCollision, null, this);
    
    game.physics.arcade.overlap(player.getBody(), posterFactory.getPosters(), 
        playerPosterCollision, null, this);

    player.resetXvelocity();

    if (cursors.left.isDown) player.moveLeft();
    else if (cursors.right.isDown) player.moveRight();
    else player.standStill();

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.getBody().body.touching.down && hitPlatform) {
        player.jump();
    }

    // kills the chain, cage and dove once they are offscreen (on the left)
    cageFactory.killThemAll();
};


function spawnCage(){
    var chainLength = Math.floor(Math.random() * 10) + 3;
    var platformLength = 0;
    var displacement = 0;

    // if cage is unreachable than we need a platform
    if(chainLength < 7){
        platformLength = Math.floor(Math.random() * 5) + 3;
        createPlatform(game.world.width, game.world.height - 250 + chainLength*10, platformLength);
        displacement = 120;
    }

    cageFactory.addCage(chainLength, game.world.width + platformLength*50 + displacement);
}


function spawnPoster(){
    posterFactory.addPoster();
}


function createPlatform(x, y, len){
    for(var i = 0; i < len; i++){
        var block = platforms.create(x + i*50, y, 'pipe');
        block.body.immovable = true;
        block.body.velocity.x = -150;

        block.body.checkCollision.down = false;
        block.body.checkCollision.left = false;
        block.body.checkCollision.right = false;
    }    
}


function playerCageCollision(player, cage){
    cageFactory.hitCage(cage);
    
    //  Add and update the score
    score += 1;
    if(score > winScore) return;
    else scoreSprite.frame = score;
}


function playerPosterCollision(player, poster){
    poster.kill();
}

module.exports = game;
