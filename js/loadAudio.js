let audio_input = document.querySelector('#audio_input');
let load_audio_btn = document.querySelector('#load_audio');
let audio_source = document.querySelector('#audio_source');

load_audio_btn.addEventListener('click', function(){
    audio_input.click();
})
document.querySelector('#audio_input').addEventListener('change', function(){

    if (audio_input.files.length == 0) {
        console.log('Error : Audio file not selected');
        return;
    }
    let file = audio_input.files[0];

    let reader = new FileReader();
    reader.addEventListener('loadstart', function () {
        console.log('Loading Audio');
    });

    reader.addEventListener('load', function (e) {
        audio.setAttribute('controls', true);
        document.getElementById('song_info').innerHTML = audio_input.files[0].name;
        let audio_src = e.target.result;
        audio.setAttribute('src', audio_src);
    });

    reader.addEventListener('error', function () {
        console.log('Error : Failed to load file');
    });

    reader.addEventListener('progress', function (e) {
        if (e.lengthComputable == true) {
            let percent_read = Math.floor((e.loaded / e.total) * 100);
            console.log(percent_read + '% Audio loaded');
        }
    });

    reader.readAsDataURL(file);
 
    
 
    
})