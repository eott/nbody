function registerListeners() {
    window.addEventListener("keydown", function(event) {keyStatus = 1;}, false);
    window.addEventListener("keyup", function(event) {keyStatus = 0;}, false);
}