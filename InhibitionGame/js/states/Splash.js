/* 
 * Author: Sean Smith
 * Created: 1/22/2016
 */

// Create global empty Splash state object
var Splash = function () {};

// Definition of global Splash state object
Splash.prototype = {
    // Function to load all the scripts and states needed for the game
    loadScripts: function () {
        // Load all states and js files
        game.load.script('instructions', 'js/states/Instructions.js');
        game.load.script('game', 'js/states/Game.js');
    },
    // function to load all of the images needed for the game
    loadImages: function () {
        // Load images for the game
        game.load.image('cat', 'images/cat.png');
        game.load.image('ghost', 'images/ghost.png');
        game.load.image('playButton', 'images/play_button.png');
        game.load.image('instructionsButton', 'images/instructions_button.png');
    },
    // Initialization function called before 'preload' to initialize/create class objects
    init: function () {
        // Create class objects
        this.logo = game.make.sprite(game.world.centerX, game.world.centerY - 50, 'logo');
        this.logo.scale.set(1.5, 1.5);
        this.loadingBar = game.make.sprite(game.world.centerX, game.world.centerY + 50, 'loading');
        this.status = game.make.text(game.world.centerX, game.world.centerY + 100, 'Loading...', {fill: 'black'});

        // Center all the passed objects' anchors
        utilities.centerGameObjects([this.logo, this.loadingBar, this.status]);
    },
    // Function called after 'init' to call all the load functions
    preload: function () {
        // Set background color to white
        game.stage.backgroundColor = '#FFFFFF';

        // Add the class display objects/text
        game.add.existing(this.logo);
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar);

        // Call corresponding load functions
        this.loadScripts();
        this.loadImages();
    },
    // Function to handle adding all the states for the game
    addGameStates: function () {
        // Add all game states to the main Phaser.Game object
        game.state.add('Instructions', Instructions);
        game.state.add('Game', Game);
    },
    // Function called after 'preload' to apply states and transition to next state
    create: function () {
        // Update loading text when complete
        this.status.setText('Ready!');
        // Call function to add all loaded game states
        this.addGameStates();

        // Timeout of 2sec until state transition
        setTimeout(function () {
            game.state.start("Instructions");
        }, 2000);
    }
};