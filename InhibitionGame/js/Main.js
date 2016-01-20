/* 
 * Author: Sean Smith
 * Created: 1/18/2016
 */

// Main game var with predeclared functions
var game = new Phaser.Game('100', '100', Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

// Global sprite vars
var catSprite;
var ghostSprite;
var playButtonSprite;

// Called to preload images
function preload() {
    // Load test sprites
    game.load.image('cat', 'images/cat.png');
    game.load.image('ghost', 'images/ghost.png');
    game.load.image('playButton', 'images/play_button.png');
}

// Called after preloading
function create() {
    game.stage.backgroundColor = '#99CCFF';
    
    // Create sprites for testing
    catSprite = game.add.sprite(game.world.width / 4, game.world.height / 3, 'cat');
    catSprite.anchor.set(0.5, 0.5);
    
    ghostSprite = game.add.sprite(game.world.width - game.world.width / 4, game.world.height - game.world.height / 3, 'ghost');
    ghostSprite.anchor.set(0.5, 0.5);
    
    playButtonSprite = game.add.sprite(game.world.width / 2, game.world.height / 2, 'playButton');
    playButtonSprite.anchor.set(0.5, 0.5);
}

// Continuously called
function update() {
    // Test code to move sprites randomly
    catSprite.x += Math.random() <= 0.5 ? -1 : 1;
    catSprite.y += Math.random() <= 0.5 ? -1 : 1;
    ghostSprite.x += Math.random() <= 0.5 ? -1 : 1;
    ghostSprite.y += Math.random() <= 0.5 ? -1 : 1;
}