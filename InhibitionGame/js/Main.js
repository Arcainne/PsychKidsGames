/* 
 * Author: Sean Smith
 * Created: 1/18/2016
 */

// Create the global Phaser.Game object
var game = new Phaser.Game('100', '100', Phaser.AUTO, '');

// Create primary namespace
var INHIB = {
    'spritePairCount' : 9
};

// Create global empty Main state object
INHIB.Main = function (game) {};

// Define the global Main state object
INHIB.Main.prototype = {
    // Called to load images and scripts
    preload: function () {
        // Initially hide the tool bar
        $("#toolbar").hide();

        // Load images and scripts for the Splash screen state
        game.load.image('logo', 'images/LOGO_tiny_1.jpg');
        game.load.image('loading', 'images/loading.png');
    },
    // Starting function called after 'preload'
    create: function () {
        // Start the Splash state
        game.state.add('Splash', INHIB.Splash);
        game.state.start('Splash');
    }
};

// Add all game states to the main Phaser.Game object
game.state.add('Main', INHIB.Main);

// Start this Main state
game.state.start('Main');