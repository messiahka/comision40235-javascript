let hamburguesas = [
    {
        id: 1,
        nombre: "Mini",
        precio: 700,
        imagen: "../img/Hamburguesassinbg/Mini.png",
    },
    {
        id: 2,
        nombre: "Mini Con Queso",
        precio: 800,
        imagen: "../img/Hamburguesassinbg/MiniconQueso.png",
    },
    {
        id: 3,
        nombre: "La Clásica de Siempre",
        precio: 1000,
        imagen: "../img/Hamburguesassinbg/ClasicaSimple.png",
    },
    {
        id: 4,
        nombre: "La Clásica pero DOBLE",
        precio: 1200,
        imagen: "../img/Hamburguesassinbg/ClasicaDoble.png",
    },
    {
        id: 5,
        nombre: "Torre de Queso",
        precio: 1200,
        imagen: "../img/Hamburguesassinbg/FullCheddar.png",
    },
    {
        id: 6,
        nombre: "Bacon Extremo",
        precio: 1200,
        imagen: "../img/Hamburguesassinbg/BaconFull.png",
    },
    {
        id: 7,
        nombre: "Tuttita Simple",
        precio: 1200,
        imagen: "../img/Hamburguesassinbg/TuttitaSimple.png",
    },
    {
        id: 8,
        nombre: "Tuttita Doble",
        precio: 1500,
        imagen: "../img/Hamburguesassinbg/TuttitaSuperDoble.png",
    },
    {
        id: 9,
        nombre: "Tuttita Triple",
        precio: 1800,
        imagen: "../img/Hamburguesassinbg/TuttitaSuperTriple.png"
    }
]


// DOM
const printCarrito = ()=> {
    let contenedor = document.getElementById("container");
    hamburguesas.forEach((hamburguesa)=>{
let card = document.createElement("div");
card.classList.add("card", "col-sm-12", "col-lg-3");
card.innerHTML = `<img src="${hamburguesa.imagen}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${hamburguesa.nombre}</h5>
  <p class="card-text">Precio: $${hamburguesa.precio}
  <a href="#" class="btn btn-primary" onClick="agregarCarrito()">Comprar</a>
</div>`;
contenedor.appendChild(card)
    })
}




printCarrito();


const agregarCarrito = ()=> {
    alert("Producto agregado al Carrito")
}


// function elementoSeleccionado() {
//     if (boton === hamburguesas.id) {
//         alert("Seleccionaste Mini")
//     }
// }



// const boton = document.getElementsByClassName("btn");
//     boton.addEventListener("click", elementoSeleccionado) 