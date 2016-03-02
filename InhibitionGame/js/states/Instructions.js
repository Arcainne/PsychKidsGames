/* 
 * Author: Sean Smith
 * Created: 1/20/2016
 */

// Create global empty Instructions state object
var Instructions = function () {};
var text;
var counter = 0;

// Definition of global Instructions state object
Instructions.prototype = {
    // Initialization function called before 'create'
    init: function () {
        // Create title text
        this.titleText = game.make.text(game.world.centerX, 40, "ISIS Inhibition Game Prototype", {
            font: 'bold 24pt Arial',
            fill: '#0000000',
            align: 'center'
        });
        this.titleText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);

        // Create instructions sprite object
        this.instructionsSprite = game.make.sprite(game.world.centerX, this.titleText.y + this.titleText.height * 1.5, 'instructionsButton');
        this.instructionsSprite.scale.set(1.5, 1.5);

        // Create instructions text
        this.instructionsText = game.make.text(
                game.world.centerX,
                this.instructionsSprite.y + this.instructionsSprite.height / 1.5,
                "When the CAT appears, tap it for a point. Try to avoid tapping the GHOST.",
                {
                    font: 'bold 20pt Arial',
                    fill: 'black',
                    align: 'center',
                    wordWrap: true,
                    wordWrapWidth: game.world.width / 3
                }
        );
        this.instructionsText.anchor.set(0.5, 0);

        // Create cat sprite object
        this.catSprite = game.make.sprite(game.world.width / 4, this.instructionsText.y + this.instructionsText.height / 2, 'cat');
        this.catSprite.scale.set(0.5, 0.5);

        // Create ghost sprite object
        this.ghostSprite = game.make.sprite(game.world.width - game.world.width / 4, this.instructionsText.y + this.instructionsText.height / 2, 'ghost');
        this.ghostSprite.scale.set(0.5, 0.5);

        // Create play button sprite object
        this.playButtonSprite = game.add.sprite(game.world.centerX, this.instructionsText.y + this.instructionsText.height, 'playButton');
        this.playButtonSprite.anchor.set(0.5, 0);
        this.playButtonSprite.scale.set(0.5, 0.5);

        utilities.centerGameObjects([this.titleText, this.instructionsSprite, this.catSprite, this.ghostSprite]);
    },
    // Starting function called after 'init'
    create: function () {
        // Make background color light blue
        game.stage.backgroundColor = '#99CCFF';

        // Add all sprites/display objects to the game to be drawn
        game.add.existing(this.titleText);
        game.add.existing(this.instructionsSprite);
        game.add.existing(this.instructionsText);
        game.add.existing(this.catSprite);
        game.add.existing(this.ghostSprite);
        game.add.existing(this.playButtonSprite);
        this.playButtonSprite.inputEnabled = true;
        this.playButtonSprite.events.onInputDown.add(listener, this)
    },
    // Main update function that is called repeatedly
    update: function () {
        // Test code to move sprites randomly
        this.catSprite.x += Math.random() <= 0.5 ? -1 : 1;
        this.catSprite.y += Math.random() <= 0.5 ? -1 : 1;
        this.ghostSprite.x += Math.random() <= 0.5 ? -1 : 1;
        this.ghostSprite.y += Math.random() <= 0.5 ? -1 : 1;
    }
};
function listener(){
    game.state.start('Game');

}

/*
 * Old code for smooth, random sprite movement
 * 
 * 
 // Plankton movement
 var randSpeed = randRange(2.0, 3.5);
 this.smoothingFactor = 15;
 this.velocity = new Vect2D(randSpeed, randSpeed);
 this.velocity.x *= Math.random() <= 0.6 ? -1 : 1;
 this.velocity.y *= Math.random() <= 0.6 ? -1 : 1;
 this.prevPosition = new Vect2D(this.position.x, this.position.y);
 
 Plankton.prototype.updatePlankton = function () {
 var dx = Math.random() <= 0.5 ? -1 * this.velocity.x : this.velocity.x;
 var dy = Math.random() <= 0.5 ? -1 * this.velocity.y : this.velocity.y;
 this.spin = Math.random() <= 0.5 ? -1 * this.spin : this.spin;
 
 if (this.prevPosition.x + dx < 0) {
 dx = Math.abs(this.velocity.x);
 }
 else if (this.prevPosition.x + dx > this.screenDim.x)
 {
 dx = -1 * Math.abs(this.velocity.x);
 }
 if (this.prevPosition.y + dy < 0) {
 dy = Math.abs(this.velocity.y);
 }
 else if (this.prevPosition.y + dy > this.screenDim.y)
 {
 dy = -1 * Math.abs(this.velocity.y);
 }
 this.prevPosition.x += dx;
 this.prevPosition.y += dy;
 
 // Smooth movement by averaging displacement
 this.position.x += (this.prevPosition.x - this.position.x) / this.smoothingFactor;
 this.position.y += (this.prevPosition.y - this.position.y) / this.smoothingFactor;
 this.sprite.x = this.position.x;
 this.sprite.y = this.position.y;
 this.sprite.rotation += this.spin * 0.01;
 };
 */