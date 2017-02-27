class PosterFactory{

	constructor(game){
		this.game = game;
		this.posters = this.game.add.group();
		this.posters.enableBody = true;
		this.velocityX = -100;
		this.frame = -1;
	}

	getPosters(){
		return this.posters;
	}

	addPoster(){
		this.frame += 1;
		if(this.frame >= 5) this.frame = 0
		// Create a poster at the position x and y
	    var poster = this.game.add.sprite(this.game.world.width, 
	    								  this.game.world.height - 64, 'posters', this.frame);
	    poster.scale.setTo(0.5);
	    poster.anchor.setTo(0, 1);

	    // Enable physics on the poster
	    this.game.physics.arcade.enable(poster);
	    poster.body.allowGravity = false;

	    // Add velocity to the poster to make it move left
	    poster.body.velocity.x = this.velocityX;

	    // Automatically kill the poster when it's no longer visible
	    poster.checkWorldBounds = true;
	    poster.outOfBoundsKill = true;

	    poster.body.width = poster.width/2;    
	    poster.body.height = poster.height/2;

	    // this.game.debug.renderPhysicsBody(poster.body);

	    this.posters.add(poster);
	}
}

module.exports.PosterFactory = PosterFactory;