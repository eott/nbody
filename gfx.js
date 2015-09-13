function circle(x, y, radius, color, width, fill) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * pi, false);
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
    if (!img) {
        // Draw stuff
        ctx.fillStyle = '#ffffff';
        for (var i = 0; i < 1000; i++) {
            ctx.fillRect(can.width * r() - shiftX, can.height * r() - shiftY, 1, 1);
        }
        for (var i = 0; i < 50; i++) {
            twinkles[i] = [
                can.width * r() - shiftX,
                can.height * r() - shiftY,
                [o(min(255, 255*r())), o(min(255, 255*r())), o(min(255, 255*r()))],
                o(60 * r())
            ];
        }
        // Save image
        img = new Image();
        img.src = can.toDataURL("image/png");
        can.style.background = 'url(' + img.src + ')';
    }
    ctx.clearRect(-shiftX * scaleX, -shiftY * scaleY, can.width * scaleX, can.height * scaleY);
    for (var i = 0; i < twinkles.length; i++) {
        var p = ((twinkles[i][3] + fc[0]) % 60) / 30;
        ctx.fillStyle = 'rgba(' + twinkles[i][2][0]
            + ',' + twinkles[i][2][1]
            + ',' + twinkles[i][2][2]
            + ',' + (p > 1 ? 2-p : p)
            + ')';
        ctx.fillRect(twinkles[i][0], twinkles[i][1], 2, 2);
    }
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
    hist.backIter(function(d, i) {
        if (i % 3 == 0) {
            circle(d[0], d[1], 1.5, '#696BFF', 1, true);
        }
    });
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
    // Draw aura
    var grad = ctx.createRadialGradient(x, y, 0, x, y, 50);
    grad.addColorStop(0, 'rgba(255,40,40,0.2)');
    grad.addColorStop(1, 'rgba(255,40,40,0.0)');
    circle(x, y, 50, grad, 1, true);
    // Draw body
    circle(x, y, 3, '#ff2828', 1, true);
}

function planetColor(p, op, f) {
    pl = g < 0 ? [1.0, 0.6, 0.3] : [0.3, 1.0, 0.6];
    return "rgba("
        + o(min(255, f * pl[0] * 255 * p[2])) + ','
        + o(min(255, f * pl[1] * 255 * p[2])) + ','
        + o(min(255, f * pl[2] * 255 * p[2])) + ','
        + op + ')';
}

function rr(x, y, l, c, r) {
    ctx.fillStyle = c;
    ctx.translate(x, y);
    ctx.rotate(r);
    ctx.fillRect(-0.5*l, -0.5*l, l, l);
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