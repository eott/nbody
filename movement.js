var posX = 500;
var posY = 400;
var grav = 5;

function doMovement() {
    var dx = 0;
    var dy = 0;

    if (keyStatus == 1) {
        keyStatus = 2;
        grav *= -1;
    }

    posX += dx;
    posY += dy;
}