var game = {};
var score = 0;
var scoreSprite;
var scoreText;
var player;
var platforms;
var groundBlocks;
var cages;
var hitCageSound;
var winScore = 10;
var jumptimer = 0;
var trampolineJumpSound;
var hitPosterSound;

var _ = require('lodash');
var BlueMan = require('../objects/blueMan.js');
var CageFactory = require('../objects/cageFactory.js');
var PosterFactory = require('../objects/posterFactory.js');
var TrampolineFactory = require('../objects/trampolineFactory.js');
var Weather = require('../objects/weather.js');
var DayNightCycle = require('../objects/dayNightCycle.js');


game.create = function () {
  //  We're going to be using physics, so enable the P2 Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = 700;

  var music = game.add.audio('music');
  music.loop = true;
  music.play();

  //------------ WEATHER------------
  let scaleRatio = window.devicePixelRatio / 2;

  this.weather = new Weather.Weather(this.game);

  this.dayNightCycle = new DayNightCycle.DayNightCycle(this.game, 30000);

  let bgBitMap = this.game.add.bitmapData(this.game.width, this.game.height);

  bgBitMap.ctx.rect(0, 0, this.game.width, this.game.height);
  bgBitMap.ctx.fillStyle = '#b2ddc8';
  bgBitMap.ctx.fill();

  this.backgroundSprite = this.game.add.sprite(0, 0, bgBitMap);

  this.sunSprite = this.game.add.sprite(50, -250, 'sun');
  this.sunSprite.scale.setTo(scaleRatio);
  this.moonSprite = this.game.add.sprite(this.game.width - (this.game.width / 4), this.game.height + 500, 'moon');


  this.mountainsBack = this.game.add.tileSprite(0,
    this.game.height - this.game.cache.getImage('mountains-back').height,
    this.game.width,
    this.game.cache.getImage('mountains-back').height,
    'mountains-back'
  );

  this.mountainsMid1 = this.game.add.tileSprite(0,
    this.game.height - this.game.cache.getImage('mountains-mid1').height,
    this.game.width,
    this.game.cache.getImage('mountains-mid1').height,
    'mountains-mid1'
  );

  this.mountainsMid2 = this.game.add.tileSprite(0,
    this.game.height - this.game.cache.getImage('mountains-mid2').height,
    this.game.width,
    this.game.cache.getImage('mountains-mid2').height,
    'mountains-mid2'
  );

  let backgroundSprites = [
    {sprite: this.backgroundSprite, from: 0x1f2a27, to: 0xB2DDC8},
    {sprite: this.mountainsBack, from: 0x2f403b, to: 0x96CCBB},
    {sprite: this.mountainsMid1, from: 0x283632, to: 0x8BBCAC},
    {sprite: this.mountainsMid2, from: 0x202b28, to: 0x82AD9D}
  ];

  this.dayNightCycle.initShading(backgroundSprites);
  this.dayNightCycle.initSun(this.sunSprite);
  this.dayNightCycle.initMoon(this.moonSprite);

  createGround();

  // //  The platforms group contains the ground and the 2 ledges we can jump on
  // platforms = game.add.group();

  // //  We will enable physics for any object that is created in this group
  // platforms.enableBody = true;

  // // Here we create the ground.
  // var ground = platforms.create(0, game.world.height - 64, 'ground');

  // //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  // ground.scale.setTo(2, 2);

  // //  This stops it from falling away when you jump on it
  // ground.body.immovable = true;

  player = new BlueMan.BlueMan(game);
  cageFactory = new CageFactory.CageFactory(game);
  posterFactory = new PosterFactory.PosterFactory(game);
  trampolineFactory = new TrampolineFactory.TrampolineFactory(game);

  trampolineJumpSound = game.add.audio('trampoline_jump');
  hitPosterSound = game.add.audio('hit_poster');

  cursors = game.input.keyboard.createCursorKeys();

  this.timer = game.time.events.loop(6000, spawnCage, game);
  this.timer = game.time.events.loop(12000, spawnPoster, game);
  this.timer = game.time.events.loop(15000, spawnTrampoline, game);
  this.timer = game.time.events.loop(200, addGround, game);
  // this.timer = game.time.events.loop(4000, spawnPlatform, game);

  // scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
  var doveScoreSprite = this.game.add.sprite(25, 25, 'dove');
  doveScoreSprite.scale.setTo(0.15);
  doveScoreSprite.anchor.setTo(0.5);
  scoreSprite = this.game.add.sprite(25 + doveScoreSprite.width / 1.5, 25, 'peace_progress', 0);
  scoreSprite.scale.setTo(0.5);
  scoreSprite.anchor.setTo(0, 0.5)

};


