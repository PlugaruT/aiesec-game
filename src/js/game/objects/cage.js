class Cage{
	constructor(game){
		this.game = game;
		this.cage = this.createCage();
		this.hitCageSound = this.game.add.audio('beep');

		// create the cages group here
	}

	createCage(){
		var chainLength = Math.floor(Math.random() * 20) + 5;
		var i;
	    for(i = 0; i < chainLength; i++){
	        this.addChain(this.game.world.width, i*7);
	    }

	    // Create a cage at the position x and y
	    var cage = this.game.add.sprite(this.game.world.width, i*7, 'cage');
	    cage.scale.setTo(0.4);
	    cage.anchor.setTo(0.5, 0);

	    // Enable physics on the cage
	    this.game.physics.arcade.enable(cage);
	    

	    // Add velocity to the cage to make it move left
	    cage.body.velocity.x = -150;

	    // Automatically kill the cage when it's no longer visible
	    cage.checkWorldBounds = true;
	    cage.outOfBoundsKill = true;

	    return cage;
	}

	getBody(){
		return this.cage;
	}

	addChain(x, y){
		// Create a chain element at the position x and y
	    var chain = this.game.add.sprite(x, y, 'chain');
	    chain.scale.setTo(0.07);
	    chain.anchor.setTo(0.5, 0);

	    // Enable physics on the chain element
	    this.game.physics.arcade.enable(chain);

	    // Add velocity to the pipe to make it move left
	    chain.body.velocity.x = -150;

	    // Automatically kill the chain element when it's no longer visible
	    chain.checkWorldBounds = true;
	    chain.outOfBoundsKill = true;
	}


	freeDove() {
	    // dummy cage to show the fade-out effect (temporary solution)
	    this.hitCageSound.play();
	    let dummyCage = this.game.add.sprite(this.cage.x, this.cage.y, 'cage');
	    dummyCage.scale.setTo(0.4);
	    dummyCage.anchor.setTo(0.5, 0);
	    this.game.physics.arcade.enable(dummyCage);
	    dummyCage.body.velocity.x = -150;

	    this.cage.kill();

	    // cage fade-out effect
	    this.game.add.tween(dummyCage).to( { alpha: 0 }, 500, "Linear", true);
	    
	    // //  Add and update the score
	    // score += 10;
	    // scoreText.text = 'Score: ' + score;
	}
}




}

module.exports.Cage = Cage;