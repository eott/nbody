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
    // Draw tail
    ctx.beginPath();
    ctx.strokeStyle = '#696BFF';
    ctx.moveTo(posX, posY);
    hist.backIter(function(d) {
        ctx.lineTo(d[0], d[1]);
    });
    ctx.stroke();
    // Draw aura
    var grad = ctx.createRadialGradient(posX, posY, 0, posX, posY, 50);
    grad.addColorStop(0, 'rgba(54,57,255,0.3)');
    grad.addColorStop(1, 'rgba(54,57,255,0.0)');
    circle(posX, posY, 50, grad, 1, true);
    // Draw body
    rr(posX, posY, 10, 'rgba(54,57,255,1.0)', pi * (fc[0] % 30) / 30);
    rr(posX, posY, 10, 'rgba(54,57,255,1.0)', -pi * (fc[0] % 30) / 30);
}

function drawPlanets() {
    for (var i = 0; i < planets.length; i++) {
        // Draw aura
        var grad = ctx.createRadialGradient(planets[i][0], planets[i][1], 0, planets[i][0], planets[i][1], 200);
        grad.addColorStop(0, planetColor(planets[i], 1.0, 1.0));
        grad.addColorStop(1, planetColor(planets[i], 0.0, 1.0));
        circle(planets[i][0], planets[i][1], 200, grad, 1, true);
        // Draw planet body
        circle(planets[i][0], planets[i][1], 10 + 20 * planets[i][2], planetColor(planets[i], 1.0, 1.5), 1, true);
    }
}

function drawAsteroidAt(x, y) {
    circle(x, y, 3, '#ffffff', 1, true);
}

function planetColor(p, op, f) {
    return "rgba("
        + o(Math.min(255, f * 255 * p[2])) + ','
        + o(Math.min(255, f * 0.6 * 255 * p[2])) + ','
        + o(Math.min(255, f * 0.3 * 255 * p[2])) + ','
        + op + ')';
}

function rr(x, y, l, c, r) {
    ctx.fillStyle = c;
    ctx.translate(x, y);
    ctx.rotate(r);
    ctx.fillRect(-0.5*l, -0.5*l, l, l);
    console.log(x, y, l);
    ctx.rotate(-r);
    ctx.translate(-x, -y);

    // For an unfilled rectangle, something slight dfferent:
    //
    // ctx.beginPath();
    // ctx.strokeStyle = c;
    // for (var i=0; i < 4; i++) {
    //     var sr = 1;//sin(r);
    //     var cr = 1;//cos(r);
    //     switch (i) {
    //         case 0:
    //             ctx.moveTo(x - 0.5 * l * sr, y - 0.5 * l * cr);
    //             // console.log(x - 0.5 * l * sr, y - 0.5 * l * cr);
    //             break;
    //         case 1:
    //             ctx.lineTo(x + 0.5 * l * sr, y - 0.5 * l * cr);
    //             // console.log(x + 0.5 * l * sr, y - 0.5 * l * cr);
    //             break;
    //         case 2:
    //             ctx.lineTo(x + 0.5 * l * sr, y + 0.5 * l * cr);
    //             // console.log(x + 0.5 * l * sr, y + 0.5 * l * cr);
    //             break;
    //         case 3:
    //             ctx.lineTo(x - 0.5 * l * sr, y + 0.5 * l * cr);
    //             // console.log(x - 0.5 * l * sr, y + 0.5 * l * cr);
    //             break;
    //     }
    // }
    // ctx.closePath();
    // ctx.stroke();
}