class Pipes {

  constructor(game, pipeSprite, playerHeight) {
    this.game = game;
    this.pipes = this.game.add.group();
    this.pipeSprite = pipeSprite;
    this.playerHeight = playerHeight;
  }

  getPipeBodies() {
    return this.pipes;
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

    this.game.add.tween(pipe).to({y: stopAt}, 1500, Phaser.Easing.Bounce.Out, true);

    // Add the pipe to our previously created group
    this.pipes.add(pipe);
    // Enable physics on the pipe
    this.game.physics.arcade.enable(pipe);
    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200;

    // Automatically kill the pipe when it's no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  }

  addRowOfPipes() {
    let gameHeight = this.game.world.height;
    let startHole = Math.floor(Math.random() * gameHeight);
    let endHole = startHole + this.playerHeight * 3;

    this.addOnePipe(true, startHole);
    this.addOnePipe(false, endHole);
  }

  stopPipes() {
    // Go through all the pipes, and stop their movement
    this.pipes.forEach(function (pipe) {
      pipe.body.velocity.x = 0;
    }, this.game);
  }

}

module.exports.Pipes = Pipes;
