var can = document.getElementById("screen");
var ctx = can.getContext("2d");
var fc = 0;
var planets = [[100,100,1.2],[700,400,0.1]];
registerListeners();
mainLoop = window.setInterval("upkeep()", 15);

function upkeep() {
    fc++;
    doMovement();

    drawBackground();
    drawPlayerAt(posX, posY);
    drawPlanets();
}