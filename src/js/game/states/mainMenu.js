var game = {};
var _ = require('lodash');
var buttons;
var buttonPeace;
var buttonSolution;
var buttonLevelup;
var scaleButtons = 0.25;
var text;
var Weather = require('../objects/weather.js');
var DayNightCycle = require('../objects/dayNightCycle.js');

game.create = function () {
    
    game.stage.backgroundColor = '#FFFFFF';
    game.physics.startSystem(Phaser.Physics.ARCADE);

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

    // this.weather.addRain(1);
    // this.weather.addFog();

    let backgroundSprites = [
        {sprite: this.backgroundSprite, from: 0x1f2a27, to: 0xB2DDC8},
        {sprite: this.mountainsBack, from: 0x2f403b, to: 0x96CCBB},
        {sprite: this.mountainsMid1, from: 0x283632, to: 0x8BBCAC},
        {sprite: this.mountainsMid2, from: 0x202b28, to: 0x82AD9D}
    ];

    this.dayNightCycle.initShading(backgroundSprites);
    this.dayNightCycle.initSun(this.sunSprite);
    this.dayNightCycle.initMoon(this.moonSprite);


    var menuImage = game.add.sprite(game.world.centerX, game.world.centerY/2, 'mainMenu');
    menuImage.anchor.setTo(0.5);

    var textY = menuImage.y + menuImage.height/2 + 10;

    text = game.add.text(game.world.width/2, textY, 'Choose a game mode:', {fontSize: '32px', fill: '#fff'});
    text.anchor.setTo(0.5);

    var buttonY = text.y + 20;

    var firstButtonX = game.world.width / 5;

    buttonPeace =  game.add.button(firstButtonX, buttonY, 'buttons',
        function(){
            game.state.start("peaceGame");
        },
        this, 1, 0 ,2).scale.setTo(scaleButtons);


    buttonSolution = game.add.button(firstButtonX + scaleButtons*1000 + 10, buttonY, 'buttons',
        function(){
            game.state.start("flappy");
        },
        this, 4, 3 ,5).scale.setTo(scaleButtons);

    buttonLevelup = game.add.button(firstButtonX+ 2*scaleButtons*1000 + 10, buttonY, 'buttons',
        function(){
          game.state.start("game");  
        },
        this, 7, 6 ,8).scale.setTo(scaleButtons);

    // buttons.align(1, -1, 50, 50);

    // buttons.add(buttonPeace);
    // buttons.add(buttonSolution);
    // buttons.add(buttonLevelup);
};

game.update = function () {
    this.mountainsBack.tilePosition.x -= 0.1;
    this.mountainsMid1.tilePosition.x -= 0.3;
    this.mountainsMid2.tilePosition.x -= 0.75;
};

module.exports = game;
