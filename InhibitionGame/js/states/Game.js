/* 
 * Author: Sean Smith
 * Created: 1/20/2016
 */

/*
 * TODO:
 *      + Add ability to change the sprite count dynamically via a GUI
 *        (Might change mechanics/timing of the game)
 * ISSUES:
 *      - If tapping sprites rapidly, the timer for sprite might display them rapidly (ghost timer function gets called)
 *      - Fix "View Data" button not working when going from Statistics view to Game view
 */

// Create global empty Game state object
var Game = function () {};

// Define global Game state object
Game.prototype = {
    score: 0,
    timer: 0,
    accuracy: 0,
    spriteIndex: 0,
    spriteButtons: [],
    //countButtons: [],
    dataButton: {},
    reactionButton: {},
    accuracyButton: {},
    resetButton: {},
    
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
                Math.random() * (game.world.height), goodSprites[this.spriteIndex]);
        this.catSprite.scale.set(0.5, 0.5);

        // Create ghost sprite object
        this.ghostSprite = game.make.sprite(Math.random() * (game.world.width),
                Math.random() * (game.world.height), badSprites[this.spriteIndex]);
        this.ghostSprite.scale.set(0.5, 0.5);

        this.changeButton = game.make.sprite(10, 250, 'playButton');
        this.changeButton.scale.set(0.3, 0.3);

        // Create game timer
        this.timer = game.time.create(false);

        // Center sprite anchors
        utilities.centerGameObjects([this.catSprite, this.ghostSprite]);
    },
    create: function () {
        // Make background color light blue
        game.stage.backgroundColor = '#99CCFF';

        // Add all sprites/display objects to the game to be drawn
        game.add.existing(this.scoreText);
        game.add.existing(this.dataText);
        game.add.existing(this.catSprite);
        game.add.existing(this.ghostSprite);

        this.catSprite.visible = false;
        this.ghostSprite.visible = false;
        this.catSprite.inputEnabled = true;
        this.ghostSprite.inputEnabled = true;
        this.dataText.visible = false;

        // Input listeners for sprites (only need to be added once if listener functions is constant)
        this.catSprite.events.onInputDown.add(this.increaseScore, this);
        this.ghostSprite.events.onInputDown.add(this.decreaseScore, this);

        // DOM ELEMENTS ACCESS
        // Var to allow proper function calls
        var that = this;

        // Display toolbar and get access to DOM elements
        $("#toolbar").show();
        this.dataButton = $("#data");
        this.spriteButtons.push($("#sprites1"));
        this.spriteButtons.push($("#sprites2"));
        this.reactionButton = $("#reactionlog");
        this.reactionButton.html("Reaction Times");
        this.accuracyButton = $("#accuracylog");
        this.accuracyButton.html("Accuracy Log");
        this.resetButton = $("#reset");

        /*
        this.countButtons.push($("#count1"));
        this.countButtons.push($("#count2"));
        this.countButtons.push($("#count3"));
        this.countButtons.push($("#count4"));
        this.countButtons.push($("#count5"));
        */

        // Functions to handle DOM element inputs
        this.dataButton.on('click', function () {
            //that.showStats = that.showStats ? false : true;
            that.dataText.visible = that.dataText.visible ? false : true;
            //game.debug.pointer(game.input.activePointer);
        });
        this.spriteButtons[0].on('click', function () {
            that.spriteChange(0);
        });
        this.spriteButtons[1].on('click', function () {
            that.spriteChange(1);
        });
        this.reactionButton.on('click', function () {
            game.state.start('Reactions');
        });
        this.accuracyButton.on('click', function () {
            game.state.start('Accuracy');
        });
        this.resetButton.on('click', function () {
            resetReactionData();
            resetAccuracyData();
            that.score = 0;
            that.spriteUpdate();
        });

        // Call function to start the sprite updates
        this.spriteUpdate();
    },
    // Function to update the sprite based on time/score
    spriteUpdate: function () {
        // Test code to move sprites randomly
        var catOrGhost = Math.random() * 10;
        var newPosX, newPosY, resetTime;
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
            resetTime = 3000;
            game.time.events.add(resetTime, this.increaseScore, this);

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
        this.score = this.score < 0 ? 0 : this.score;
        this.scoreText.setText("Score: " + this.score);
        this.accuracy = Math.floor(utilities.dist(game.input.activePointer.position.x, game.input.activePointer.position.y,
                        this.targetSprite.position.x, this.targetSprite.position.y));
        this.dataText.setText(
                "InputPos: (" + Math.floor(game.input.activePointer.position.x) + ", " + Math.floor(game.input.activePointer.position.y) + ")\n" +
                "TargetPos: (" + Math.floor(this.targetSprite.position.x) + ", " + Math.floor(this.targetSprite.position.y) + ")\n" +
                "DistanceVect: (" + Math.floor(this.targetSprite.position.x - game.input.activePointer.position.x) + ", " +
                Math.floor(this.targetSprite.position.y - game.input.activePointer.position.y) + ")\n" +
                "Accuracy: " + this.accuracy + "px\n" +
                "Timer: " + this.timer.seconds.toFixed(2) + "ms\n" +
                "ReactionSpeed: " + this.finalTime + "ms"
                );
    },
    // TODO: Group these into 1 function that takes in a score argument
    increaseScore: function () {
        this.score += 1;
        this.finalTime = this.timer.ms;
        updateReactionData(this.finalTime);
        updateAccuracyData(this.accuracy);
        this.timer.stop();
        this.spriteUpdate();
    },
    decreaseScore: function () {
        this.score -= 1;
        this.finalTime = this.timer.ms;
        this.timer.stop();
        this.spriteUpdate();
    },
    spriteChange: function (index) {
        var goodSpriteArray = ['cat', 'owl'];
        var badSpriteArray = ['ghost', 'bear'];

        this.ghostSprite.loadTexture(badSpriteArray[index], 0);
        this.catSprite.loadTexture(goodSpriteArray[index], 0);
        
        // Resize sprites accordingly
        if (index === 1) {
            this.catSprite.scale.set(0.4, 0.4);
            this.ghostSprite.scale.set(0.45, 0.45);
        } else if (index ===0 ) {
            this.catSprite.scale.set(0.5, 0.5);
            this.ghostSprite.scale.set(0.5, 0.5);
        }
        this.timer.stop();
        this.spriteUpdate();
    }
};