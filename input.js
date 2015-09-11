function keyEvent(type, key) {
    if (key == 32) {
        if ((type == 1 && keyStatus[0] == 0) || (type == 0)) {
            keyStatus[0] = type;
        }
    } else if (key == 27) {
        keyStatus[2] = type;
    } else {
        keyStatus[1] = type;
    }
}

function registerListeners() {
    window.addEventListener("keydown", function(e) {keyEvent(1, e.keyCode);}, false);
    window.addEventListener("keyup", function(e) {keyEvent(0, e.keyCode);}, false);
}

function inputUpdate() {
    // Switch gravity
    if (keyStatus[1] == 1) {
        keyStatus[1] = 2;
        g *= -1;
    }
}