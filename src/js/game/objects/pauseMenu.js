class PauseMenu {
  constructor(game) {
    this.game = game;
  }

  createLabel() {
    // Create a label to use as a button
    this.pauseLabel = this.game.add.text(w - 100, 20, 'Pause', {font: '24px Arial', fill: '#fff'});
    pauseLabel.inputEnabled = true;
    pauseLabel.events.onInputUp.add(function () {
      // When the paus button is pressed, we pause the game
      this.game.paused = true;

      // Then add the menu
      menu = this.game.add.sprite(w / 2, h / 2, 'menu');
      menu.anchor.setTo(0.5, 0.5);

      // And a label to illustrate which menu item was chosen. (This is not necessary)
      choiseLabel = game.add.text(w / 2, h - 150, 'Click outside menu to continue', {font: '30px Arial', fill: '#fff'});
      choiseLabel.anchor.setTo(0.5, 0.5);
    });
  }
}

module.exports.PauseMenu = PauseMenu;
