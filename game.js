var can = document.getElementById("screen");
var ctx = can.getContext("2d");
var fc = 0;
var eFc = 0;
var planets;
registerListeners();
mainLoop = window.setInterval("upkeep()", 15);
collided = false;

function upkeep() {
    fc++;
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
            posX = 500;
            posY = 400;
            vX = 1;
            vY = -1;
        }
    }
    // background();
}

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