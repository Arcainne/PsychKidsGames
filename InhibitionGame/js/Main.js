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
var instructionsSprite;

// Instruction text object
var instructionsText;

// Font style object
var style;

// Called to preload images
function preload() {
    // Load test sprites
    game.load.image('cat', 'images/cat.png');
    game.load.image('ghost', 'images/ghost.png');
    game.load.image('playButton', 'images/play_button.png');
    game.load.image('instructionsButton', 'images/instructions_button.png');
}

// Called after preloading
function create() {
    game.stage.backgroundColor = '#99CCFF';
    
    // Create sprites for testing
    instructionsSprite = game.add.sprite(game.world.centerX, 50, 'instructionsButton');
    instructionsSprite.anchor.set(0.5, 0.5);
    instructionsSprite.scale.set(1.5, 1.5);
    
    style = {
        font: 'bold 30pt Arial',
        fill: 'black', 
        align: 'center',
        wordWrap: true, 
        wordWrapWidth: game.world.width/3
    };

    instructionsText = game.add.text(
            game.world.centerX, 
            instructionsSprite.y + instructionsSprite.height/1.5, 
            "When the CAT appears, tap it for a point. Try to avoid tapping the GHOST.", 
            style
    );
    instructionsText.anchor.set(0.5, 0);
    
    catSprite = game.add.sprite(game.world.width / 4, instructionsText.y + instructionsText.height/2, 'cat');
    catSprite.anchor.set(0.5, 0.5);
    catSprite.scale.set(0.5, 0.5);
    
    ghostSprite = game.add.sprite(game.world.width - game.world.width / 4, instructionsText.y + instructionsText.height/2, 'ghost');
    ghostSprite.anchor.set(0.5, 0.5);
    ghostSprite.scale.set(0.5, 0.5);
    
    playButtonSprite = game.add.sprite(game.world.centerX, instructionsText.y + instructionsText.height, 'playButton');
    playButtonSprite.anchor.set(0.5, 0);
    playButtonSprite.scale.set(0.5, 0.5);
    
    // Perform sprite tweening
    //startTween();
}

// Recursive function for tweening movement (WiP)
function startTween() {
    var leftTween = game.add.tween(catSprite);
    var rightTween = game.add.tween(ghostSprite);
    
    var rndX = game.rnd.realInRange(-2, 2);
    var rndY = game.rnd.realInRange(-2, 2);
    
    // TODO: Need to make recursive call to this function after 
    //       both tweens are performed. Would be better to have
    //       a class for each image/sprite
    leftTween.to(
            {
                x: catSprite.x + rndX,
                y: catSprite.y + rndY
            }, 
            500,
            Phaser.Easing.Circular.In,
            true,
            0,
            -1,
            false
    );
}

// Continuously called
function update() {
    // Test code to move sprites randomly
    catSprite.x += Math.random() <= 0.5 ? -1 : 1;
    catSprite.y += Math.random() <= 0.5 ? -1 : 1;
    ghostSprite.x += Math.random() <= 0.5 ? -1 : 1;
    ghostSprite.y += Math.random() <= 0.5 ? -1 : 1;
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