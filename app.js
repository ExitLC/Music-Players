const music = new Audio('audio/1.mp3');

const songs = [
    {
        id:'1',
        songName: 'Malibu Night <br> <div class="subtitle">LANY</div>',
        poster: "img/1.jpg"
    },
    {
        id:'2',
        songName: 'Everyday <br> <div class="subtitle">P9D</div>',
        poster: "img/2.jpg"
    },
    {
        id:'3',
        songName: 'Please Mister Postman <br> <div class="subtitle">The Beatles</div>',
        poster: "img/3.jpg"
    },
    {
        id:'4',
        songName: 'Stay Away From Me <br> <div class="subtitle">BungSun</div>',
        poster: "img/4.jpg"
    },
    {
        id:'5',
        songName: 'บักคนซั่ว [LIVE SESSION]<br> <div class="subtitle">TIMETHAI</div>',
        poster: "img/5.jpg"
    },
    {
        id:'6',
        songName: '500lbs <br> <div class="subtitle">Lil Tecca</div>',
        poster: "img/6.jpg"
    },
    {
        id:'7',
        songName: 'Blueberry Faygo <br> <div class="subtitle">Lil Mosey</div>',
        poster: "img/7.jpg"
    },
    {
        id:'8',
        songName: 'Out thë way <br> <div class="subtitle">Yeat</div>',
        poster: "img/8.jpg"
    },
    {
        id:'9',
        songName: 'ถ้าเธอได้รู้ <br> <div class="subtitle">Safeplanet</div>',
        poster: "img/9.jpg"
    },
    {
        id:'10',
        songName: 'ความรักทำให้คนตาบอด<br> <div class="subtitle">Three Man Down</div>',
        poster: "img/10.jpg"
    },

    {
        id:'11',
        songName: 'W.R.U (Live Performance) <br> <div class="subtitle">DIAMOND MQT ft. SARAN, SPRITE </div>',
        poster: "img/11.jpg"
    },

    {
        id:'12',
        songName: 'รักพาตัว <br> <div class="subtitle">MINES FT.JAY DADAY</div>',
        poster: "img/12.jpg"
    },

    {
        id:'13',
        songName: 'Tip Toe <br> <div class="subtitle">HYBS</div>',
        poster: "img/13.jpg"
    },

    {
        id:'14',
        songName: 'I Love You <br> <div class="subtitle">Lil Pued</div>',
        poster: "img/14.jpg"
    },

    {
        id:'15',
        songName: 'Hold On Tight <br> <div class="subtitle">Joseph Barrera</div>',
        poster: "img/15.jpg"
    },
    {
        id:'16',
        songName: 'Have You Ever Been In Love <br> <div class="subtitle">The Ivy</div>',
        poster: "img/16.jpg"
    },



    

]

Array.from(document.getElementsByClassName('songItem')).forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

let masterPlay = document.getElementById('master_Play');
let wave = document.getElementsByClassName('wave')[0];


masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime <=0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else{
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
} )

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playListPLlay')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill')
            element.classList.remove('bi-pause-circle-fill')
    
        })
    }
    const makeAllBackgrounds = () =>{
        Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
                element.style.background = "rgb(105, 105, 175, 0)" ;
        
            })
        }
let index = 0;
let poster_master_play = document.getElementById("poster_master_play")
let title = document.getElementById("title")

Array.from(document.getElementsByClassName('playListPLlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `audio/${index}.mp3`;
        poster_master_play.src = `img/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele=>{
            let {songName} = ele
            title.innerHTML = songName;

        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended',()=> {
            masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');

        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem')) [`${index-1}`].style.background = "rgb(105, 105, 170, 1)" ;

    })
})


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', ()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);

    if (sec<10) {
        sec = `0${sec}`

    }

    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);

    if (sec1<10) {
        sec1 = `0${sec1}`

    }

    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;

})

seek.addEventListener('change', ()=> {
    music.currentTime = seek.value * music.duration/100;
})

seek.addEventListener('ended', ()=> {
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})


let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;

})
