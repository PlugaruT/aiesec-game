class BlueMan{
	constructor(game){
		this.game = game;
		this.player = this.createBlueMan();
	}


	createBlueMan(){
		let player = this.game.add.sprite(100, this.game.world.height / 2, 'blueMan');
		let _ = require('lodash');
    	this.game.physics.arcade.enable(player);

    	player.facingRight = true;

	    player.body.bounce.y = 0.2;
	    player.body.gravity.y = 600;
	    player.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    // player.animations.add('idleRight', [0], 1, false);
	    // player.animations.add('idleLeft', [24], 1, false);
	    player.animations.add('jumpRight', _.range(7, 13), 10, false);
	    // player.animations.add('jumpLeft', _.range(31, 13), 10, false);
	    player.animations.add('rightRun', _.range(14, 24), 18, true);
	    player.animations.add('rightRunFast', _.range(14, 24), 40, true);
	    player.animations.add('rightRunSlow', _.range(14, 24), 12, true);
	    // player.animations.add('leftRun', _.range(38, 48), 18, true);
	    
	    return player;
	}

	getBody(){
		return this.player;
	}

	moveLeft(velocityX = -320){
		this.player.body.velocity.x = velocityX;
        this.player.animations.play('rightRunSlow');
        this.player.facingRight = false;
	}

	moveRight(velocityX = 320){
        this.player.body.velocity.x = velocityX;
        this.player.animations.play('rightRunFast');
        this.player.facingRight = true;
	}

	standStill(){
        this.player.animations.play('rightRun');
     }

	jump(velocityY = -350){
		//  Allow the player to jump if they are touching the ground.
		this.player.body.velocity.y = velocityY;
		if (this.player.facingRight) this.player.animations.play('jumpRight');
	}

	resetXvelocity(){
		this.player.body.velocity.x = 0;
	}
}

module.exports.BlueMan = BlueMan;