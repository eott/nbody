// Game and meta globals
var can = document.getElementById("screen"); // The canvas element
var ctx = can.getContext("2d"); // The 2D draw context
var fc = 0; // Frame counter, simply counting upward
var eFc = 0; // Explosion frame counter; When it reaches a certain threshold
             // the death animation is over
var collided = false; // If the player has collided and the death animation
                      // needs to be displayed
var levelCounter = 0; // The current level
var score = 0; // Score of current level
var winScore = 0; // Score necessary to beat current level
var gameState;

// Scaling and centering
can.width = window.innerWidth - 5;
can.height = window.innerHeight - 5;
scaleX = Math.max(1, 1000 / can.width);
scaleY = Math.max(1, 800 / can.height);
shiftX = Math.max(0.5 * (can.width - 1000));
shiftY = Math.max(0.5 * (can.height - 800));
ctx.scale(1 / scaleX, 1 / scaleY);
ctx.translate(shiftX, shiftY);

// Audio
var mi = 0; // Music index in seconds; Is used to generate the music continously
var audio; // The currently playing audio object
var nextAudio; // The next precalculated audio object

// Input
var keyStatus = 0; // Status of input key. 0 = not pressed, 1 = pressed, but not
                   // handled yet, 2 = held down and handled

// Movement
var posX; // x-position of player
var posY; // y-position of player
var vX; // x-velocity of player
var vY; // y-velocity of player

// Game objects and stuff
var g = -3000; // Gravitational constant
var planets; // The planets; see getPlanets for structure

/**
 * Generated the planets, asteroids and other game objects for a level. The return
 * object is an array of array, where each inner array is a planet and has the
 * following structure:
 * [
 *     0 => int, The planet x position
 *     1 => int, The planet y position
 *     2 => float, The planet gravity, normalized to 1
 *     3 => array [ The asteroids of the planet with the structure:
 *         0 => int, The first asteroid distance from the planet center
 *         1 => int, The first asteroid orbital period in frames
 *         2 => boolean, If the first asteroid is active or not
 *         3 => int, The second asteroid distance from the planet center
 *         4 => int, The second asteroid orbital period in frames
 *         5 => boolean, If the second asteroid is active or not
 *     ]
 * ]
 */
function getPlanets() {
    var a = [];
    for (var i=0; i < Math.round(1 + 2 * Math.random()); i++) {
        a[i] = [
            Math.round(50 + 950 * Math.random()),
            Math.round(50 + 950 * Math.random()),
            0.1 + 0.9 * Math.random(),
            [
                Math.round(60 + 25 * Math.random()),
                Math.round(100 + 50 * (Math.random() - 1)),
                true,
                Math.round(60 + 25 * Math.random()),
                Math.round(100 + 50 * (Math.random() - 1)),
                (Math.random() > 0.5),
            ],
        ]
    }
    return a;
}

function nextLevel() {
    switch (levelCounter) {
        case 0:
            planets = [[400,300,0.5,[50,120,true,0,0,false]]];
            positions = [400,200,5,0];
            break;
        default:
            planets = getPlanets();
            positions = [0,0,0,0];
            break;
    }
    score = 0;
    winScore = 0;
    for (var i = 0; i < planets.length; i++) {
        winScore += (planets[i][3][2] ? 1 : 0) + (planets[i][3][5] ? 1 : 0);
    }
    posX = positions[0];
    posY = positions[1];
    vX = positions[2];
    vY = positions[3];
}

function reset() {
    posX = 500;
    posY = 400;
    vX = 3*(Math.random()-1);
    vY = 3*(Math.random()-1);
}
reset();

// Now, init the game and kick off the game loop with close to 60fps
registerListeners();
backgroundMusic();

window.setInterval(function() {
    fc++;
    if (fc < 550) {
        drawMenu();
        return;
    }
    if (!planets) {
        nextLevel();
    }
    drawBackground();
    drawPlanets();
    if (!collided) {
        doMovement();
        drawPlayerAt(posX, posY);
        if (score >= winScore) {
            gameState = 1;
        }
    } else {
        drawExplosion();
        if (eFc >= 25) {
            eFc = 0;
            nextLevel();
            collided = false;
        }
    }
}, 15);