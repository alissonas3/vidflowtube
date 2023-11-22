const videosContainer = document.querySelector(".videos__container");

// const api = fetch("http://localhost:3000/videos")
//     .then(resp => resp.json())
//     .then((videos) => {
//         videos.forEach((video) => {
//             videosContainer.innerHTML += `
//             <li class="videos__item">
//                 <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
//                 <div class="descricao-video">
//                     <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
//                     <h3 class="titulo-video">${video.titulo}</h3>
//                     <p class="titulo-canal">${video.descricao}</p>
//                 </div>
//             </li>
//             `
//         });
//     })
//     .catch((error) => {
//         videosContainer.innerHTML = `<p>Falha ao carregar os videos: ${error}</p>`
//     })

async function buscarVideos() {

    try {

        const busca = await fetch("http://localhost:3000/videos")
        const videos = await busca.json()

        videos.forEach((video) => {
            
            if(video.categoria == "") {
                throw Error ("O video não contém uma categoria definida.")
            }

            videosContainer.innerHTML += `
                <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    </div>
                </li>
                `
        });

    } catch(error) {
        videosContainer.innerHTML = `<p>Erro ao carregar o vídeo. ${error}</p>`
    }
}

buscarVideos();