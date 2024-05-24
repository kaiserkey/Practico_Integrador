const imagenes = [
    "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg",
    "img6.jpg", "img7.jpg", "img8.jpg", "img9.jpg", "img10.jpg",
    "img11.jpg", "img12.jpg", "img13.jpg", "img14.jpg", "img15.jpg",
    "img16.jpg", "img17.jpg", "img18.jpg", "img19.jpg", "img20.jpg"
];

const contenedor = document.querySelector(".contenedor-fotos");
const frag = document.createDocumentFragment();

let ventana = document.documentElement.clientWidth;
let columna = Math.trunc(ventana / 250);
const divCo = [];

function crearColumnas() {
    for (let c = 0; c < columna; c++) {
        const columnaDiv = document.createElement("div");
        columnaDiv.classList.add("contenedor-columna");
        divCo[c] = columnaDiv;
    }
}

function cargarContenido(limite = 3 * columna) {
    for (let c = 0; c < columna; c++) {
        for (let i = c; i < limite; i += columna) {
            if (imagenes[i]) {
                const divCP = document.createElement("div");
                divCP.classList.add("contenedor-post");

                const divCI = document.createElement("div");
                divCI.classList.add("contenedor-imagen");

                const img = document.createElement("img");
                img.classList.add("imagen");
                img.src = "./assets/img/" + imagenes[i];

                const link = document.createElement("a");
                link.href = "./foto.html?imagen=" + imagenes[i];

                const divCB = document.createElement("div");
                divCB.classList.add("contenedor-botones");

                const btnguardar = document.createElement("button");
                btnguardar.classList.add("guardar");
                const iconG = document.createElement("i");
                iconG.classList.add("bi", "bi-download", "icon-guardar");

                const btncompartir = document.createElement("button");
                btncompartir.classList.add("compartir");
                const iconC = document.createElement("i");
                iconC.classList.add("bi", "bi-share-fill", "icon-compartir");

                const btnmenu = document.createElement("button");
                btnmenu.classList.add("menu");
                const iconM = document.createElement("i");
                iconM.classList.add("bi", "bi-three-dots-vertical", "icon-menu");

                btnguardar.append(iconG);
                btncompartir.append(iconC);
                btnmenu.append(iconM);

                link.append(img);
                divCI.append(link);
                divCB.append(btnguardar, btncompartir, btnmenu);
                divCP.append(divCI, divCB);

                divCo[c].append(divCP);
            }
        }
        frag.append(divCo[c]);
    }
    contenedor.append(frag);
}

function recargar() {
    ventana = document.documentElement.clientWidth;
    columna = Math.trunc(ventana / 250);
    contenedor.innerHTML = '';
    frag.innerHTML = '';
    crearColumnas();
    cargarContenido();
}

function MasContenido() {
    if (window.scrollY + window.innerHeight > 0.9 * document.body.scrollHeight) {
        const loadedImages = document.querySelectorAll(".contenedor-post").length;
        cargarContenido(loadedImages + 3 * columna);
    }
}

crearColumnas();
cargarContenido();
window.onresize = recargar;
window.onscroll = MasContenido;
