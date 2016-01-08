// Aliases.
var Container = PIXI.Container,
        autoDetectRenderer = PIXI.autoDetectRenderer,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite;

// Variables needed later.
var green_circle;
var red_circle;

// Create a Pixi stage and renderer and add it to the DOM.
var stage = new Container(),
    renderer = autoDetectRenderer(600, 700);
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);
renderer.backgroundColor = 0x99CCFF;

document.body.appendChild(renderer.view);

stage.width = renderer.width;
stage.height = renderer.height;

// Load images and call startPage().
loader
        .add(["images/green_circle.png",
            "images/red_circle.png",
            "images/play_button.png",
            "images/next_button.png",
            "images/instructions_button.png"])
        .load(startPage);

// This function represents the starting screen, and will show options
// for reading instructions or playing the game.
function startPage() {
    
    // Create play_button sprite and add to stage.
    var play_button = new Sprite(
            resources["images/play_button.png"]
            .texture);

    play_button.buttonMode = true;
    play_button.interactive = true;

    play_button.width = 200;
    play_button.height = 200;

    play_button.position.set(200, 100);
    stage.addChild(play_button);

    // Create instructions_button and add to stage.
    var instructions_button = new Sprite(
            resources["images/instructions_button.png"]
            .texture);

    instructions_button.buttonMode = true;
    instructions_button.interactive = true;

    instructions_button.width = 320;
    instructions_button.height = 61;

    instructions_button.position.set(140, 400);
    stage.addChild(instructions_button);

    // Code to be run when instructions_button is clicked.
    instructions_button.mousedown = instructions_button.touchstart = function (data) {
        stage.removeChild(instructions_button);
        stage.removeChild(play_button);
        renderer.render(stage);
        instructions1();
    };

    // Code to be run when play_button is clicked.
    play_button.mousedown = play_button.touchstart = function (data) {
        stage.removeChild(instructions_button);
        stage.removeChild(play_button);
        scoreWriter();
        renderer.render(stage);
    };
    renderer.render(stage);
}

// First instructions screen.
function instructions1() {
    
    // Create instructions text and add to the stage.
    var instructions = new PIXI.Text(
            "When the green circle appears, \nclick it for a point.",
            {font: "32px sans-serif", fill: "black"});

    instructions.position.set(75, 100);
    stage.addChild(instructions);

    // Create next_button and add it to the stage.
    var next_button = new Sprite(
            resources["images/next_button.png"]
            .texture);
    
    next_button.buttonMode = true;
    next_button.interactive = true;
    
    next_button.width = 100;
    next_button.height = 100;
    
    next_button.position.set(250, 500);
    stage.addChild(next_button);

    // Code to be run when the next_button is clicked.
    next_button.mousedown = next_button.touchstart = function (data) {
        stage.removeChild(instructions);
        stage.removeChild(next_button);
        instructions2();
    };
    renderer.render(stage);
}

// Second instructions screen.
function instructions2() {
    // Create second instructions text and add to the stage.
    var instructions = new PIXI.Text(
            "When the red circle appears, \nignore it for a point.",
            {font: "32px sans-serif", fill: "black"});

    instructions.position.set(70, 100);
    stage.addChild(instructions);

    // Create next_button and add it to the stage.
    var next_button = new Sprite(
            resources["images/next_button.png"]
            .texture);
    
    next_button.buttonMode = true;
    next_button.interactive = true;
    
    next_button.width = 100;
    next_button.height = 100;
    
    next_button.position.set(250, 500);
    stage.addChild(next_button);

    // Code to be run when next_button is clicked.
    next_button.mousedown = next_button.touchstart = function (data) {
        stage.removeChild(instructions);
        stage.removeChild(next_button);
        scoreWriter();
        renderer.render(stage);
    };
    renderer.render(stage);
}

 // This function prepares the text to represent the score, and 
 // calls the loadSprites() function.
function scoreWriter() {
    scoreText = new PIXI.Text(
            "Score: " + score,
            {font: "32px sans-serif", fill: "black"});
    scoreText.position.set(0, 0);
    stage.addChild(scoreText);
    loadSprites();
}

