var posX = 500;
var posY = 400;
var vX = 1;
var vY = -1;
var g = -5000;

function doMovement() {
    var dx = 0;
    var dy = 0;

    if (keyStatus == 1) {
        keyStatus = 2;
        g *= -1;
    }

    for (var i = 0; i < planets.length; i++) {
        var dX = posX - planets[i][0];
        var dY = posY - planets[i][1];
        var r = Math.sqrt(dX*dX+dY*dY);
        var s = (g * planets[i][2]) / (r * r);
        vX += s * Math.sin(0.5 * Math.PI * (dX/r));
        vY += s * Math.sin(0.5 * Math.PI * (dY/r));

        if (r < 30) {
            collided = true;
            return;
        }
    }

    posX += vX;
    posY += vY;
}