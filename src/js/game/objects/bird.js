class FlappyBird {

  constructor(game) {
    this.game = game;
  }

  createBird(spriteName, positionX, positionY) {
    this.bird = this.game.add.sprite(positionX, positionY, spriteName);
    this.jumpSound = this.game.add.audio('beep');
    this.bird.anchor.setTo(-0.2, 0.5);
    this.game.physics.arcade.enable(this.bird);
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
    this.game.add.tween(this.bird).to({angle: -20}, 100).start();
  }

}


module.exports.FlappyBird = FlappyBird;
