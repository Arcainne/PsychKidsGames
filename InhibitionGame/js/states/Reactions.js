/* 
 * Author: Max Zhao
 * Created: 3/20/2016
 */

// Create global empty Instructions state object
INHIB.Reactions = function () {};

// Definition of global Instructions state object
INHIB.Reactions.prototype = {
    reactionButton: {},
    reactionTimes: [],
    text: "",
    avg: 0,
    
    // Initialization function called before 'create'
    init: function () {
        // Create title text
        this.titleText = game.make.text(game.world.centerX, 10, "Reaction Times (ms)", {
            font: 'bold 30pt Arial',
            fill: '#0000000',
            align: 'center'
        });
        this.titleText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5, 0);

        this.dataText = game.make.text(
                10, 70, this.text,
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
        this.reactionButton = $("#reactionlog");
        this.reactionButton.html("RESUME GAME");
        this.accuracyButton = $("#accuracylog");
        this.accuracyButton.html("Accuracy Log");

        this.accuracyButton.on('click', function () {
            game.state.start("Accuracy");
        });
        this.reactionButton.on('click', function () {
            game.state.start("Game");
        });
    },
    // Main update function that is called repeatedly
    update: function () {
        this.dataText.setText(this.text);
        this.avg = this.reactionTimes.length > 0 ? this.getAvg() : 0;
        this.titleText.setText("Reaction Times (ms) " + "n=" + this.reactionTimes.length + ", avg=" + this.avg + "ms");
    },
    getAvg: function () {
        var sum = 0;
        for (var i = 0; i < this.reactionTimes.length; i++) {
            sum += this.reactionTimes[i];
        }
        return Math.floor(sum / this.reactionTimes.length);
    }
};

function updateReactionData(data) {
    Reactions.prototype.reactionTimes.push(data);
    Reactions.prototype.text = Reactions.prototype.reactionTimes.join(', ');
}
function resetReactionData() {
    Reactions.prototype.reactionTimes = [];
    Reactions.prototype.text = Reactions.prototype.reactionTimes.join(', ');
}