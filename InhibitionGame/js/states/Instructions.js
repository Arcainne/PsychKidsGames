/* 
 * Author: Sean Smith
 * Created: 1/20/2016
 */

// Create global empty Instructions state object
INHIB.Instructions = function () {};

// Definition of global Instructions state object
INHIB.Instructions.prototype = {
    // Initialization function called before 'create'
    init: function () {
        // Create title text
        this.titleText = game.make.text(game.world.centerX, 40, "Inhibition Game Prototype", {
            font: 'bold 24pt Arial',
            fill: '#0000000',
            align: 'center'
        });
        this.titleText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);

        // Create instructions sprite object
        this.instructionsSprite = game.make.sprite(game.world.centerX, this.titleText.y + this.titleText.height * 1.5, 'instructionsButton');
        this.instructionsSprite.scale.set(1, 1);

        // Create instructions text
        this.instructionsText = game.make.text(
                game.world.centerX,
                this.instructionsSprite.y + this.instructionsSprite.height / 1.5,
                "When the CAT/OWL appears, tap it for a point. Try to avoid tapping the DOG/BEAR.",
                {
                    font: 'bold 20pt Arial',
                    fill: 'black',
                    align: 'center',
                    wordWrap: true,
                    wordWrapWidth: game.world.width / 3
                }
        );
        this.instructionsText.anchor.set(0.5, 0);
        
        // Get random sprite pair
        var spriteID = Math.round(INHIB.Utils.randRange(0, 8));
        
        // Create target sprite
        this.targetSprite = game.make.sprite(game.world.width / 4, this.instructionsText.y + this.instructionsText.height / 2 - 70, 'pair'+spriteID+'_1');
        this.targetSprite.width = 100;
        this.targetSprite.height = 100;
        
        // Create inhibit sprite object
        this.inhibitSprite = game.make.sprite(game.world.width - game.world.width / 4 - 100, this.instructionsText.y + this.instructionsText.height / 2 - 60, 'pair'+spriteID+'_2');
        this.inhibitSprite.width = 100;
        this.inhibitSprite.height = 100;

        // Create play button sprite object
        this.playButtonSprite = game.add.sprite(game.world.centerX, this.instructionsText.y + this.instructionsText.height, 'playButton');
        this.playButtonSprite.anchor.set(0.5, 0);
        this.playButtonSprite.scale.set(0.4, 0.4);

        // Center sprite objects anchor
        INHIB.Utils.centerGameObjects([this.titleText, this.instructionsSprite]);
    },
    // Starting function called after 'init'
    create: function () {
        // Make background color light blue
        game.stage.backgroundColor = '#99CCFF';

        // Add all sprites/display objects to the game to be drawn
        game.add.existing(this.titleText);
        game.add.existing(this.instructionsSprite);
        game.add.existing(this.instructionsText);
        game.add.existing(this.targetSprite);
        game.add.existing(this.inhibitSprite);
        game.add.existing(this.playButtonSprite);
        this.playButtonSprite.inputEnabled = true;
        this.playButtonSprite.events.onInputDown.add(listener, this);
    }
};
function listener(){
    game.state.start('Game');
}