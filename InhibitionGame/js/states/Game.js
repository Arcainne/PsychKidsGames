/* 
 * Author: Sean Smith
 * Created: 1/20/2016
 */

// Create global empty Game state object
var Game = function() {};

// Define global Game state object
Game.prototype = {
	
    init: function () {
        // Create title text
        this.scoreText = game.make.text(game.world.centerX, 40, "PLEASE WORK", {
            font: 'bold 36pt Arial',
            fill: '#0000000',
            align: 'center'
        });
        this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        // Create instructions sprite object
        

        // Create instructions text
        this.instructionsText = game.make.text(
                game.world.centerX,
                80,
                "When the CAT appears, tap it for a point. Try to avoid tapping the GHOST.",
                {
                    font: 'bold 30pt Arial',
                    fill: 'black',
                    align: 'center',
                    wordWrap: true,
                    wordWrapWidth: game.world.width
                }
        );
       this.instructionsText.anchor.set(0.5, 0);

        // Create cat sprite object
        this.catSprite = game.make.sprite(Math.random()*(game.world.width),
        						Math.random()*(game.world.height), 'cat');
        this.catSprite.scale.set(0.5, 0.5);

        // Create ghost sprite object
        this.ghostSprite = game.make.sprite(Math.random()*(game.world.width),
        						Math.random()*(game.world.height), 'ghost');
        this.ghostSprite.scale.set(0.5, 0.5);

       

        utilities.centerGameObjects([this.scoreText, this.catSprite, this.ghostSprite]);
    },

      create: function () {
        // Make background color light blue
        game.stage.backgroundColor = '#99CCFF';

        // Add all sprites/display objects to the game to be drawn
        game.add.existing(this.scoreText);
        game.add.existing(this.instructionsText);
        game.add.existing(this.catSprite);
        game.add.existing(this.ghostSprite);
      	this.catSprite.visible = false;
      	this.ghostSprite.visible = false;
      	this.catSprite.inputEnabled = true;
      	this.ghostSprite.inputEnabled = true;
      
    },

    // Main update function that is called repeatedly
    update: function () {
        // Test code to move sprites randomly
        var catOrGhost = Math.random()*10;
        var newPosX, newPosY;

        if (catOrGhost > 9){
        	newPosX = Math.random() * (game.world.width);
        	newPosY = Math.random() * (game.world.height);

        	this.catSprite.position.x = newPosX;
        	this.catSprite.position.y = newPosY;
        	this.catSprite.visible = true;
     
        }
        //  this.catSprite.x += Math.random() <= 0.5 ? -1 : 1;
        // this.catSprite.y += Math.random() <= 0.5 ? -1 : 1;
        // this.ghostSprite.x += Math.random() <= 0.5 ? -1 : 1;
        // this.ghostSprite.y += Math.random() <= 0.5 ? -1 : 1;
    }
//    function play(){
//     	console.log("hello");
//     },
};