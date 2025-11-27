document.addEventListener('DOMContentLoaded', () => {

    const artistsData = [
       { name: 'Creed', image: 'creed.jpg'},
       { name: 'Guns N Roses', image: 'gunsandroses.jpeg'},
       { name: 'Bon Jovi', image: 'bonjovi.jpeg'}
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
       }
    ];

    // --- CRIAÇÃO DE CARDS (mantendo seu layout) ---
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
        // adiciona atributo data-index para controlar qual música tocar
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

    // --- BARRA DE ÁUDIO: elementos ---
    const audio = document.getElementById("audio");
    const playBtn = document.getElementById("play");
    const progressBar = document.getElementById("progress-bar");

    const coverEl = document.getElementById("music-cover");
    const titleEl = document.getElementById("music-title");
    const artistEl = document.getElementById("music-artist");

    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    let currentIndex = null; // index da música atual (albumsData)

    // --- FUNÇÃO PARA CARREGAR E TOCAR MÚSICA ---
    function loadTrack(index) {
        if (index == null || index < 0 || index >= albumsData.length) return;
        const data = albumsData[index];
        currentIndex = index;

        audio.src = data.file;
        coverEl.src = data.image;
        titleEl.textContent = data.name;
        artistEl.textContent = data.artist;

        // reset progresso
        progressBar.value = 0;

        // tenta tocar (pode ser bloqueado por política do navegador até interação do usuário)
        audio.play().catch(() => {
            // se o autoplay for bloqueado, apenas deixe o botão mostrar "play"
            playBtn.classList.remove("fa-pause");
            playBtn.classList.add("fa-play");
        });

        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
    }

    // --- CLIQUE NOS ÁLBUNS (delegação segura: albumsGrid já tem os cards) ---
    albumsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.album-card');
        if (!card) return;
        const idx = Number(card.getAttribute('data-index'));
        if (Number.isFinite(idx)) {
            loadTrack(idx);
        }
    });

    // --- PLAY / PAUSE ---
    playBtn.addEventListener("click", () => {
        if (!audio.src) {
            // se ainda não escolheu uma faixa, toca a primeira por padrão
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

    // --- NEXT / PREV ---
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

    // --- ATUALIZAR BARRA DE PROGRESSO ---
    audio.addEventListener("timeupdate", () => {
        if (!audio.duration || isNaN(audio.duration)) return;
        progressBar.value = (audio.currentTime / audio.duration) * 100;
    });

    progressBar.addEventListener("input", () => {
        if (!audio.duration || isNaN(audio.duration)) return;
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

    // quando a música acaba, avança automaticamente
    audio.addEventListener('ended', () => {
        const nextIndex = (currentIndex == null) ? 0 : (currentIndex + 1) % albumsData.length;
        loadTrack(nextIndex);
    });

}); // DOMContentLoaded fim

// Pega o botão existente dentro da div .nav-playlist
const playlistBtn = document.querySelector(".nav-playlist button");

// Elementos da tela de playlist
const playlistScreen = document.getElementById("playlistScreen");
const closePlaylist = document.getElementById("closePlaylist");
const createPlaylistBtn = document.getElementById("createPlaylistBtn");

// Quando clicar no botão existente, abre a tela
playlistBtn.addEventListener("click", () => {
    playlistScreen.classList.remove("hidden");
});

// Botão "Voltar" fecha a tela
closePlaylist.addEventListener("click", () => {
    playlistScreen.classList.add("hidden");
});

// Criar playlist (aqui só mostra um alerta)
createPlaylistBtn.addEventListener("click", () => {
    const nome = document.getElementById("playlistName").value.trim();

    if (nome === "") {
        alert("Digite um nome para a playlist!");
        return;
    }

    alert("Playlist criada: " + nome);

    playlistScreen.classList.add("hidden");
});

