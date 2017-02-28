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

  addOnePipe(fromTop, stopAt, index, addBase) {

    console.log(addBase);
    let base;
    let stopPipe;
    let pipe = this.game.add.sprite(this.game.world.width, 0, 'towers', index);
    if (addBase)
      base = this.game.add.sprite(this.game.world.width, 0, 'block');


    pipe.anchor.setTo(0.5);
    if (addBase)
      base.anchor.setTo(0.5);
    // pipe.scale.setTo(.2);

    if (fromTop) {
      stopPipe = stopAt - pipe.height / 2;
      pipe.angle = 180;
      pipe.y = -200;
      if (addBase) {
        base.y = -200;
        stopAt -= base.height * 1.5;
      }
    } else {
      stopPipe = stopAt + pipe.height / 2;
      pipe.y = this.game.world.height + 200;
      if (addBase) {
        base.y = this.game.world.height + 200;
        stopAt += base.height * 1.5;
      }
    }

    this.game.add.tween(pipe).to({y: stopPipe}, 1000, Phaser.Easing.Bounce.Out, true);
    if (addBase)
      this.game.add.tween(base).to({y: stopAt}, 1000, Phaser.Easing.Bounce.Out, true);

    // Add the pipe to our previously created group
    this.pipes.add(pipe);
    if (addBase)
      this.pipes.add(base);
    // Enable physics on the pipe
    this.game.physics.arcade.enable(pipe);
    if (addBase)
      this.game.physics.arcade.enable(base);

    let newWidth = pipe.body.width / 3;
    pipe.body.setSize(newWidth, pipe.body.height, newWidth, 0);
    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = this.pipeVelocity;
    if (addBase)
      base.body.velocity.x = this.pipeVelocity;

    // Automatically kill the pipe when it's no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
    if (addBase) {
      base.checkWorldBounds = true;
      base.outOfBoundsKill = true;
    }
  }

  addRowOfPipes() {
    let gameHeight = this.game.world.height;
    let allowedMin = gameHeight / 3;
    let allowedMax = (2 * gameHeight) / 3;
    let startHole = Math.floor(Math.random() * (allowedMax - allowedMin + 1) + allowedMin);
    let endHole = startHole + this.playerHeight * this.holeHeight;

    let index = this.selectPipe();
    console.log(index);
    console.log('start ', startHole, 'end ', endHole);

    this.addOnePipe(true, startHole, index, startHole > 400);
    this.addOnePipe(false, endHole, index, endHole < 400);
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
