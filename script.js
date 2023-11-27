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
                    <p class="categoria" hidden>${video.categoria}</p> 
                    </div>
                </li>
                `
        });

    } catch(error) {
        videosContainer.innerHTML = `<p>Erro ao carregar o vídeo. ${error}</p>`
    }
}

buscarVideos();


const pesquisarVideosInput = document.querySelector(".pesquisar__input");

pesquisarVideosInput.addEventListener("input", filtrarPesquisa);


function filtrarPesquisa() {
    const listaVideos = document.querySelectorAll(".videos__item");
    const valorFiltro = pesquisarVideosInput.value.toLowerCase();

        listaVideos.forEach(video => {
        
            const titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
            
            video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';

        })
}


const categoriaBtn = document.querySelectorAll(".secao__superior__item");

categoriaBtn.forEach(button => {
    let nomeCategoria = button.getAttribute("name");

    button.addEventListener("click", () => filtrarCategoriaVideos(nomeCategoria))
});

function filtrarCategoriaVideos(filtro) {
    const videos = document.querySelectorAll(".videos__item");

    for(let video of videos) {
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltroCategoria = filtro.toLowerCase();

        //Se categoria NÃO possui um valor de filtro E o valor do filtro for diferente do botão de categoria "tudo"...
        if(!categoria.includes(valorFiltroCategoria) && valorFiltroCategoria != 'tudo') {
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    }
}