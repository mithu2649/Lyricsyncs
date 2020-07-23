let read_btn = document.querySelector("#read_btn");
let file_input = document.querySelector("#lrc_file");

let audio = document.getElementById("audio");
let playback_time = '[00:00.00]';
let lyrics = [];

let current_lyrics = document.querySelector('#current_line');
let next_lyrics = document.querySelector('#next_line');

next_lyrics.innerHTML = 'Enjoy the music!'

audio.addEventListener('timeupdate', function () {
    playback_time = audio.currentTime;
    // .toString().toTime();
    // document.querySelector('#timestamp').innerHTML = playback_time;

    displayLyricsAt(playback_time);

});


read_btn.addEventListener('click', function () {
    file_input.click();
});

file_input.addEventListener('change', function () {
    if (file_input.files.length == 0) {
        console.log('Error : No file selected');
        return;
    }
    let file = file_input.files[0];

    let reader = new FileReader();
    reader.addEventListener('loadstart', function () {
        console.log('Reading Lyrics...');
    });

    reader.addEventListener('load', function (e) {
        let text = e.target.result;
        lyrics = cleanLyrics(text.split('\n'), "", 12);
        lyrics.forEach(function(item){
            console.log(item)
        })
    });

    reader.addEventListener('error', function () {
        console.log('Error : Failed to read file');
    });

    reader.addEventListener('progress', function (e) {
        if (e.lengthComputable == true) {
            let percent_read = Math.floor((e.loaded / e.total) * 100);
            console.log(percent_read + '% read');
        }
    });

    reader.readAsText(file);
});


String.prototype.toSeconds = function () {
    let mmss = this.substring(1, 9);
    let a = mmss.split(':');
    let min_to_sec = parseFloat(a[0] * 60);
    let sec = parseFloat(a[1]);

    let seconds = min_to_sec + sec;
    return seconds.toFixed(2); 
}

function cleanLyrics(arr, value, range) {
    let i = 0;
    while (i < arr.length) {
      if (arr[i].length < range || arr[i]==value) {
        arr.splice(i, 1);
      } else {
        const regex = /\[(.*?)\]/g;
        let match = arr[i].match(regex);
        let timestamp;
        if(!match){
            console.log('unreadable line')
        }else{
            timestamp = match[0].toSeconds();
        }
        
        arr[i] = arr[i].replace(regex, '[' + padEvenly(timestamp) + ']');
        ++i;
      }
    }
    return arr;
  }

  function displayLyricsAt(playback_time){
    let i = 0;
    while(i < lyrics.length){
        playback_time = parseFloat(playback_time)
        let lyrics_timestamp = parseFloat(lyrics[i].substring(1, 8));
        let offset = 0.800;
        if(playback_time + offset >= lyrics_timestamp){

            current = lyrics[i].substring(8).replace(/\[(.*?)\]/g, '');
            next = lyrics[i+1].substring(8).replace(/\[(.*?)\]/g, '');

            current_lyrics.innerHTML = current;
            next_lyrics.innerHTML = next;
        }

        i++;
    }
  }

  function padEvenly(n) {
    if(n < 10) {
        return '00' + n;
    }else if(n < 100){
        return '0' + n;
    }else{
        return n;
    }
  }