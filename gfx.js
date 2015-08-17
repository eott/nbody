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
    ctx.clearRect(0, 0, can.width, can.height);
}

function drawExplosion() {
    if (eFc < 25) {
        for (var i = 1; i < 13; i+=2) {
            circle(posX, posY, eFc*i, '#ff0000', 2);
        }
        var grad = ctx.createRadialGradient(posX, posY, 0, posX, posY, eFc*3);
        grad.addColorStop(0, "#ffff00");
        grad.addColorStop(0.5, "#ff0000");
        grad.addColorStop(1, "rgba(255,0,0,0.1)");
        circle(posX, posY, eFc*3, grad, 1, true);
        eFc++;
    }
}

function drawPlayerAt(x, y) {
    circle(x, y, 10, '#dddddd', 1, true);
}

function drawPlanets() {
    for (var i = 0; i < planets.length; i++) {
        circle(planets[i][0], planets[i][1], 20, '#ffffff', 1, true);
    }
}