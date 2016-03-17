/* 
 * Author: Sean Smith
 * Created: 1/20/2016
 */

/*
 * TODO:
 *      + Add ability to swap/cycle sprite groups via a GUI
 *      + Add ability to change the sprite count dynamically via a GUI
 *      + Improve/clean up game GUI
 *      + Test on mobile/tablet browser
 * ISSUES:
 *      - If tapping sprites rapidly, the timer for sprite might display them rapidly (ghost timer function gets called)
 */

// Create global empty Game state object
var Game = function () {};

// Define global Game state object
Game.prototype = {
    score: 0,
    timer: 0,
    i: 0,
    counter: 0,
    spriteButtons: [],
    
    init: function () {
        // Create score text.
        var goodSprites = ['cat', 'owl'];
        var badSprites = ['ghost', 'bear'];

        this.scoreText = game.make.text(10, 5, "Score: " + this.score, {
            font: 'bold 24pt Arial',
            fill: '#0000000'
        });
        this.scoreText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);

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

        this.dataText = game.make.text(
                10,
                60,
                "InputPos: (0, 0)\n" +
                "TargetPos: (0, 0)\n" +
                "Distance: (0, 0)\n" +
                "Timer: 0ms\n" +
                "ReactionSpeed: 0ms"
                );

        // Create empty sprite to hold reference to target sprite on screen
        this.targetSprite = game.make.sprite();



        // Create cat sprite object
        this.catSprite = game.make.sprite(Math.random() * (game.world.width),
                Math.random() * (game.world.height), goodSprites[this.i]);
        this.catSprite.scale.set(0.5, 0.5);

        // Create ghost sprite object
        this.ghostSprite = game.make.sprite(Math.random() * (game.world.width),
                Math.random() * (game.world.height), badSprites[this.i]);
        this.ghostSprite.scale.set(0.5, 0.5);

        this.changeButton = game.make.sprite(10, 250, 'playButton');
        this.changeButton.scale.set(0.3, 0.3);

        // Create game timer
        this.timer = game.time.create(false);

        utilities.centerGameObjects([this.catSprite, this.ghostSprite]);
    },
    create: function () {
        // Make background color light blue
        game.stage.backgroundColor = '#99CCFF';

        // Add all sprites/display objects to the game to be drawn
        game.add.existing(this.scoreText);
        //game.add.existing(this.instructionsText);
        game.add.existing(this.dataText);
        //game.add.existing(this.changeButton);
        game.add.existing(this.catSprite);
        game.add.existing(this.ghostSprite);

        //this.changeButton.inputEnabled = true;
        this.catSprite.visible = false;
        this.ghostSprite.visible = false;
        this.catSprite.inputEnabled = true;
        this.ghostSprite.inputEnabled = true;


        // Input listeners for sprites (only need to be added once if listener functions is constant)
        this.catSprite.events.onInputDown.add(this.increaseScore, this);
        this.ghostSprite.events.onInputDown.add(this.decreaseScore, this);
        //this.changeButton.events.onInputDown.add(this.changeSprites, this);

        // Display toolbar and get access to DOM elements
        $("#toolbar").show();
        this.spriteButtons.push($("#sprites1"));
        this.spriteButtons.push($("#sprites2"));
        // Var to allow proper function calls
        var that = this;
        /*
        var i = 0;
        // Add event listener to DOM element
        for (i = 0; i < this.spriteButtons.length; i++) {
            that.i = i;
            this.spriteButtons[i].on('click', function () {
                that.spriteChange(that.i);
            });
        }
        */
        this.spriteButtons[0].on('click', function () {
            that.spriteChange(0);
        });
        this.spriteButtons[1].on('click', function () {
            that.spriteChange(1);
        });
        
       
        // Call function to start the sprite updates
        this.spriteUpdate();
    },
    // Function to update the sprite based on time/score
    spriteUpdate: function () {
        // Test code to move sprites randomly
        var catOrGhost = Math.random() * 10;
        var newPosX, newPosY, randomTime;
        this.ghostSprite.visible = false;
        this.catSprite.visible = false;

        // Reset timer
        this.timer.stop();
        this.timer.start();

        if (catOrGhost > 8) {
            // Constrain sprite position within screen
            newPosX = utilities.randRange(this.ghostSprite.width / 2, game.world.width - this.ghostSprite.width / 2);
            newPosY = utilities.randRange(this.ghostSprite.height / 2, game.world.height - this.ghostSprite.height);

            // Update sprite position
            this.ghostSprite.position.x = newPosX;
            this.ghostSprite.position.y = newPosY;
            this.ghostSprite.visible = true;

            // Set this sprite as target sprite
            this.targetSprite = this.ghostSprite;

            // Time ghost to disappear
            randomTime = utilities.randRange(3000, 4000);
            game.time.events.add(randomTime, this.increaseScore, this);

        } else {
            // Constrain sprite position within screen
            newPosX = utilities.randRange(this.catSprite.width / 2, game.world.width - this.catSprite.width / 2);
            newPosY = utilities.randRange(this.catSprite.height / 2, game.world.height - this.catSprite.height);

            // Update sprite position
            this.catSprite.position.x = newPosX;
            this.catSprite.position.y = newPosY;
            this.catSprite.visible = true;

            // Set this sprite as target sprite
            this.targetSprite = this.catSprite;
        }
    },
    // Main update function that is called repeatedly
    update: function () {
        this.scoreText.setText("Score: " + this.score);
        this.dataText.setText(
                "InputPos: (" + game.input.mousePointer.position.x + ", " + game.input.mousePointer.position.y + ")\n" +
                "TargetPos: (" + Math.floor(this.targetSprite.position.x) + ", " + Math.floor(this.targetSprite.position.y) + ")\n" +
                "Distance: (" + Math.floor(this.targetSprite.position.x - game.input.mousePointer.position.x) + ", " +
                Math.floor(this.targetSprite.position.y - game.input.mousePointer.position.y) + ")\n" +
                "Timer: " + this.timer.seconds.toFixed(2) + "ms\n" +
                "ReactionSpeed: " + this.finalTime + "ms"
                );
        //this.instructionsText.setText("When the CAT appears, tap it for a point. Try to avoid tapping the GHOST.");
    },
    // TODO: Group these into 1 function that takes in a score argument
    increaseScore: function () {
        this.score += 1;
        this.finalTime = this.timer.ms;
        this.spriteUpdate();
    },
    decreaseScore: function () {
        this.score -= 1;
        this.finalTime = this.timer.ms;
        this.spriteUpdate();
    },
    changeSprites: function () {
        goodSpriteArray = ['cat', 'owl'];
        badSpriteArray = ['ghost', 'bear'];
        counter++;
        if (counter >= goodSpriteArray.length) {
            counter = 0;
        }
        this.ghostSprite.loadTexture(goodSpriteArray[counter], 0);
        this.catSprite.loadTexture(badSpriteArray[counter], 0);
        this.spriteUpdate();
    },
    spriteChange: function (index) {
        var goodSpriteArray = ['cat', 'owl'];
        var badSpriteArray = ['ghost', 'bear'];

        this.ghostSprite.loadTexture(badSpriteArray[index], 0);
        this.catSprite.loadTexture(goodSpriteArray[index], 0);
        this.spriteUpdate();
    }
};