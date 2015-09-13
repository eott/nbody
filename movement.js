History = function(n) {
    this.h = [];
    for (var i = 0; i < 2*n; i++) {
        this.h[n] = [];
    }
    this.n = n;
    this.li = 0;
    this.hi = -1;
}

History.prototype.add = function(x, y, vx, vy) {
    this.hi++;
    if (this.hi - this.li >= this.n) {
        this.li++;
    }
    this.h[this.hi] = [x, y, vx, vy];
    if (this.hi >= (2 * this.n - 1)) {
        this.h = this.h.splice(this.li, this.hi-this.li);
        this.hi = this.hi - this.li - 1;
        this.li = 0;
    }
}

History.prototype.backIter = function(f) {
    for (var i = this.hi; i >= this.li; i--) {
        f(this.h[i], i);
    }
}

History.prototype.reset = function() {
    this.h = [];
    this.li = 0;
    this.hi = -1;
}

History.prototype.pop = function() {
    if (this.hi > this.li) {
        this.hi--;
        return this.h[this.hi + 1];
    } else {
        return false;
    }
}

function doMovement() {
    var dx = 0;
    var dy = 0;

    // Move player by planet gravity; Newton rules!
    for (var i = 0; i < planets.length; i++) {
        var dX = posX - planets[i][0];
        var dY = posY - planets[i][1];
        var r = sqrt(dX*dX+dY*dY);
        var s = (g * planets[i][2]) / (r * r);
        vX += s * sin(0.5 * pi * (dX/r));
        vY += s * sin(0.5 * pi * (dY/r));

        if (r < (10 + 20 * planets[i][2])) {
            collided();
            return;
        }
    }

    // If space is held, pop positions from the history instead
    // of advancing. Where we're going, we don't need roads!
    var pos = false;
    if (keyStatus[0] == 1) {
        pos = hist.pop();
        if (pos) {
            posX = pos[0];
            posY = pos[1];
            vX = pos[2];
            vY = pos[3];
        } else {
            keyStatus[0] = 2; // Force release of spacebar
        }
    }

    // Update positions when newly calculated
    if (!pos) {
        posX += vX;
        posY += vY;
        hist.add(posX, posY, vX, vY);
    }

    // Asteroids orbit their planet and their position is entirely
    // determined by the orbit parameters and the current time (fc[0])
    for (var i = 0; i < planets.length; i++) {
        for (var k = 0; k < 4; k += 3) {
            if (planets[i][3][2+k]) {
                var period = 2 * pi * ((fc[0] % planets[i][3][1+k]) / planets[i][3][1+k]);
                ax = planets[i][0] + planets[i][3][0+k] * sin(period);
                ay = planets[i][1] + planets[i][3][0+k] * cos(period);
                drawAsteroidAt(ax, ay);
                if (sqrt((posX - ax) * (posX - ax) + (posY - ay) * (posY - ay)) < 30) {
                    planets[i][3][2+k] = false;
                    score++;
                    $('ast').innerHTML = 'Asteroids ' + score + '/' + winScore;
                    play(2);
                }
            }
        }
    }
}

function checkBounds() {
    return posX < -2000 || posX > 2800 || posY < -1500 || posY > 2100;
}