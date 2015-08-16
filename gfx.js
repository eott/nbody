function circle(x, y, radius, color, width, fill) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    if (fill) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

function drawPlayerAt(x, y) {
    circle(x, y, 20, '#ddd', 1, true);
}