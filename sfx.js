var mi = 0;
var audio;
var nextAudio;

function background() {
    if (audio && !audio.ended) {
        return;
    } else {
        if (!nextAudio) {
            nextAudio = getAudio();
        }
        audio = nextAudio;
        audio.play();
        nextAudio = getAudio();
    }
}

function getAudio()
{
    var data = [];
    for (var i=0; i<50000; i++) {
        data[i] = Math.max(-32768, Math.min(32767, Math.round(65536*dsp(mi))));
        mi+=0.0001220703125;
    }

    var wave = new RIFFWAVE();
    wave.header.bitsPerSample = 16;
    wave.Make(data);
    naudio = new Audio(wave.dataURI);
    return naudio;
}