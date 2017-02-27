class Pipes {

  constructor(game, pipeNames, pipeSprites, pipeVelocity, playerHeight, holeHeight) {
    this.game = game;
    this.pipes = this.game.add.group();
    this.pipeNames = pipeNames;
    this.pipeSprites = pipeSprites;
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

  addOnePipe(fromTop, stopAt, index) {

    let pipe = this.game.add.sprite(this.game.world.width, 0, 'towers', index);

    pipe.anchor.setTo(0.5);
    // pipe.scale.setTo(.2);

    if (fromTop) {
      stopAt -= pipe.height / 2;
      pipe.angle = 180;
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

    let newWidth = pipe.body.width /3;
    pipe.body.setSize(newWidth, pipe.body.height, newWidth, 0);
    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = this.pipeVelocity;

    // Automatically kill the pipe when it's no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  }

  addRowOfPipes() {
    let gameHeight = this.game.world.height;
    let allowedMin = gameHeight / 3;
    let allowedMax = (2 * gameHeight) / 3;
    let startHole = Math.floor(Math.random() * (allowedMax - allowedMin + 1) + allowedMin);
    let endHole = startHole + this.playerHeight * this.holeHeight;

    let index = this.selectPipe();
    this.addOnePipe(true, startHole, index);
    this.addOnePipe(false, endHole, index);
  }

  setPipesVelocity(velocity) {
    this.pipes.forEach(function (pipe) {
      pipe.body.velocity.x = velocity;
    }, this.game);
  }

  selectPipe() {
    return Math.floor(Math.random() * this.pipeNames.length);
  }

  stopPipes() {
    this.setPipesVelocity(0);
  }

}

module.exports.Pipes = Pipes;
