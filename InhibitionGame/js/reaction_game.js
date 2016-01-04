// Aliases
var Container = PIXI.Container,
        autoDetectRenderer = PIXI.autoDetectRenderer,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite;

// Create a Pixi stage and renderer and add it to the DOM
var stage = new Container(),
        renderer = autoDetectRenderer(600, 700);
//renderer.view.style.position = "absolute";
//renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);
renderer.backgroundColor = 0x99CCFF;

document.body.appendChild(renderer.view);

stage.width = renderer.width;
stage.height = renderer.height;

// Load images
loader
        .add(["images/green_circle.png",
            "images/red_circle.png",
            "images/play_button.png",
            "images/next_button.png",
            "images/instructions_button.png"])
        .load(startPage);

// Starting screen.
function startPage() {
    var play_button = new Sprite(
            resources["images/play_button.png"]
            .texture);
    var instructions_button = new Sprite(
            resources["images/instructions_button.png"]
            .texture);
    play_button.buttonMode = true;
    play_button.interactive = true;
    play_button.width = 200;
    play_button.height = 200;
    play_button.position.set(200, 100);
    stage.addChild(play_button);
    instructions_button.buttonMode = true;
    instructions_button.interactive = true;
    instructions_button.width = 320;
    instructions_button.height = 61;
    instructions_button.position.set(140, 400);
    stage.addChild(instructions_button);
    instructions_button.mousedown = instructions_button.touchstart = function (data) {
        stage.removeChild(instructions_button);
        stage.removeChild(play_button);
        renderer.render(stage);
        instructions1();
    };
    play_button.mousedown = play_button.touchstart = function (data) {
        stage.removeChild(instructions_button);
        stage.removeChild(play_button);
        // renderer.render(stage);
        scoreWriter();
        // renderer.render(stage);
    };
    renderer.render(stage);
}

// First instructions screen.
function instructions1() {
    var instructions = new PIXI.Text(
            "When the green circle appears, \nclick it for a point.",
            {font: "32px sans-serif", fill: "black"});
    var next_button = new Sprite(
            resources["images/next_button.png"]
            .texture);
    next_button.buttonMode = true;
    next_button.interactive = true;
    next_button.width = 100;
    next_button.height = 100;
    next_button.position.set(250, 500);
    instructions.position.set(75, 100);
    stage.addChild(instructions);
    stage.addChild(next_button);
    next_button.mousedown = next_button.touchstart = function (data) {
        stage.removeChild(instructions);
        stage.removeChild(next_button);
        instructions2();
    };
    renderer.render(stage);
}

// Second instructions screen.
function instructions2() {
    var instructions = new PIXI.Text(
            "When the red circle appears, \nignore it for a point.",
            {font: "32px sans-serif", fill: "black"});
    var next_button = new Sprite(
            resources["images/next_button.png"]
            .texture);
    next_button.buttonMode = true;
    next_button.interactive = true;
    next_button.width = 100;
    next_button.height = 100;
    next_button.position.set(250, 500);
    instructions.position.set(70, 100);
    stage.addChild(instructions);
    stage.addChild(next_button);
    next_button.mousedown = next_button.touchstart = function (data) {
        stage.removeChild(instructions);
        stage.removeChild(next_button);
        scoreWriter();
        renderer.render(stage);
    };
    renderer.render(stage);
}

// Function to load sprites
/*function load_sprites() {
	var red_circle = new Sprite(
                resources["images/red_circle.png"]
                .texture);
        red_circle.buttonMode = true;
        red_circle.interactive = true;
        red_circle.width = 150;
        red_circle.height = 150;
        var randomStartX = Math.random() * (renderer.width - red_circle.width*2) + red_circle.width;
        var randomStartY = Math.random() * (renderer.height - red_circle.height*2) + red_circle.height;
        red_circle.position.set(randomStartX, randomStartY);
        stage.addChild(red_circle);
        red_circle.visible = false;
    var green_circle = new Sprite(
                resources["images/green_circle.png"]
                .texture);
        green_circle.buttonMode = true;
        green_circle.interactive = true;
        green_circle.width = 150;
        green_circle.height = 150;
        var randomStartX = Math.random() * (renderer.width - green_circle.width*2) + green_circle.width;
        var randomStartY = Math.random() * (renderer.height - green_circle.height*2) + green_circle.height;
        green_circle.position.set(randomStartX, randomStartY);
        stage.addChild(green_circle);
        green_circle.visible = false;
    renderer.render(stage);
}*/

// Recursive function to play game.
score = 0;
function play() {
    var redOrGreen = Math.random() * 10;
    if (redOrGreen > 8) {
        var red_circle = new Sprite(
                resources["images/red_circle.png"]
                .texture);
        red_circle.buttonMode = true;
        red_circle.interactive = true;
        red_circle.width = 150;
        red_circle.height = 150;
        var randomStartX = Math.random() * (renderer.width - red_circle.width*2) + red_circle.width;
        var randomStartY = Math.random() * (renderer.height - red_circle.height*2) + red_circle.height;
        red_circle.position.set(randomStartX, randomStartY);
        stage.addChild(red_circle);
        function goodRed() {
            stage.removeChild(red_circle);
            score += 1;
            scoreText.text = "Score: " + score;
            renderer.render(stage);
            var randomTime = Math.random() * 5000;
            setTimeout(play, randomTime);
        }
        timedEvent = setTimeout(goodRed, 3000);
        red_circle.mousedown = red_circle.touchstart = function (data) {
            clearTimeout(timedEvent);
            stage.removeChild(red_circle);
            score -= 1;
            scoreText.text = "Score: " + score;
            renderer.render(stage);
            var randomTime = Math.random() * 5000;
            setTimeout(play, randomTime);
        };
    } else {
        var green_circle = new Sprite(
                resources["images/green_circle.png"]
                .texture);
        green_circle.buttonMode = true;
        green_circle.interactive = true;
        green_circle.width = 150;
        green_circle.height = 150;
        var randomStartX = Math.random() * (renderer.width - green_circle.width*2) + green_circle.width;
        var randomStartY = Math.random() * (renderer.height - green_circle.height*2) + green_circle.height;
        green_circle.position.set(randomStartX, randomStartY);
        stage.addChild(green_circle);
        green_circle.mousedown = green_circle.touchstart = function (data) {
            stage.removeChild(green_circle);
            score += 1;
            scoreText.text = "Score: " + score;
            renderer.render(stage);
            var randomTime = Math.random() * 5000;
            setTimeout(play, randomTime);
        };
    }
    renderer.render(stage);
}

function scoreWriter() {
    scoreText = new PIXI.Text(
            "Score: " + score,
            {font: "32px sans-serif", fill: "black"});
    scoreText.position.set(0, 0);
    stage.addChild(scoreText);
    var randomTime = Math.random() * 5000;
    // load_sprites();
    setTimeout(play, randomTime);
}
