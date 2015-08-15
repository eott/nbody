var can = document.getElementById("screen");
var ctx = can.getContext("2d");
var fc = 0;

registerListeners();
mainLoop = window.setInterval("upkeep()", 15);

function upkeep() {
    fc++;
    ctx.clearRect(0, 0, can.width, can.height);
}