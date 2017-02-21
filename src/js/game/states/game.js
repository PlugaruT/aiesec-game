var Weather = require('../objects/weather.js');
var DayNightCycle = require('../objects/dayNightCycle.js');
var game = {};

game.create = function () {
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.stage.backgroundColor = '#000';

  this.weather = new Weather.Weather(this.game);

  this.dayCycle = new DayNightCycle.DayNightCycle(this.game, 5000);

  let bgBitMap = this.game.add.bitmapData(this.game.width, this.game.height);

  bgBitMap.ctx.rect(0, 0, this.game.width, this.game.height);
  bgBitMap.ctx.fillStyle = '#b2ddc8';
  bgBitMap.ctx.fill();

  this.backgroundSprite = this.game.add.sprite(0, 0, bgBitMap);

  this.sunSprite = this.game.add.sprite(50, -250, 'sun');
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

  this.weather.addRain();
  // this.weather.addFog();

  let backgroundSprites = [
    {sprite: this.backgroundSprite, from: 0x1f2a27, to: 0xB2DDC8},
    {sprite: this.mountainsBack, from: 0x2f403b, to: 0x96CCBB},
    {sprite: this.mountainsMid1, from: 0x283632, to: 0x8BBCAC},
    {sprite: this.mountainsMid2, from: 0x202b28, to: 0x82AD9D}
  ];

  this.dayCycle.initShading(backgroundSprites);
  this.dayCycle.initSun(this.sunSprite);
  this.dayCycle.initMoon(this.moonSprite);

};

game.update = function () {
  this.mountainsBack.tilePosition.x -= 0.05;
  this.mountainsMid1.tilePosition.x -= 0.3;
  this.mountainsMid2.tilePosition.x -= 0.75;
};


module.exports = game;
