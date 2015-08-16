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

function drawPlanets(positions) {
    for (var i = 0; i < positions.length; i++) {
        circle(positions[i].x, positions[i].y, 20, '#ffffff', 1, true);
    }
}