function circle(x, y, radius, color, width, fill) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    if (fill) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

function drawBackground() {
    ctx.clearRect(-shiftX * scaleX, -shiftY * scaleY, can.width * scaleX, can.height * scaleY);
}

function drawExplosion() {
    for (var i = 1; i < 13; i+=2) {
        circle(posX, posY, fc[1]*i, '#ff0000', 2);
    }
    var grad = ctx.createRadialGradient(posX, posY, 0, posX, posY, fc[1]*3);
    grad.addColorStop(0, "#ffff00");
    grad.addColorStop(0.5, "#ff0000");
    grad.addColorStop(1, "rgba(255,0,0,0.1)");
    circle(posX, posY, fc[1]*3, grad, 1, true);
}

function drawPlayerAt(x, y) {
    circle(x, y, 10, '#dddddd', 1, true);
    ctx.beginPath();
    ctx.strokeStyle = '#ffffff';
    ctx.moveTo(posX, posY);
    hist.backIter(function(d) {
        ctx.lineTo(d[0], d[1]);
    });
    ctx.stroke();
}

function drawPlanets() {
    for (var i = 0; i < planets.length; i++) {
        // Draw aura
        var grad = ctx.createRadialGradient(planets[i][0], planets[i][1], 0, planets[i][0], planets[i][1], 200);
        grad.addColorStop(0, "rgba(255,0,0,0.5)");
        grad.addColorStop(1, "rgba(255,0,0,0.0)");
        circle(planets[i][0], planets[i][1], 200, grad, 1, true);
        // Draw planet body
        circle(planets[i][0], planets[i][1], 15 + 15 * planets[i][2], '#ffffff', 1, true);
    }
}

function drawAsteroidAt(x, y) {
    circle(x, y, 3, '#ffffff', 1, true);
}