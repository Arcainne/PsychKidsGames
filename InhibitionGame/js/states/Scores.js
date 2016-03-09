/* 
 * Author: Sean Smith
 * Created: 1/20/2016
 */

// Create global empty Instructions state object
var Scores = function () {};


// Definition of global Instructions state object
Scores.prototype = {
    // Initialization function called before 'create'
    init: function () {
        // Create title text
        this.titleText = game.make.text(game.world.centerX, 40, "Reaction Times", {
            font: 'bold 36pt Arial',
            fill: '#0000000',
            align: 'center'
        });
        this.titleText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5,0);

       
        this.instructionsText = game.make.text(
                game.world.centerX, 90, "test",
                {
                    font: 'bold 30pt Arial',
                    fill: 'black',
                    align: 'center',
                    wordWrap: true,
                    wordWrapWidth: game.world.width / 3
                }
        );
        this.instructionsText.anchor.set(0.5, 0);

    },
    // Starting function called after 'init'
    create: function () {
        // Make background color light blue
        game.stage.backgroundColor = '#99CCFF';
        game.add.existing(this.titleText);
        game.add.existing(this.instructionsText);
        

    },
    // Main update function that is called repeatedly
    update: function () {
       
    }
};

