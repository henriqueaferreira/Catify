document.addEventListener('DOMContentLoaded', () => {

    const artistsData = [
       { name: 'Creed', image: 'creed.jpeg'},
       { name: 'Guns N Roses', image: 'gunsandroses.jpeg'},
       { name: 'Bon Jovi', image: 'bonjovi.jpeg'},
       { name: 'AC/DC', image: 'acdc.jpeg'}
    ];

    const albumsData = [
       {
           name: 'One Last Breath',
           artist: 'Creed',
           image: 'onelast.jpeg',
           file: 'onelast.mp3'
       },
       {
           name: 'This I Love',
           artist: 'Guns N roses',
           image: 'thisilove.jpeg',   
           file: 'thisilove.mp3'      
       },
       {
           name: 'Livin On a Player',
           artist: 'Bon Jovi',
           image: 'livinon.jpeg',
           file: 'livinon.mp3'
       },
        {
           name: 'Bring Me To Life',
           artist: 'Evanescence',
           image: 'bring.jpeg',   
           file: 'bringme.mp3'      
       },
        {
           name: 'Rock That Body',
           artist: 'Black Eyed Peas',
           image: 'rockthatbody.jpg',   
           file: 'rock.mp3'      
       },
       {
           name: 'Coma',
           artist: 'Guns N Roses',
           image: 'coma.jpeg',   
           file: 'coma.mp3'      
       }
    ];

    const artistDescriptions = {
    
            "Creed": "Creed é uma banda de post-grunge estadunidense formada em 1994 na cidade de Tallahassee, originalmente idealizada pelos amigos Scott Stapp e Mark Tremonti, tendo Scott Phillips e Brian Marshall.",
            "Bon Jovi": "Bon Jovi é uma banda americana de rock, formada em 1983, em Sayreville, Nova Jersey. A formação atual da banda consiste no cantor Jon Bon Jovi, no tecladista David Bryan, no baterista Tico Torres, no guitarrista Phil X e no baixista Hugh McDonald.",
            "Guns N Roses": "Guns N' Roses é uma banda americana de hard rock formada em Los Angeles, Califórnia, em 1985, resultado da fusão entre as bandas locais L.A. Guns e Hollywood Rose.", 
            "AC/DC": "AC/DC é uma banda australiana de rock formada em Sydney, Austrália em 1973, pelos irmãos escoceses Malcolm e Angus Young. O estilo musical da banda é normalmente classificado como hard rock e até mesmo blues rock. Mas seus membros sempre classificaram a sua música simplesmente como rock and roll.",
        };
    



    const artistGrid = document.querySelector('.artists-grid')
    const albumsGrid = document.querySelector('.albums-grid')

    artistsData.forEach( artist => { 
        const artistCard = document.createElement('div')
        artistCard.classList.add('artist-card')

        artistCard.innerHTML = `
            <img src="${artist.image}" alt="imagem do ${artist.name}">
            <div>
                <h3>${artist.name}</h3>
                <p>Artista</p>   
            </div>
        `

        artistGrid.appendChild(artistCard)
    })

    albumsData.forEach( (album, idx) => { 
        const albumCard = document.createElement('div')
        albumCard.classList.add('album-card')

        albumCard.setAttribute('data-index', idx)

        albumCard.innerHTML = `
            <img src="${album.image}" alt="imagem do ${album.name}">
            <div>
                <h3>${album.name}</h3>
                <p>${album.artist}</p>   
            </div>
        `

        albumsGrid.appendChild(albumCard)
    })

    const audio = document.getElementById("audio");
    const playBtn = document.getElementById("play");
    const progressBar = document.getElementById("progress-bar");

    const coverEl = document.getElementById("music-cover");
    const titleEl = document.getElementById("music-title");
    const artistEl = document.getElementById("music-artist");

    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    let currentIndex = null; 

    function loadTrack(index) {
        if (index == null || index < 0 || index >= albumsData.length) return;
        const data = albumsData[index];
        currentIndex = index;

        audio.src = data.file;
        coverEl.src = data.image;
        titleEl.textContent = data.name;
        artistEl.textContent = data.artist;


        progressBar.value = 0;


        audio.play().catch(() => {
        
            playBtn.classList.remove("fa-pause");
            playBtn.classList.add("fa-play");
        });

        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
    }


    albumsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.album-card');
        if (!card) return;
        const idx = Number(card.getAttribute('data-index'));
        if (Number.isFinite(idx)) {
            loadTrack(idx);
        }
    });

   
    playBtn.addEventListener("click", () => {
        if (!audio.src) {
       
            loadTrack(0);
            return;
        }
        if (audio.paused) {
            audio.play();
            playBtn.classList.remove("fa-play");
            playBtn.classList.add("fa-pause");
        } else {
            audio.pause();
            playBtn.classList.remove("fa-pause");
            playBtn.classList.add("fa-play");
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex == null) { loadTrack(0); return; }
        const nextIndex = (currentIndex + 1) % albumsData.length;
        loadTrack(nextIndex);
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex == null) { loadTrack(0); return; }
        const prevIndex = (currentIndex - 1 + albumsData.length) % albumsData.length;
        loadTrack(prevIndex);
    });


    audio.addEventListener("timeupdate", () => {
        if (!audio.duration || isNaN(audio.duration)) return;
        progressBar.value = (audio.currentTime / audio.duration) * 100;
    });

    progressBar.addEventListener("input", () => {
        if (!audio.duration || isNaN(audio.duration)) return;
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

    audio.addEventListener('ended', () => {
        const nextIndex = (currentIndex == null) ? 0 : (currentIndex + 1) % albumsData.length;
        loadTrack(nextIndex);
    });

const artistScreen = document.getElementById("artistScreen");
const artistInfoImg = document.getElementById("artistInfoImg");
const artistInfoName = document.getElementById("artistInfoName");
const artistInfoText = document.getElementById("artistInfoText");
const closeArtist = document.getElementById("closeArtist");


document.querySelectorAll(".artist-card").forEach((card, index) => {
    card.addEventListener("click", () => {
        const artist = artistsData[index];

        artistInfoImg.src = artist.image;
        artistInfoName.textContent = artist.name;

   
        artistInfoText.textContent = artistDescriptions[artist.name] || "Texto não encontrado";

        artistScreen.classList.remove("hidden");
    });
});


closeArtist.addEventListener("click", () => {
    artistScreen.classList.add("hidden");
});

}); // DOMContentLoaded fim

const playlistBtn = document.querySelector(".nav-playlist button");


const playlistScreen = document.getElementById("playlistScreen");
const closePlaylist = document.getElementById("closePlaylist");
const createPlaylistBtn = document.getElementById("createPlaylistBtn");


playlistBtn.addEventListener("click", () => {
    playlistScreen.classList.remove("hidden");
});

closePlaylist.addEventListener("click", () => {
    playlistScreen.classList.add("hidden");
});

createPlaylistBtn.addEventListener("click", () => {
    const nome = document.getElementById("playlistName").value.trim();

    if (nome === "") {
        alert("Digite um nome para a playlist!");
        return;
    }

    alert("Playlist criada: " + nome);

    playlistScreen.classList.add("hidden");
});


const langButton = document.querySelector(".nav-botao");  

const devScreen = document.getElementById("devScreen");
const closeDev = document.getElementById("closeDev");

langButton.addEventListener("click", () => {
    devScreen.classList.remove("hidden");
});

closeDev.addEventListener("click", () => {
    devScreen.classList.add("hidden");
});

const volumeBar = document.getElementById("volume-bar");

volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value;
});
