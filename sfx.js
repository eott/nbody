function noise() {
    var data = []; // just an array
    for (var i=0; i<10000; i++) data[i] = Math.round(255 * Math.random()); // fill data with random samples
    var wave = new RIFFWAVE(data); // create the wave file
    var audio = new Audio(wave.dataURI); // create the HTML5 audio element
    audio.play(); // some noise
}