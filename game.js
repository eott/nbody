// Game and meta globals
var can = document.getElementById("screen"); // The canvas element
var ctx = can.getContext("2d"); // The 2D draw context
var fc = 0; // Frame counter, simply counting upward
var eFc = 0; // Explosion frame counter
var collided = false; // If the player has collided

// Scaling
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
 *     3 => array [ The asteroids of the planet with the structur:
 *         0 => int, The asteroid distance from the planet center
 *         1 => int, The asteroid orbital period in frames
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
            ],
        ]
    }
    return a;
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
        planets = getPlanets();
    }
    drawBackground();
    drawPlanets();
    if (!collided) {
        doMovement();
        drawPlayerAt(posX, posY);
    } else {
        drawExplosion();
        if (eFc >= 25) {
            eFc = 0;
            planets = getPlanets();
            collided = false;
            reset();
        }
    }
}, 15);