// Function to load sprites.
function loadSprites() {
	
    // Variables used in function.
    var randomStartX, randomStartY;
    // Create and prepare red_circle sprite.
    red_circle = new Sprite(
                resources["images/red_circle.png"]
                .texture);
        
    red_circle.buttonMode = true;
    red_circle.interactive = true;
        
    red_circle.width = 150;
    red_circle.height = 150;
        
    randomStartX = Math.random() * (renderer.width - red_circle.width*2) + red_circle.width;
    randomStartY = Math.random() * (renderer.height - red_circle.height*2) + red_circle.height;
        
    red_circle.position.set(randomStartX, randomStartY);
        
    stage.addChild(red_circle);
        
    red_circle.visible = false;
    
    // Create and prepare green_cirlce sprite.
    green_circle = new Sprite(
                resources["images/green_circle.png"]
                .texture);
        
    green_circle.buttonMode = true;
    green_circle.interactive = true;
        
    green_circle.width = 150;
    green_circle.height = 150;
        
    randomStartX = Math.random() * (renderer.width - green_circle.width*2) + green_circle.width;
    randomStartY = Math.random() * (renderer.height - green_circle.height*2) + green_circle.height;
        
    green_circle.position.set(randomStartX, randomStartY);
        
    stage.addChild(green_circle);
        
    green_circle.visible = false;
    
    // Render the stage and start the game.
    renderer.render(stage);
    var randomTime = Math.random() * 5000;
    setTimeout(play, randomTime);
}

// Recursive function to play game.
var score = 0;
function play() {
    // Variables used in function.
    var redOrGreen = Math.random() * 10;
    var newPosX, newPosY;
    var firstTime, secondTime, finalTime;

    // If/Else statement to decide if a red or green circle is shown
    if (redOrGreen > 8) {
        // Get a new position for the red cirlce, make it visible,
        // and render the stage.
        newPosX = Math.random() * (renderer.width - red_circle.width*2) + red_circle.width;
        newPosY = Math.random() * (renderer.height - red_circle.height*2) + red_circle.height;
        
        red_circle.position.set(newPosX, newPosY);
        red_circle.visible = true;
        
        renderer.render(stage);

        // Code to be run if they correctly ignore the red circle.
        function goodRed() {
            red_circle.visible = false;
            score += 1;
            scoreText.text = "Score: " + score;
            renderer.render(stage);
            var randomTime = Math.random() * 5000;
            setTimeout(play, randomTime);
        }

        // Make the player wait for 3 seconds before the red circle dissappears.
        timedEvent = setTimeout(goodRed, 3000);

        // Code to be run if the red circle is clicked.
        red_circle.mousedown = red_circle.touchstart = function (data) {
            clearTimeout(timedEvent);
            red_circle.visible = false;
            score -= 1;
            scoreText.text = "Score: " + score;
            renderer.render(stage);
            var randomTime = Math.random() * 5000;
            setTimeout(play, randomTime);
        };

    } else {
        // Get a new position for the green cirlce, make it visible,
        // and render the stage.
        newPosX = Math.random() * (renderer.width - green_circle.width*2) + green_circle.width;
        newPosY = Math.random() * (renderer.height - green_circle.height*2) + green_circle.height;
        
        green_circle.position.set(newPosX, newPosY);
        green_circle.visible = true;

        // Allows us to collect the time taken to react.
        firstTime = Date.parse(new Date());
        
        renderer.render(stage);

        // Code to be run when the green cirlce is clicked.
        green_circle.mousedown = green_circle.touchstart = function (data) {
            // Allows us to collect the time taken to react.
            secondTime = Date.parse(new Date());
            finalTime = secondTime - firstTime;
            console.log(finalTime);

            // Code to update score and call play again.
            green_circle.visible = false
            score += 1;
            scoreText.text = "Score: " + score;
            renderer.render(stage);
            var randomTime = Math.random() * 5000;
            setTimeout(play, randomTime);
        };
    }
    renderer.render(stage);
}








