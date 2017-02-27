class TrampolineFactory{

	constructor(game){
		this.game = game;
		this.trampolines = this.game.add.group();
		this.trampolines.enableBody = true;
		this.velocityX = -150;
	}

	getTrampolines(){
		return this.trampolines;
	}

	addTrampoline(){

		var trampoline = this.game.add.sprite(this.game.world.width, 
	    								  this.game.world.height - 64 - 50, 'trampoline');

	    // Enable physics on the poster
	    this.game.physics.arcade.enable(trampoline);
	    trampoline.body.allowGravity = false;
	    // Add velocity to the poster to make it move left
	    trampoline.body.velocity.x = this.velocityX;

	    // Automatically kill the poster when it's no longer visible
	    trampoline.checkWorldBounds = true;
	    trampoline.outOfBoundsKill = true;

	    // this.game.debug.renderPhysicsBody(poster.body);

	    trampoline.animations.add('glow', [0, 1], 10, true);
	    trampoline.animations.play('glow');

	    trampoline.body.checkCollision.down = false;
        trampoline.body.checkCollision.left = false;
        trampoline.body.checkCollision.right = false;

	    this.trampolines.add(trampoline);
	}

	
}

module.exports.TrampolineFactory = TrampolineFactory;