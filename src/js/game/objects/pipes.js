class Pipes {

  constructor(game, pipeSprite, pipeVelocity, playerHeight, holeHeight) {
    this.game = game;
    this.pipes = this.game.add.group();
    this.pipeSprite = pipeSprite;
    this.pipeVelocity = pipeVelocity;
    this.playerHeight = playerHeight;
    this.holeHeight = holeHeight;
  }

  getPipeBodies() {
    return this.pipes;
  }

  setVelocity(pipeVelocity) {
    this.pipeVelocity = pipeVelocity;
  }

  addOnePipe(fromTop, stopAt) {
    let pipe = this.game.add.sprite(this.game.world.width, 0, this.pipeSprite);

    pipe.anchor.setTo(0.5);
    pipe.scale.setTo(.2);

    if (fromTop) {
      stopAt -= pipe.height / 2;
      pipe.y = -200;
    } else {
      stopAt += pipe.height / 2;
      pipe.y = this.game.world.height + 200;
    }

    this.game.add.tween(pipe).to({y: stopAt}, 1000, Phaser.Easing.Bounce.Out, true);

    // Add the pipe to our previously created group
    this.pipes.add(pipe);
    // Enable physics on the pipe
    this.game.physics.arcade.enable(pipe);
    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = this.pipeVelocity;

    // Automatically kill the pipe when it's no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  }

  addRowOfPipes() {
    let gameHeight = this.game.world.height;
    let allowedMin = gameHeight / 5;
    let allowedMax = (4 * gameHeight) / 5;
    let startHole = Math.floor(Math.random() * (allowedMax - allowedMin + 1) + allowedMin);
    let endHole = startHole + this.playerHeight * this.holeHeight;

    this.addOnePipe(true, startHole);
    this.addOnePipe(false, endHole);
  }

  setPipesVelocity(velocity) {
    this.pipes.forEach(function (pipe) {
      pipe.body.velocity.x = velocity;
    }, this.game);
  }

  stopPipes() {
    this.setPipesVelocity(0);
  }

}

module.exports.Pipes = Pipes;
