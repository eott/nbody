// Game and meta globals
var can = document.getElementById("screen"); // The canvas element
var ctx = can.getContext("2d"); // The 2D draw context
var fc = 0; // Frame counter, simply counting upward
var eFc = 0; // Explosion frame counter
var planets; // The planets with [xpos, ypos, m] where m is their mass
var collided = false; // If the player has collided

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
var g = -3000; // Gravitational constant

function getPlanets() {
    var a = [];
    for (var i=0; i < Math.round(1 + 2 * Math.random()); i++) {
        a[i] = [
            Math.round(50 + 950 * Math.random()),
            Math.round(50 + 950 * Math.random()),
            0.1 + 0.9 * Math.random()
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
    // background();
}, 15);