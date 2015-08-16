var can = document.getElementById("screen");
var ctx = can.getContext("2d");
var fc = 0;

registerListeners();
mainLoop = window.setInterval("upkeep()", 15);

function upkeep() {
    fc++;
    doMovement();

    drawBackground();
    drawPlayerAt(posX, posY);
    drawPlanets([{x:0, y:0}, {x:800, y:800}]);
}