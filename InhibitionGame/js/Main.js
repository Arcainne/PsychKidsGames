/* 
 * Author: Sean Smith
 * Created: 1/18/2016
 */

// Create the global Phaser.Game object
var game = new Phaser.Game('100', '100', Phaser.AUTO, '');

// Create global empty Main state object
var Main = function () {};

// Define the global Main state object
Main.prototype = {
    // Called to load images and scripts
    preload: function () {
        // Load images and scripts for the Splash screen state
        game.load.script('utilities', 'js/libs/utilities.js');
        game.load.script('splash', 'js/states/Splash.js');
        game.load.image('logo', 'images/LOGO_tiny_1.jpg');
        game.load.image('loading', 'images/loading.png');
        game.load.image('cat', 'images/cat.png');
        game.load.image('ghost', 'images/ghost.png');
        //game.load.image('bomb', 'images/bomb.png');
        game.load.image('bear', 'images/bear.png');
        game.load.image('playButton', 'images/play_button.png');
        game.load.image('instructionsButton', 'images/instructions_button.png');
        game.load.image('owl', 'images/owl.png');
    },
    // Starting function called after 'preload'
    create: function () {
        // Add Splash state to the game state list
        game.state.add('Splash', Splash);
        // Start the Splash state
        game.state.start('Splash');
    }
};

// Add this Main state to the game state list
game.state.add('Main', Main);
// Start this Main state
game.state.start('Main');