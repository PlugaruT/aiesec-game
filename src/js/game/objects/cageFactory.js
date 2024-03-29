class CageFactory{

	constructor(game){
		this.game = game;
		this.cages = this.game.add.group();
		this.cages.enableBody = true;
		this.chains = this.game.add.group();
		this.chains.enableBody = true;
		this.doves = this.game.add.group();
		this.doves.enableBody = true;
		this.velocityX = -150;
		this.alternateDistY = 40;
		this.hitCageSound = this.game.add.audio('hit_cage');
		this.doveFlightSound = this.game.add.audio('dove_flight');
	}


	getCages(){
		return this.cages;
	}

	addCage(chainLength, x){
		var i;
	    for(i = -chainLength; i < chainLength; i++){
	        if(i%2 == 0) this.addChain(x, i*13, 0);
	        else this.addChain(x, i*13, 1);
	    }

	    // Create a cage at the position x and y
	    let cage = this.game.add.sprite(x, i*13, 'cage');
	    cage.scale.setTo(0.4);
	    cage.anchor.setTo(0.5, 0);

	    // Enable physics on the cage
	    this.game.physics.arcade.enable(cage);
	    cage.body.allowGravity = false;

	    // Add velocity to the cage to make it move left
	    cage.body.velocity.x = this.velocityX;

	    this.alternateOnY(cage);
	    
		let dove = this.createDove(x, cage.y + cage.height/2 - 10);
		this.alternateOnY(dove);

		// this.cageDoveMap[cage] = dove;

	    this.cages.add(cage);
	}


	createDove(x, y){
		let _ = require('lodash');
		let dove = this.game.add.sprite(x, y, 'dove1');
	    dove.scale.setTo(0.6);
	    dove.anchor.setTo(0.5, 0);
	    this.game.physics.arcade.enable(dove);
	    dove.body.allowGravity = false;
	    dove.body.velocity.x = this.velocityX;

	    dove.animations.add('rightFly', _.range(0, 6), 12, true);
	    dove.animations.add('leftFly', _.range(6, 12), 12, true);

	    dove.animations.play('leftFly');

	    this.doves.add(dove);
	    return dove;
	}

	addChain(x, y, frame){
		// Create a chain element at the position x and y
	    var chain = this.game.add.sprite(x, y, 'chain', frame);
	    chain.anchor.setTo(0.5, 0);
	    chain.scale.setTo(0.5);

	    // Enable physics on the chain element
	    this.game.physics.arcade.enable(chain);

	    chain.body.allowGravity = false;

	    // Add velocity to the pipe to make it move left
	    chain.body.velocity.x = this.velocityX;

	    this.alternateOnY(chain);
	    this.chains.add(chain);
	}

	killThemAll(){
		this.chains.forEach(function(chain){
			if(chain.x < 0) chain.kill();
		});

		this.cages.forEach(function(cage){
			if(cage.x < 0) cage.kill();
		});

		this.doves.forEach(function(dove){
			if(dove.x < 0 || dove.y < -dove.height) dove.kill();
		});
	}


	hitCage(hittedCage) {

	    this.hitCageSound.play();
	    
	    // dummy cage to show the fade-out effect (temporary solution)
	    let dummyCage = this.game.add.sprite(hittedCage.x, hittedCage.y, 'cage');
	    dummyCage.scale.setTo(0.4);
	    dummyCage.anchor.setTo(0.5, 0);
	    this.game.physics.arcade.enable(dummyCage);
	    dummyCage.body.allowGravity = false;
	    dummyCage.body.velocity.x = this.velocityX;

	    // return the dove that is inside the hitted cage
	    var dove = this.doves.iterate('x', hittedCage.x, Phaser.Group.RETURN_CHILD);
	    this.doveFly(dove);

	    hittedCage.kill();

	    // cage fade-out effect
	    this.game.add.tween(dummyCage).to( { alpha: 0 }, 500, "Linear", true);
	    // cage fall effect (while fadding out)
	    this.game.add.tween(dummyCage).to( { y: dummyCage.y + this.alternateDistY }, 1000, "Linear", true);
	}

	doveFly(dove){
		this.doveFlightSound.play();
		// translate the dove up (on Y) out of the screen where the sprite gets killed
		this.game.add.tween(dove).to({ y: -dove.height - 10 }, 1000, "Linear", true);

		var xTranslation = getRandomInt(dove.x - 500, dove.x + 100);
		if(xTranslation > dove.x) dove.animations.play('rightFly');
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