class CageFactory{

	constructor(game){
		this.game = game;
		this.cages = this.game.add.group();
		this.cages.enableBody = true;
		this.velocityX = -150;
		this.alternateDistY = 50;
		this.cageDoveMap = {};
		this.hitCageSound = this.game.add.audio('beep');
	}

	getCages(){
		return this.cages;
	}

	addCage(chainLength){
		var i;
	    for(i = -chainLength; i < chainLength; i++){
	        if(i%2 == 0) this.addChain(this.game.world.width, i*13, 0);
	        else this.addChain(this.game.world.width, i*13, 1);
	    }

	    // Create a cage at the position x and y
	    let cage = this.game.add.sprite(this.game.world.width, i*13, 'cage');
	    cage.scale.setTo(0.4);
	    cage.anchor.setTo(0.5, 0);

	    // Enable physics on the cage
	    this.game.physics.arcade.enable(cage);

	    // Add velocity to the cage to make it move left
	    cage.body.velocity.x = this.velocityX;

	    // Automatically kill the cage when it's no longer visible
	    cage.checkWorldBounds = true;
	    cage.outOfBoundsKill = true;

	    this.alternateOnY(cage);
	    
		let dove = this.createDove(this.game.world.width, cage.y + cage.height/2);
		this.alternateOnY(dove);

		this.cageDoveMap[cage] = dove;

	    this.cages.add(cage);
	}


	createDove(x, y){
		let dove = this.game.add.sprite(x, y, 'dove');
	    dove.scale.setTo(0.2);
	    dove.anchor.setTo(0.5, 0);
	    this.game.physics.arcade.enable(dove);
	    dove.body.velocity.x = this.velocityX;
	    dove.checkWorldBounds = true;
	    dove.outOfBoundsKill = true;
	    return dove;
	}

	addChain(x, y, frame){
		// Create a chain element at the position x and y
	    var chain = this.game.add.sprite(x, y, 'chain', frame);
	    chain.anchor.setTo(0.5, 0);
	    chain.scale.setTo(0.5);

	    // Enable physics on the chain element
	    this.game.physics.arcade.enable(chain);

	    // Add velocity to the pipe to make it move left
	    chain.body.velocity.x = this.velocityX;

	    // Automatically kill the chain element when it's no longer visible
	    // chain.checkWorldBounds = true;
	    chain.outOfBoundsKill = true;

	    this.alternateOnY(chain);
	}


	hitCage(hittedCage) {

	    this.hitCageSound.play();
	    
	    // dummy cage to show the fade-out effect (temporary solution)
	    let dummyCage = this.game.add.sprite(hittedCage.x, hittedCage.y, 'cage');
	    dummyCage.scale.setTo(0.4);
	    dummyCage.anchor.setTo(0.5, 0);
	    this.game.physics.arcade.enable(dummyCage);
	    dummyCage.body.velocity.x = this.velocityX;

	    // the cageDoveMap returnd the reference to the dove inside the hitted cage
	    // var dove = this.cageDoveMap[hittedCage];
	    this.doveFly(this.cageDoveMap[hittedCage]);

	    hittedCage.kill();

	    // cage fade-out effect
	    this.game.add.tween(dummyCage).to( { alpha: 0 }, 500, "Linear", true);
	    // cage fall effect (while fadding out)
	    this.game.add.tween(dummyCage).to( { y: dummyCage.y + this.alternateDistY }, 1000, "Linear", true);
	}

	doveFly(dove){
		// translate the dove up (on Y) out of the screen where the sprite gets killed
		this.game.add.tween(dove).to({ y: -dove.height - 10 }, 1000, "Linear", true);

		var xTranslation = getRandomInt(dove.x - 500, dove.x + 100);
		this.game.add.tween(dove).to({ x: xTranslation }, 1000, "Linear", true);
	}

	alternateOnY(sprite){
		this.game.add.tween(sprite).to( { y: sprite.y + this.alternateDistY }, 
			1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
	}
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.CageFactory = CageFactory;