// A list of audio objects; 0 is background music, 1 is explosion, 2 is pickup
var audio = [];

function initMusic() {
    for (var i = 0; i < 3; i++) {
        // Initialize music generation (player).
        var player = new CPlayer();
        player.init(i == 0 ? song : (i == 1 ? explosion : pickup));
        player.generate();

        // Put the generated song in an Audio element.
        var wave = player.createWave();
        audio[i] = new Audio();
        audio[i].src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));

        // And kick it off, if background music
        if (i == 0) {
            audio[i].loop = true;
            audio[i].volume = 0.3;
            audio[i].play();
        }
    }
}