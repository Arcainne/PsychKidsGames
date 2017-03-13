/* 
 * Author: Sean Smith
 * Created: 1/20/2016
 */

/*
 * TODO:
 *      + Add ability to change the sprite count dynamically via a GUI
 *        (Might change mechanics/timing of the game)
 * ISSUES:
 *      - Fix "View Data" button not working when going from Statistics view to Game view
 */

// Create global empty Game state object
INHIB.Game = function () {
    this.spriteIndex = 0;
};

// Define global Game state object
INHIB.Game.prototype = {
    score: 0,
    timer: 0,
    accuracy: 0,
    targetSpriteIndex: 0,
    inhibSpriteIndex: 0,
    goodSprites: [],
    badSprites: [],
    toolbar: {},
    dataButton: {},
    spriteButtons: [],
    reactionButton: {},
    accuracyButton: {},
    resetButton: {},
    init: function () {
        // Create sprite arrays
        for (var i = 0; i < INHIB.spritePairCount; i++) {
            this.goodSprites.push('pair' + i + '_1');
            this.badSprites.push('pair' + i + '_2');
        }

        this.scoreText = game.make.text(10, 5, "Score: " + this.score, {
            font: 'bold 24pt Arial',
            fill: '#0000000'
        });
        this.scoreText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);

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

        // Create image objects
        this.goodSprite = game.make.sprite(Math.random() * (game.world.width),
                Math.random() * (game.world.height), this.goodSprites[this.spriteIndex]);
        this.goodSprite.width = 100;
        this.goodSprite.height = 100;
        this.badSprite = game.make.sprite(Math.random() * (game.world.width),
                Math.random() * (game.world.height), this.badSprites[this.spriteIndex]);
        this.badSprite.width = 100;
        this.badSprite.height = 100;

        this.changeButton = game.make.sprite(10, 250, 'playButton');
        this.changeButton.scale.set(0.3, 0.3);

        // Create game timer
        this.timer = game.time.create(false);

        // Center sprite anchors
        INHIB.Utils.centerGameObjects([this.goodSprite, this.badSprite]);
    },
    create: function () {
        // Make background color light blue
        game.stage.backgroundColor = '#99CCFF';

        // Add all sprites/display objects to the game to be drawn
        game.add.existing(this.scoreText);
        game.add.existing(this.dataText);
        game.add.existing(this.goodSprite);
        game.add.existing(this.badSprite);

        this.goodSprite.visible = false;
        this.badSprite.visible = false;
        this.goodSprite.inputEnabled = true;
        this.badSprite.inputEnabled = true;
        this.dataText.visible = false;

        // Input listeners for sprites (only need to be added once if listener functions is constant)
        this.goodSprite.events.onInputDown.add(this.correctClick, this);
        this.badSprite.events.onInputDown.add(this.decreaseScore, this);

        // DOM ELEMENTS ACCESS
        // Var to allow proper function calls
        var that = this;

        // Display toolbar and get access to DOM elements
        this.toolbar = $("#toolbar");
        this.toolbar.show();
        this.dataButton = $("#data");
        this.spritesButton = $("#spritesButton");
        this.reactionButton = $("#reactionlog");
        this.reactionButton.html("Reaction Times");
        this.accuracyButton = $("#accuracylog");
        this.accuracyButton.html("Accuracy Log");
        this.resetButton = $("#reset");

        // Functions to handle DOM element inputs
        this.dataButton.on('click', function () {
            that.dataText.visible = that.dataText.visible ? false : true;
        });
        
        this.spritesButton.on('click', function () {
            that.selectSpritesDOM();
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
    selectSpritesDOM: function () {
        var that = this;
        $("#sprites").children("a").on("click", function () {
            that.spriteIndex = this.id;
            that.spriteChange(this.id);
            $("#sprites").hide();
        });
    },
    // Function to update the sprite based on time/score
    spriteUpdate: function () {
        // Test code to move sprites randomly
        var targetOrInhib = Math.random() * 10;
        var newPosX, newPosY, resetTime;
        this.goodSprite.visible = false;
        this.badSprite.visible = false;

        // Reset timer
        this.timer.stop();
        this.timer.start();

        if (targetOrInhib > 8) {
            // Constrain sprite position within screen
            newPosX = INHIB.Utils.randRange(this.badSprite.width / 2, game.world.width - this.badSprite.width / 2);
            newPosY = INHIB.Utils.randRange(this.badSprite.height / 2, game.world.height - this.badSprite.height);

            // Update sprite position
            this.badSprite.position.x = newPosX;
            this.badSprite.position.y = newPosY;
            this.badSprite.visible = true;

            // Set this sprite as target sprite
            this.targetSprite = this.badSprite;

            // Time ghost to disappear
            resetTime = 1500;
            this.timer.clearPendingEvents();
            this.timer.add(resetTime, this.increaseScore, this);
            //game.time.events.add(resetTime, this.increaseScore, this);

        } else {
            // Constrain sprite position within screen
            newPosX = INHIB.Utils.randRange(this.goodSprite.width / 2, game.world.width - this.goodSprite.width / 2);
            newPosY = INHIB.Utils.randRange(this.goodSprite.height / 2, game.world.height - this.goodSprite.height);

            // Update sprite position
            this.goodSprite.position.x = newPosX;
            this.goodSprite.position.y = newPosY;
            this.goodSprite.visible = true;

            // Set this sprite as target sprite
            this.targetSprite = this.goodSprite;
        }
    },
    // Main update function that is called repeatedly
    update: function () {
        this.score = this.score < 0 ? 0 : this.score;
        this.scoreText.setText("Score: " + this.score);
        this.dataText.setText(
                "InputPos: (" + Math.floor(game.input.activePointer.position.x) + ", " + Math.floor(game.input.activePointer.position.y) + ")\n" +
                "TargetPos: (" + Math.floor(this.targetSprite.position.x) + ", " + Math.floor(this.targetSprite.position.y) + ")\n" +
                "DistanceVect: (" + Math.floor(this.targetSprite.position.x - game.input.activePointer.position.x) + ", " +
                Math.floor(this.targetSprite.position.y - game.input.activePointer.position.y) + ")\n" +
                "Accuracy: " + this.accuracy + "px\n" +
                "Timer: " + this.timer.seconds.toFixed(2) + "ms\n" +
                "ReactionSpeed: " + this.finalTime + "ms"
                );
        // Touch and hold the screen for 5 seconds to toggle the toolbar
        if (game.input.activePointer.duration > 5000) {
            this.toolbar.toggle();
            this.dataText.visible = false;
            game.input.activePointer.reset();
        }
    },
    correctClick: function () {
        this.finalTime = this.timer.ms;
        this.accuracy = Math.floor(INHIB.Utils.dist(game.input.activePointer.position.x, game.input.activePointer.position.y,
                this.targetSprite.position.x, this.targetSprite.position.y));
        updateReactionData(this.finalTime);
        updateAccuracyData(this.accuracy);
        this.increaseScore();
    },
    // TODO: Group these into 1 function that takes in a score argument
    increaseScore: function () {
        this.score += 1;
        this.finalTime = this.timer.ms;
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
        this.goodSprite.loadTexture(this.goodSprites[index], 0);
        this.badSprite.loadTexture(this.badSprites[index], 0);
        this.goodSprite.width = this.goodSprite.height = this.badSprite.width = this.badSprite.height = 100;
       
        this.timer.stop();
        this.spriteUpdate();
    },
    shutdown: function () {
        this.timer.stop();
    }
};