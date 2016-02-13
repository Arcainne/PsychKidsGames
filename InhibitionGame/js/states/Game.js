/* 
 * Author: Sean Smith
 * Created: 1/20/2016
 */

// Create global empty Game state object
var Game = function() {};
var score = 0;
// Define global Game state object
Game.prototype = {
    
    init: function () {
        // Create score text.
        this.scoreText = game.make.text(10, 5, "Score: " + score, {
            font: 'bold 36pt Arial',
            fill: '#0000000',
        });
        this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        // Create instructions text
        this.instructionsText = game.make.text(
                250,
                5,
                "When the CAT appears, tap it for a point. Try to avoid tapping the GHOST.",
                {
                    font: 'bold 20pt Arial',
                    fill: 'black',
                    align: 'left',
                    wordWrap: true,
                    wordWrapWidth: game.world.width 
                }
        );

        // Create cat sprite object
        this.catSprite = game.make.sprite(Math.random()*(game.world.width),
                                Math.random()*(game.world.height), 'cat');
        this.catSprite.scale.set(0.5, 0.5);

        // Create ghost sprite object
        this.ghostSprite = game.make.sprite(Math.random()*(game.world.width),
                                Math.random()*(game.world.height), 'ghost');
        this.ghostSprite.scale.set(0.5, 0.5);

       

        utilities.centerGameObjects([this.catSprite, this.ghostSprite]);
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

        if (catOrGhost > 8){
            newPosX = Math.random() * (game.world.width);
            newPosY = Math.random() * (game.world.height);

            this.ghostSprite.position.x = newPosX;
            this.ghostSprite.position.y = newPosY;
            this.ghostSprite.visible = true;

            function goodGhost(){
                //this.ghostSprite.visible = false;
                score += 1;
                this.scoreText.setText("Score: " + score);
                var randomTime = Math.random()*5000;
                setTimeout(update, randomTime);
            }

            timedEvent = setTimeout(goodGhost, 3000);
            this.ghostSprite.events.onInputDown.add(decreaseScore, this);
            var randomTime = Math.random()*5000;
            game.time.events.add(randomTime, this.update, this);

            // this.ghostSprite.events.onInputDown = this.ghostSprite.touchstart = function (data){
            //     clearTimeout(timedEvent);
            //     //this.ghostSprite.visible = false;
            //     score -= 1;
            //     this.scoreText.setText("Score: " + score);
            //     var randomTime = Math.random()*5000;
            //     setTimeout(update, randomTime);
            // }
            
            
        
        }else {
            newPosX = Math.random() * (game.world.width);
            newPosY = Math.random() * (game.world.height);

            this.catSprite.position.x = newPosX;
            this.catSprite.position.y = newPosY;
            this.catSprite.visible = true;
            
            firstTime = new Date();

            // this.catSprite.events.onInputDown = this.catSprite.touchstart = function (data) {
            //     secondTime = new Date();
            //     finalTime = secondTime - firstTime;
            //     console.log("Reaction time: " + finalTime + "ms");

            //     this.catSprite.visible = false;
            //     score += 1;
            //     this.scoreText.setText("Score: "+ score);
            //     var randomTime = Math.random() * 5000;
            //     setTimeout(update, randomTime);
            // }

            this.catSprite.events.onInputDown.add(updateScore, this);
            var randomTime = Math.random() * 5000;
            game.time.events.add(randomTime, this.update, this);
        }
        //  this.catSprite.x += Math.random() <= 0.5 ? -1 : 1;
        // this.catSprite.y += Math.random() <= 0.5 ? -1 : 1;
        // this.ghostSprite.x += Math.random() <= 0.5 ? -1 : 1;
        // this.ghostSprite.y += Math.random() <= 0.5 ? -1 : 1;
    },

    
    
   
};
function updateScore() {
        score += 1;
        this.scoreText.setText("Score: " +score);
    }

function decreaseScore(){
        score -= 1; 
        this.scoreText.setText("Score: " +score);
}

