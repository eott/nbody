function backgroundMusic() {
    // Initialize music generation (player).
    var player = new CPlayer();
    player.init(song);
    player.generate();

    // Put the generated song in an Audio element.
    var wave = player.createWave();
    var audio = new Audio();
    audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));

    // And kick it off
    audio.loop = true;
    audio.play();
}