function doMovement() {
    var dx = 0;
    var dy = 0;

    // Switch gravity
    if (keyStatus == 1) {
        keyStatus = 2;
        g *= -1;
    }

    // Move player by planet gravity; Newton rules!
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

    // Asteroids orbit their planet and their position is entirely
    // determined by the orbit parameters and the current time (fc)
    for (var i = 0; i < planets.length; i++) {
        for (var k = 0; k < 4; k += 3) {
            if (planets[i][3][2+k]) {
                var period = 2 * Math.PI * ((fc % planets[i][3][1+k]) / planets[i][3][1+k]);
                ax = planets[i][0] + planets[i][3][0+k] * Math.sin(period);
                ay = planets[i][1] + planets[i][3][0+k] * Math.cos(period);
                drawAsteroidAt(ax, ay);
                if (Math.sqrt((posX - ax) * (posX - ax) + (posY - ay) * (posY - ay)) < 30) {
                    planets[i][3][2+k] = false;
                    score++;
                }
            }
        }
    }
}