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

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    // var ledge = platforms.create(400, 400, 'ground');

    // ledge.body.immovable = true;

    // ledge = platforms.create(-150, 250, 'ground');

    // ledge.body.immovable = true;

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
    player.animations.add('rightRun', _.range(14, 24), 24, true);
    player.animations.add('leftRun', _.range(38, 48), 24, true);

    cursors = game.input.keyboard.createCursorKeys();

    stars = game.add.group();
    stars.enableBody = true;

    for (var i = 0; i < 12; i++) {
        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 6;

        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
};


game.update = function () {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

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

function collectStar(player, star) {

    // Removes the star from the screen
    star.kill();
    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}

module.exports = game;
