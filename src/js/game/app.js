var _ = require('lodash')
  , properties = require('./properties')
  , states =
    { boot: require('./states/boot.js')
    , preloader: require('./states/preloader.js')
    , game: require('./states/game.js')
    }
  , game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'game');

// Automatically register each state.
_.each(states, function(state, key) {
  game.state.add(key, state);
});

game.state.start('boot');
