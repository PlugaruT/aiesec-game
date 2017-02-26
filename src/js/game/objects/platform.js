class Platform{

	constructor(game, x, y, len){
		this.game = game;
		this.platform = this.game.add.group();
		this.platform.enableBody = true;
		this.velocityX = -150;
		this.createPlatform(x, y, len);
	}


	createPlatform(x, y, len){
		for(var i=0; i < len; i++){
			this.addBlock(x + i*50, y);
		}
	}

	addBlock(x, y){
		// Create a poster at the position x and y
	    var block = this.game.add.sprite(x, y, 'pipe');

	    // Enable physics on the poster
	    this.game.physics.arcade.enable(block);

	    // Add velocity to the poster to make it move left
	    block.body.velocity.x = this.velocityX;
	    block.body.immovable = true;
	    // Automatically kill the poster when it's no longer visible
	    block.checkWorldBounds = true;
	    block.outOfBoundsKill = true;

	    this.platform.add(block);
	}


}

module.exports.Platform = Platform;