/* 
 * Author: Max Zhao
 * Created: 3/20/2016
 */

// Create global empty Instructions state object
var Scores = function () {};

// Definition of global Instructions state object
Scores.prototype = {
    dataButton: {},
    reactionTimes: [],
    text: "",
    
    // Initialization function called before 'create'
    init: function () {
        // Create title text
        this.titleText = game.make.text(game.world.centerX, 20, "Reaction Times (ms)", {
            font: 'bold 36pt Arial',
            fill: '#0000000',
            align: 'center'
        });
        this.titleText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5, 0);

        this.dataText = game.make.text(
                10, 90, this.text,
                {
                    font: 'bold 24pt Arial',
                    fill: 'black',
                    align: 'left',
                    wordWrap: true,
                    wordWrapWidth: game.world.width - 10
                }
        );
        this.dataText.anchor.set(0, 0);
    },
    // Starting function called after 'init'
    create: function () {
        // Make background color light blue
        game.stage.backgroundColor = '#99CCFF';
        game.add.existing(this.titleText);
        game.add.existing(this.dataText);

        // Display toolbar and get access to DOM elements
        $("#toolbar").show();
        this.dataButton = $("#datalog");
        this.dataButton.html("View Game");

        this.dataButton.on('click', function () {
            game.state.start("Game");
        });
    },
    // Main update function that is called repeatedly
    update: function () {
        this.dataText.setText(this.text);
    }
};

function updateData(data) {
    Scores.prototype.reactionTimes.push(data);
    Scores.prototype.text = Scores.prototype.reactionTimes.join(', ');
}
function resetData() {
    Scores.prototype.reactionTimes = [];
    Scores.prototype.text = Scores.prototype.reactionTimes.join(', ');
}