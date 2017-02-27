var game = {};
var score = 0;
var scoreSprite;
var scoreText;
var _ = require('lodash');
var player;
var platforms;
var groundBlocks;
var cages;
var hitCageSound;
var BlueMan = require('../objects/blueMan.js');
var CageFactory = require('../objects/cageFactory.js');
var PosterFactory = require('../objects/posterFactory.js');
var TrampolineFactory = require('../objects/trampolineFactory.js');
var winScore = 10;
// var cursors;

game.create = function () {
    //  We're going to be using physics, so enable the P2 Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    var sky = game.add.sprite(0, 0, 'sky');
    sky.scale.setTo(2,1);

    createGround();

    // //  The platforms group contains the ground and the 2 ledges we can jump on
    // platforms = game.add.group();

    // //  We will enable physics for any object that is created in this group
    // platforms.enableBody = true;

    // // Here we create the ground.
    // var ground = platforms.create(0, game.world.height - 64, 'ground');

    // //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // ground.scale.setTo(2, 2);

    // //  This stops it from falling away when you jump on it
    // ground.body.immovable = true;

    player = new BlueMan.BlueMan(game);
    cageFactory = new CageFactory.CageFactory(game);
    posterFactory = new PosterFactory.PosterFactory(game);
    trampolineFactory = new TrampolineFactory.TrampolineFactory(game);

    cursors = game.input.keyboard.createCursorKeys();

    this.timer = game.time.events.loop(6000, spawnCage, game);
    this.timer = game.time.events.loop(10000, spawnPoster, game);
    this.timer = game.time.events.loop(12000, spawnTrampoline, game);
    this.timer = game.time.events.loop(300, addGround, game);
    // this.timer = game.time.events.loop(4000, spawnPlatform, game);

    // scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
    scoreSprite = this.game.add.sprite(16, 16, 'peace_progress', 0);
    scoreSprite.scale.setTo(0.5);
};


game.update = function () {

    // so that doves appears INSIDE the cage
    game.world.bringToTop(cageFactory.cages);

    var hitPlatform = game.physics.arcade.collide(player.getBody(), platforms) ||
                        game.physics.arcade.collide(player.getBody(), groundBlocks);
    
    game.physics.arcade.overlap(player.getBody(), cageFactory.getCages(), 
        playerCageCollision, null, this);
    
    game.physics.arcade.overlap(player.getBody(), posterFactory.getPosters(), 
        playerPosterCollision, null, this);

    game.physics.arcade.overlap(player.getBody(), trampolineFactory.getTrampolines(), 
        playerTrampolineCollision, null, this);

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

    groundBlocks.forEach(function(block){
        block.body.x -= 3;
    });
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

function spawnTrampoline(){
    trampolineFactory.addTrampoline();
}

function spawnPoster(){
    posterFactory.addPoster();
}


function createGround(){

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    groundBlocks = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    groundBlocks.enableBody = true;

    var groundLength = parseInt(game.world.width / 64);

    for(var i = 0; i < groundLength + 1; i++){
        var ground = platforms.create(i*64, game.world.height - 64, 'ground');    
        ground.body.immovable = true;
        ground.checkWorldBounds = true;
        ground.outOfBoundsKill = true;
        groundBlocks.add(ground);
    }
}

function addGround(){
    var ground = platforms.create(game.world.width, game.world.height - 64, 'ground');    
        ground.body.immovable = true;
        groundBlocks.add(ground);
        ground.checkWorldBounds = true;
        ground.outOfBoundsKill = true;
}


function createPlatform(x, y, len){
    var frame = 0;
    for(var i = 0; i < len; i++){

        if(i == 0) frame = 0;
        else if (i == len - 1) frame = 2;
        else frame = 1;

        var block = platforms.create(x + i*50, y, 'blocks', frame);
        block.body.immovable = true;
        block.body.velocity.x = -150;

        block.body.checkCollision.down = false;
        block.body.checkCollision.left = false;
        block.body.checkCollision.right = false;
    }    
}


function playerCageCollision(player, cage){
    cageFactory.hitCage(cage);
    changeScore(1);
}


function playerPosterCollision(player, poster){
    poster.kill();
    changeScore(-1);
}

function playerTrampolineCollision(player, trampoline){
    game.add.tween(player).to({ y: 10 }, 700, Phaser.Easing.Quadratic.Out, true);
}


function changeScore(unit){
    //  Add and update the score
    score += unit;
    if(score > winScore) score = winScore;
    else if (score < 0) score = 0;
       
    scoreSprite.frame = score;
}


module.exports = game;
