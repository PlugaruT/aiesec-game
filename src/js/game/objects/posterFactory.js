class PosterFactory{

	constructor(game){
		this.game = game;
		this.posters = this.game.add.group();
		this.posters.enableBody = true;
		this.velocityX = -150;
	}

	getPosters(){
		return this.posters;
	}

	addPoster(){
		// Create a poster at the position x and y
	    var poster = this.game.add.sprite(this.game.world.width, 
	    								  this.game.world.height - 64, 'poster');
	    poster.scale.setTo(0.6);
	    poster.anchor.setTo(0, 1);

	    // Enable physics on the poster
	    this.game.physics.arcade.enable(poster);

	    // Add velocity to the poster to make it move left
	    poster.body.velocity.x = this.velocityX;

	    // Automatically kill the poster when it's no longer visible
	    poster.checkWorldBounds = true;
	    poster.outOfBoundsKill = true;

	    this.posters.add(poster);
	}
}

module.exports.PosterFactory = PosterFactory;