class BlueMan{
	constructor(game){
		this.game = game;
		this.player = this.createBlueMan();
	}


	createBlueMan(){
		let _ = require('lodash');
		let player = this.game.add.sprite(100, this.game.world.height / 2, 'blueMan');
		player.scale.setTo(0.8);
    	this.game.physics.arcade.enable(player);

    	player.facingRight = true;
	    player.body.bounce.y = 0.2;
	    player.body.mass = 50;
	    // player.body.gravity.y = 350;
	    player.body.collideWorldBounds = true;

	    player.animations.add('jumpRight', _.range(7, 13), 20, false);
	    player.animations.add('rightRun', _.range(14, 24), 18, true);
	    player.animations.add('rightRunFast', _.range(14, 24), 22, true);
	    player.animations.add('rightRunSlow', _.range(14, 24), 15, true);
	    
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

	jump(velocityY = -475){
		//  Allow the player to jump if they are touching the ground.
		this.player.body.velocity.y = velocityY;
		this.player.animations.play('jumpRight');
	}

	resetXvelocity(){
		this.player.body.velocity.x = 0;
	}
}

module.exports.BlueMan = BlueMan;