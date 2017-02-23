var game = {};
var _ = require('lodash');
var buttonPeace;
var buttonSolution;
var buttonWorldCitizen;
var scaleButtons = 0.25;

game.create = function () {
    
    game.stage.backgroundColor = '#FFFFFF';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var menuImage = game.add.sprite(game.world.centerX, game.world.centerY/2, 'mainMenu');
    menuImage.anchor.setTo(0.5);

    var buttonY = menuImage.y + menuImage.height/2 + 10;

    buttonPeace =  game.add.button(10, buttonY, 'buttons',
        function(){
            game.state.start("peaceGame");
        },
        this, 1, 0 ,2).scale.setTo(scaleButtons);

    buttonSolution = game.add.button(scaleButtons*1000 + 10, buttonY, 'buttons',
        function(){
            game.state.start("flappy");
        },
        this, 4, 3 ,5).scale.setTo(scaleButtons);

    buttonWorldCitizen = game.add.button(2*scaleButtons*1000 + 10, buttonY, 'buttons',
        function(){
          game.state.start("game");  
        },
        this, 7, 6 ,8).scale.setTo(scaleButtons);
};

game.update = function () {

};

module.exports = game;
