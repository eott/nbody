// Aliases
var r = Math.random;
var o = Math.round;
var min = Math.min;
var max = Math.max;
var sin = Math.sin;
var cos = Math.cos;
var sqrt = Math.sqrt;
var pi = Math.PI;

// Game and meta globals
var can = $("screen"); // The canvas element
var ctx = can.getContext("2d"); // The 2D draw context
var levelCounter = 0; // The current level
var score = 0; // Score of current level
var winScore = 0; // Score necessary to beat current level
var fail = 0; // How often the player has failed on the current level
var gameState = 0; // The current game state:
                   // 0 means the game is unitilazied
                   // 1 means the game is running a level normally
                   // 2 means the level was lost
                   // 3 means the level was won
var fc = [0,0,0,0]; // Frame counters, they simply count upward once a frame
                    // 0 => main fc, since the start of the game
                    // 1 => fc used in drawing the explosion
                    // 2 => fc since the death animation ended and the level was lost
                    // 3 => fc since the required score was achieved and the level was won

// Scaling and centering
can.width = window.innerWidth - 5;
can.height = window.innerHeight - 5;
scaleX = max(1, 1000 / can.width);
scaleY = max(1, 800 / can.height);
shiftX = max(0.5 * (can.width - 1000));
shiftY = max(0.5 * (can.height - 800));
ctx.scale(1 / scaleX, 1 / scaleY);
ctx.translate(shiftX, shiftY);

// Gfx stuff
var img; // The background image for the canvas to avoid having it to render every frame
var twinkles = []; // Twinkle, twinkle, little star

// Input
var keyStatus = [0,0,0,0]; // Status of input keys. 0 is space, 2 is escape, 1 is everything else
                    // 0 = not pressed,
                    // 1 = pressed, but not handled yet,
                    // 2 = held down and handled

// Movement
var posX; // x-position of player
var posY; // y-position of player
var vX; // x-velocity of player
var vY; // y-velocity of player
var hist = new History(200); // History of positions and velocities

// Game objects and stuff
var g = -3000; // Gravitational constant
var planets; // The planets; see getPlanets for structure
var resetPlanets; // Used in reseting the level without triggering recalculation
var resetPositions; // Used in reseting the level without triggering recalculation

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
    for (var i=0; i < o(1 + 2 * r()); i++) {
        a[i] = [
            o(100 + 600 * r()),
            o(50 + 500 * r()),
            0.1 + 0.9 * r(),
            [
                o(60 + 25 * r()),
                o(100 + 50 * (r() - 1)),
                true,
                o(60 + 25 * r()),
                o(100 + 50 * (r() - 1)),
                (r() > 0.5),
            ],
        ]
    }
    return a;
}

function getPositions() {
    var pos = false;
    var p = resetPlanets;
    while (!pos) {
        pos = [o(100 + 600 * r()), o(50 + 500 * r()), o(1 + 2 * r()), o(1 + 2 * r())]
        for (var i = 0; i < p.length; i++) {
            if (pos && Math.abs(p[i][0] - pos[0]) < 100 || Math.abs(p[i][1] - pos[1]) < 100) {
                pos = false;
            }
        }
    }
    return pos;
}

function level(next) {
    switch (levelCounter) {
        case 0:
            planets = [[400,300,0.5,[100,500,true,0,0,false]]];
            positions = [400,200,-5,0];
            break;
        case 1:
            planets = [[400,200,0.5,[85,150,true,80,40,true]],[400,400,0.5,[85,70,true,90,100,true]]];
            positions = [100,300,3,0];
            break;
        case 2:
            planets = [[400,300,0.5,[50,120,true,0,0,false]]];
            positions = [400,200,5,0];
            break;
        case 3:
            planets = [[400,300,1.0,[50,50,true,0,0,false]],[200,200,0.3,[150,250,true,0,0,false]]];
            positions = [550,100,1.5,2.5];
            break;
        default:
            if (next) {
                resetPlanets = getPlanets();
                resetPositions = getPositions();
                fail = 0;
            }
            planets = clone(resetPlanets);
            positions = clone(resetPositions);
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
    g = -Math.abs(g);
    hist.reset();
    $('lvl').innerHTML = 'Level ' + (levelCounter + 1);
    $('ast').innerHTML = 'Asteroids ' + score + '/' + winScore;
    $('skip').style.display = 'none';
}

function collided() {
    gameState = 2;
    fc[1] = 0;
    play(1);
}

function gameLoop() {
    fc[0]++;
    inputUpdate();

    switch (gameState) {
        case 0:
            registerListeners();
            gameState = 1;

            // If there's level hash given, load the level
            // We don't do any encryption, just a simple obfuscation
            // to discourage cheating just a little bit
            var loc = window.location.search;
            if (loc.search(/h=/) >= 0) {
                var hash = loc.substr(loc.search(/h=/)+2);
                for (var i = 0; i <= 1000; i++) { // As if anyone would play this past 1000 levels
                    var h = (i * 2353 + 3727) % 10000;
                    if (h == hash) {
                        levelCounter = i;
                        break;
                    }
                }
            }
            level(true);
            break;

        case 1:
            drawBackground();
            drawPlanets();
            doMovement();
            drawPlayerAt(posX, posY);
            if (score >= winScore) {
                gameState = 3;
            } else if (checkBounds()) {
                gameState = 2;
                play(3);
                fc[1] = 26; // We cheat a bit so no explosion is drawn when player
                            // leaves the bounds
            }
            if (fail >= 3 && levelCounter > 3) {
                $('skip').style.display = 'block';
            }
            break;

        case 2:
            if (fc[1] <= 25) {
                drawBackground();
                drawPlanets();
                drawExplosion();
                fc[1]++;
            } else {
                fc[1] = 0;
                fail++;
                level(false);
                gameState = 1;
            }
            break;

        case 3:
            levelCounter++;
            level(true);
            fail = 0;
            gameState = 1;
            break;
    }
}

function clone(a) {
    var i, c;
    if (Array.isArray(a)) {
        c = a.slice(0);
        for(i = 0; i < c.length; i++) {
            c[i] = clone(c[i]);
        }
        return c;
    } else {
        return a; // Doesn't clone objects
    }
}
