// A list of audio objects; 0 is background music, 1 is explosion, 2 is pickup
var audio = [];
var muted = false;

function initMusic() {
    for (var i = 0; i < 3; i++) {
        // Initialize music generation (player).
        var player = new CPlayer();
        player.init(i == 0 ? song : (i == 1 ? explosion : pickup));
        player.generate();
        player.generate();

        // Put the generated song in an Audio element.
        var wave = player.createWave();
        audio[i] = new Audio();
        audio[i].src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));

        // And kick it off, if background music
        if (i == 0) {
            audio[i].loop = true;
            audio[i].volume = 0.5;
            audio[i].play();
        }
    }
}

function mute() {
    muted = !muted;
    for (var i = 0; i < audio.length; i++) {
        audio[i].volume = muted ? 0 : (i == 0 ? 0.5 : 1.0);
    }
}