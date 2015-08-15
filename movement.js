var posX = 0;
var posY = 0;

function doMovement() {
    var dx = 0;
    var dy = 0;

    dx -= keyStatus[1] ? speed : 0;
    dx += keyStatus[3] ? speed : 0;
    dy -= keyStatus[0] ? speed : 0;
    dy += keyStatus[2] ? speed : 0;

    if (dx != 0 && dy != 0) {
        dy *= 0.7071067811;
        dx *= 0.7071067811;
    }

    posX += dx;
    posY += dy;
}