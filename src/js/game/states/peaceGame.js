var game = {};
var score = 0;
var scoreText;
var _ = require('lodash');
var player;
var platforms;
var cages;
var hitCageSound;

// var platforms;
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

    hitCageSound = game.add.audio('beep');

//------------------------- PLAYER 
    player = game.add.sprite(100, game.world.height / 2, 'blueMan');
    // player.alpha = 1000;

    game.physics.arcade.enable(player);

    player.facingRight = true;

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    // player.animations.add('idle', [0], 12, false);
    player.animations.add('jumpRight', _.range(7, 13), 10, false);
    player.animations.add('jumpLeft', _.range(31, 13), 10, false);
    player.animations.add('rightRun', _.range(14, 24), 18, true);
    player.animations.add('leftRun', _.range(38, 48), 18, true);
//-------------------------


    cursors = game.input.keyboard.createCursorKeys();

    cages = game.add.group();
    cages.enableBody = true;

    this.timer = game.time.events.loop(3000, createCage, game);

    scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
};


game.update = function () {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, cages, freeDove, null, this);

    this.game.debug.text(hitPlatform);
    //  Reset the players velocity (movement)

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -320;
        // player.animations.play('leftRun');
        player.facingRight = false;

    }
    else if (cursors.right.isDown) {
        //      Move to the right
        player.body.velocity.x = 320;
        // player.animations.play('rightRun');
        player.facingRight = true;

    }
    else {
        //  Stand still
        if (player.facingRight)
            player.animations.play('rightRun');
        else
            player.animations.play('leftRun');
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -350;

        //define direction of jump
        if (player.facingRight)
            player.animations.play('jumpRight');
        else
            player.animations.play('jumpLeft');

    }
};

function createCage(){
    var chainLength = Math.floor(Math.random() * 20) + 5;
    var i;
    for(i = 0; i < chainLength; i++){
        buildChain(game.world.width, i*7);
    }

    // Create a cage at the position x and y
    var cage = game.add.sprite(game.world.width, i*7, 'cage');
    cage.scale.setTo(0.4);
    cage.anchor.setTo(0.5, 0);

    // Add the cage to our previously created group
    cages.add(cage);

    // Enable physics on the cage
    game.physics.arcade.enable(cage);
    

    // Add velocity to the cage to make it move left
    cage.body.velocity.x = -150;

    // Automatically kill the cage when it's no longer visible
    cage.checkWorldBounds = true;
    cage.outOfBoundsKill = true;
}

function buildChain(x, y) {
    // Create a pipe at the position x and y
    var chain = game.add.sprite(x, y, 'chain');
    chain.scale.setTo(0.07);
    chain.anchor.setTo(0.5, 0);

    // Enable physics on the pipe
    game.physics.arcade.enable(chain);

    // Add velocity to the pipe to make it move left
    chain.body.velocity.x = -150;

    // Automatically kill the pipe when it's no longer visible
    chain.checkWorldBounds = true;
    chain.outOfBoundsKill = true;
}


function freeDove(player, cage) {
    // dummy cage to show the fade-out effect (temporary solution)
    hitCageSound.play();
    var dummyCage = game.add.sprite(cage.x, cage.y, 'cage');
    dummyCage.scale.setTo(0.4);
    dummyCage.anchor.setTo(0.5, 0);
    game.physics.arcade.enable(dummyCage);
    dummyCage.body.velocity.x = -150;

    cage.kill();

    // cage fade-out effect
    game.add.tween(dummyCage).to( { alpha: 0 }, 500, "Linear", true);
    
    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;
}

module.exports = game;
