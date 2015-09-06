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
}

function drawPlanets() {
    for (var i = 0; i < planets.length; i++) {
        circle(planets[i][0], planets[i][1], 20, '#ffffff', 1, true);
    }
}

function drawAsteroidAt(x, y) {
    circle(x, y, 3, '#ffffff', 1, true);
}

function drawMenu() {
    ctx.font = "100px Lucida Console";
    ctx.fillStyle = "rgba(255,255,255," + 0.1*fc[0]/120 + ")";
    ctx.fillText("nbody", 330, 200);
    ctx.font = "30px Lucida Console";
    ctx.fillStyle = "rgba(255,255,255," + 0.1*(fc[0]-120)/120 + ")";
    ctx.fillText("hit any key to reverse gravity", 200, 350);
    ctx.fillStyle = "rgba(255,255,255," + 0.1*(fc[0]-240)/120 + ")";
    ctx.fillText("collect enough asteroids", 250, 500);
    ctx.fillText("to grow and advance", 290, 550);
}