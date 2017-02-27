class FlappyBird {

  constructor(game) {
    this.game = game;
  }

  createBird(spriteName, positionX, positionY) {
    this.bird = this.game.add.sprite(positionX, positionY, spriteName);
    this.jumpSound = this.game.add.audio('beep');
    this.bird.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.bird);

    let playerScale = this.game.world.height / (10 * this.bird.body.height);
    let finalHeight = this.bird.body.height * playerScale;
    this.game.add.tween(this.getBody().scale).to({
      x: playerScale,
      y: playerScale
    }, 3000, Phaser.Easing.Linear.None, true);
    let moveTween = this.game.add.tween(this.getBody()).to({x: this.game.world.width / 4}, 3000, Phaser.Easing.Linear.None, true);
    moveTween.onComplete.add(this.addGravity, this);

    return finalHeight;
  }

  addGravity() {
    this.bird.body.gravity.y = 1000;
  }

  isAlive() {
    return this.bird.alive;
  }

  killBird() {
    this.bird.alive = false;
  }

  getBody() {
    return this.bird;
  }

  checkBoundaries(min, max) {
    return this.bird.y < min || this.bird.y > max;
  }

  rotateBody(angle = 20) {
    if (this.bird.angle < angle)
      this.bird.angle += 1;
  }

  jump(velocity = 350) {
    if (this.bird.alive == false)
      return;
    this.jumpSound.play();
    this.bird.body.velocity.y = -velocity;
    // Create an animation on the bird
    // this.game.add.tween(this.bird).to({angle: -20}, 100).start();
  }

}


module.exports.FlappyBird = FlappyBird;
