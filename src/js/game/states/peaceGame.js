var game = {};
var score = 0;
var scoreText;
var _ = require('lodash');
var player;
var platforms;
var cages;
var hitCageSound;
var BlueMan = require('../objects/blueMan.js');
var Cage = require('../objects/cage.js');
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

    // game.physics.startSystem(Phaser.Physics.P2JS);
    // game.physics.p2.gravity.y = 1200;

    // //  Length, xAnchor, yAnchor
    // createRope(40, 400, 64);

//------------------------- PLAYER 
    player = new BlueMan.BlueMan(game);
//-------------------------


    cursors = game.input.keyboard.createCursorKeys();

    cages = game.add.group();
    cages.enableBody = true;

    this.timer = game.time.events.loop(3000, spawnCage, game);

    scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
};


game.update = function () {
    var hitPlatform = game.physics.arcade.collide(player.getBody(), platforms);
    game.physics.arcade.overlap(player.getBody(), cages, hitCage, null, this);

    player.resetXvelocity();

    if (cursors.left.isDown) player.moveLeft();
    else if (cursors.right.isDown) player.moveRight();
    else player.standStill();

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.getBody().body.touching.down && hitPlatform) {
        player.jump();
    }
};

function spawnCage(){
    var cage = new Cage.Cage(game);
    cages.add(cage.getBody());
}

function hitCage(player, cage){
    cage.freeDove();
}

// function createCage(){
//     var chainLength = Math.floor(Math.random() * 20) + 5;
//     var i;
//     for(i = 0; i < chainLength; i++){
//         buildChain(game.world.width, i*7);
//     }

//     // Create a cage at the position x and y
//     var cage = game.add.sprite(game.world.width, i*7, 'cage');
//     cage.scale.setTo(0.4);
//     cage.anchor.setTo(0.5, 0);

//     // Add the cage to our previously created group
//     cages.add(cage);

//     // Enable physics on the cage
//     game.physics.arcade.enable(cage);
    

//     // Add velocity to the cage to make it move left
//     cage.body.velocity.x = -150;

//     // Automatically kill the cage when it's no longer visible
//     cage.checkWorldBounds = true;
//     cage.outOfBoundsKill = true;
// }

// function buildChain(x, y) {
//     // Create a pipe at the position x and y
//     var chain = game.add.sprite(x, y, 'chain');
//     chain.scale.setTo(0.07);
//     chain.anchor.setTo(0.5, 0);

//     // Enable physics on the pipe
//     game.physics.arcade.enable(chain);

//     // Add velocity to the pipe to make it move left
//     chain.body.velocity.x = -150;

//     // Automatically kill the pipe when it's no longer visible
//     chain.checkWorldBounds = true;
//     chain.outOfBoundsKill = true;
// }

// function createRope(length, xAnchor, yAnchor) {

//     var lastRect;
//     var height = 20;        //  Height for the physics body - your image height is 8px
//     var width = 16;         //  This is the width for the physics body. If too small the rectangles will get scrambled together.
//     var maxForce = 20000;   //  The force that holds the rectangles together.

//     for (var i = 0; i <= length; i++)
//     {
//         var x = xAnchor;                    //  All rects are on the same x position
//         var y = yAnchor + (i * height);     //  Every new rect is positioned below the last

//         if (i % 2 === 0)
//         {
//             //  Add sprite (and switch frame every 2nd time)
//             newRect = game.add.sprite(x, y, 'chain', 1);
//         }   
//         else
//         {
//             newRect = game.add.sprite(x, y, 'chain', 0);
//             lastRect.bringToTop();
//         }

//         //  Enable physicsbody
//         game.physics.p2.enable(newRect, false);

//         //  Set custom rectangle
//         newRect.body.setRectangle(width, height);

//         if (i === 0)
//         {
//             newRect.body.static = true;
//         }
//         else
//         {  
//             //  Anchor the first one created
//             newRect.body.velocity.x = 400;      //  Give it a push :) just for fun
//             newRect.body.mass = length / i;     //  Reduce mass for evey rope element
//         }

//         //  After the first rectangle is created we can add the constraint
//         if (lastRect)
//         {
//             game.physics.p2.createRevoluteConstraint(newRect, [0, -10], lastRect, [0, 10], maxForce);
//         }

//         lastRect = newRect;

//     }

// }


// function freeDove(player, cage) {
//     // dummy cage to show the fade-out effect (temporary solution)
//     hitCageSound.play();
//     var dummyCage = game.add.sprite(cage.x, cage.y, 'cage');
//     dummyCage.scale.setTo(0.4);
//     dummyCage.anchor.setTo(0.5, 0);
//     game.physics.arcade.enable(dummyCage);
//     dummyCage.body.velocity.x = -150;

//     cage.kill();

//     // cage fade-out effect
//     game.add.tween(dummyCage).to( { alpha: 0 }, 500, "Linear", true);
    
//     //  Add and update the score
//     score += 10;
//     scoreText.text = 'Score: ' + score;
// }

module.exports = game;
