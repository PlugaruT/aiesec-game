var game = {};
var score = 0;
var scoreText;
// var platforms;
// var cursors;

game.create = function () {
    //  We're going to be using physics, so enable the Arcade Physics system
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
    var ledge = platforms.create(400, 400, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 150, 'dude');
    // game.add.tween(player).to({angle: 180}, 1, Phaser.Easing.Linear.None, true);
    // player.anchor.setTo(.5, .5);
    // player.anchor.scale.y *= -1;

    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();

    stars = game.add.group();
    stars.enableBody = true;

    for (var i = 0; i < 12; i++){
        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 6;

        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
};


game.update = function () {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    this.game.debug.text(hitPlatform);
    //  Reset the players velocity (movement)
    // player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else if (cursors.right.isDown) {
    //      Move to the right
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -350;
    }
};

function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();
    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}

module.exports = game;