game.update = function () {

  // so that doves appears INSIDE the cage
  game.world.bringToTop(cageFactory.cages);

  var hitPlatform = game.physics.arcade.collide(player.getBody(), platforms) ||
    game.physics.arcade.collide(player.getBody(), groundBlocks);

  game.physics.arcade.overlap(player.getBody(), cageFactory.getCages(),
    playerCageCollision, null, this);

  game.physics.arcade.overlap(player.getBody(), posterFactory.getPosters(),
    playerPosterCollision, null, this);

  game.physics.arcade.overlap(player.getBody(), trampolineFactory.getTrampolines(),
    playerTrampolineCollision, null, this);

  player.resetXvelocity();

  if (cursors.left.isDown)
    player.moveLeft();
  else if (cursors.right.isDown)
    player.moveRight();
  else if (hitPlatform)
    player.standStill();

  //Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.getBody().body.touching.down && hitPlatform)
    player.jump(-(5 / 6) * game.world.height);

  // kills the chain, cage and dove once they are offscreen (on the left)
  cageFactory.killThemAll();

  groundBlocks.forEach(function (block) {
    block.body.x -= 4;
  });

  this.mountainsBack.tilePosition.x -= 0.1;
  this.mountainsMid1.tilePosition.x -= 0.3;
  this.mountainsMid2.tilePosition.x -= 0.75;
};


function spawnCage() {
  var chainLength = Math.floor(Math.random() * 12) + 3;
  var platformLength = 0;
  var displacement = 0;

  // if cage is unreachable than we need a platform
  if (chainLength < 9) {
    platformLength = Math.floor(Math.random() * 5) + 3;
    createPlatform(game.world.width, game.world.height - 250 + chainLength * 10, platformLength);
    displacement = 120;
  }

  cageFactory.addCage(chainLength, game.world.width + platformLength * 50 + displacement);
}

function spawnTrampoline() {
  trampolineFactory.addTrampoline();
}

function spawnPoster() {
  posterFactory.addPoster();
}


function createGround() {

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();
  groundBlocks = game.add.group();

  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true;
  groundBlocks.enableBody = true;

  var groundLength = parseInt(game.world.width / 64);

  for (var i = 0; i < groundLength + 1; i++) {
    var ground = platforms.create(i * 64, game.world.height - 64, 'ground');
    ground.body.allowGravity = false;
    ground.body.immovable = true;
    ground.checkWorldBounds = true;
    ground.outOfBoundsKill = true;
    groundBlocks.add(ground);
  }
}

function addGround() {
  var ground = platforms.create(game.world.width, game.world.height - 64, 'ground');
  ground.body.allowGravity = false;
  ground.body.immovable = true;
  groundBlocks.add(ground);
  ground.checkWorldBounds = true;
  ground.outOfBoundsKill = true;
}


function createPlatform(x, y, len) {
  var frame = 0;
  for (var i = 0; i < len; i++) {

    if (i == 0) frame = 0;
    else if (i == len - 1) frame = 2;
    else frame = 1;

    var block = platforms.create(x + i * 50, y, 'blocks', frame);
    block.body.allowGravity = false;
    block.body.immovable = true;
    block.body.velocity.x = -150;

    block.body.checkCollision.down = false;
    block.body.checkCollision.left = false;
    block.body.checkCollision.right = false;
  }
}


function playerCageCollision(player, cage) {
  cageFactory.hitCage(cage);
  changeScore(1);
}


function playerPosterCollision(player, poster) {
  hitPosterSound.play();
  changeScore(-1);
  poster.kill();
}

function playerTrampolineCollision(player, trampoline) {
  trampolineJumpSound.play();
  game.add.tween(player).to({y: 10}, 700, Phaser.Easing.Quadratic.Out, true);
}


function changeScore(unit) {
  //  Add and update the score
  score += unit;
  if (score > winScore) score = winScore;
  else if (score < 0) score = 0;

  scoreSprite.frame = score;
}


module.exports = game;
