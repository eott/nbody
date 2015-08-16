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

function drawPlayerAt(x, y) {
    circle(x, y, 10, '#dddddd', 1, true);
}

function drawPlanets() {
    for (var i = 0; i < planets.length; i++) {
        circle(planets[i][0], planets[i][1], 20, '#ffffff', 1, true);
    }
}