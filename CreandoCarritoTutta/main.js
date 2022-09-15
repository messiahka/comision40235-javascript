let hamburguesas = [
    {
        id: 1,
        nombre: "Mini",
        precio: 700,
        imagen: "./img/Mini.png",
    },
    {
        id: 2,
        nombre: "Mini Con Queso",
        precio: 800,
        imagen: "./img/MiniconQueso.png",
    },
    {
        id: 3,
        nombre: "La Clásica de Siempre",
        precio: 1000,
        imagen: "./img/ClasicaSimple.png",
    },
    {
        id: 4,
        nombre: "La Clásica pero DOBLE",
        precio: 1200,
        imagen: "./img/ClasicaDoble.png",
    },
]

const printCarrito = ()=> {
    let contenedor = document.getElementById("shop");
    hamburguesas.forEach((hamburguesa)=>{
let card = document.createElement("div");
card.classList.add("card", "col-sm-12", "col-lg-3");
card.innerHTML = `<img src="${hamburguesa.imagen}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${hamburguesa.nombre}</h5>
  <p class="card-text">Precio: $${hamburguesa.precio}</p>
  <a id="${hamburguesa.id}"href="#" class="btn btn-secondary" onClick="agregarAlcarrito(id)">Comprar</a>
</div>`;
contenedor.appendChild(card)
    })
}

printCarrito();

let agregarAlcarrito = (id) => {
    
    if (id == 1) {
        alert("Elegiste Mini")
    }
    if (id == 2) {
        alert("Elegiste Mini con Queso")
    }
    if (id == 3) {
        alert("Elegiste La Clásica de Siempre")
    }
    if (id == 4) {
        alert("Elegiste la Clásica pero DOBLE")
    }
    // let selectedItem = id;
    console.log(id);
}
