/* 
 * Author: Sean Smith
 * Created: 3/29/2016 11:22AM
 */

// Create global empty Instructions state object
var Accuracy = function () {};

// Definition of global Instructions state object
Accuracy.prototype = {
    accuracyButton: {},
    accuracyLog: [],
    text: "",
    avg: 0,
    
    // Initialization function called before 'create'
    init: function () {
        // Create title text
        this.titleText = game.make.text(game.world.centerX, 10, "Accuracy Log (px)", {
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
        this.reactionButton.html("Reaction Times");
        this.accuracyButton = $("#accuracylog");
        this.accuracyButton.html("RESUME GAME");

        this.reactionButton.on('click', function () {
            game.state.start("Reactions");
        });
        this.accuracyButton.on('click', function () {
            game.state.start("Game");
        });
    },
    // Main update function that is called repeatedly
    update: function () {
        this.dataText.setText(this.text);
        this.avg = this.accuracyLog.length > 0 ? this.getAvg() : 0;
        this.titleText.setText("Accuracy Log (px) " + "n=" + this.accuracyLog.length + ", avg=" + this.avg + "px");
    },
    getAvg: function () {
        var sum = 0;
        for (var i = 0; i < this.accuracyLog.length; i++) {
            sum += this.accuracyLog[i];
        }
        return Math.floor(sum / this.accuracyLog.length);
    }
};

function updateAccuracyData(data) {
    Accuracy.prototype.accuracyLog.push(data);
    Accuracy.prototype.text = Accuracy.prototype.accuracyLog.join(', ');
}
function resetAccuracyData() {
    Accuracy.prototype.accuracyLog = [];
    Accuracy.prototype.text = Accuracy.prototype.accuracyLog.join(', ');
}