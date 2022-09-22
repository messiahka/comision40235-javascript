let carrito = [];
const DOMitems = document.getElementById("items");
const DOMcarrito = document.querySelector("#carrito");
const DOMcontenedorcarrito = document.querySelector("#lista-carrito tbody");
const DOMfinalizarcompra = document.querySelector("#finalizar-compra");
const DOMvaciarcarrito = document.querySelector("#vaciar-carrito");

const listaDeProductos = [
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
  {
    id: 5,
    nombre: "Torre de Queso",
    precio: 1200,
    imagen: "./img/FullCheddar.png",
  },
  {
    id: 6,
    nombre: "Bacon Extremo",
    precio: 1200,
    imagen: "./img/BaconFull.png",
  },
  {
    id: 7,
    nombre: "Tuttita Simple",
    precio: 1200,
    imagen: "./img/TuttitaSimple.png",
  },
  {
    id: 8,
    nombre: "Tuttita Doble",
    precio: 1500,
    imagen: "./img/TuttitaSuperDoble.png",
  },
  {
    id: 9,
    nombre: "Tuttita Triple",
    precio: 1800,
    imagen: "./img/TuttitaSuperTriple.png",
  },
];

function renderizarProductos() {
  listaDeProductos.forEach((info) => {
    // Estructura
    const miNodo = document.createElement("div");
    miNodo.classList.add("card", "col-sm-4");
    // Body
    const miNodoCardBody = document.createElement("div");
    miNodoCardBody.setAttribute("id", info.id);
    miNodoCardBody.classList.add("card-body");
    // Titulo
    const miNodoTitle = document.createElement("h5");
    miNodoTitle.classList.add("card-title");
    miNodoTitle.innerText = info.nombre;
    // Imagen
    const miNodoImagen = document.createElement("img");
    miNodoImagen.classList.add("imagen");
    miNodoImagen.setAttribute("src", info.imagen);
    // Precio
    const miNodoPrecio = document.createElement("p");
    miNodoPrecio.classList.add("card-text");
    miNodoPrecio.innerText = `$${info.precio}`;
    // Boton
    const miNodoBoton = document.createElement("button");
    miNodoBoton.classList.add("btn", "btn-primary", "agregar-carrito");
    miNodoBoton.innerText = "agregar al carrito";
    miNodoBoton.setAttribute("marcador", info.id);
    // miNodoBoton.addEventListener("click", anyadirProductoAlCarrito);
    // Insertamos
    miNodoCardBody.append(miNodoImagen);
    miNodoCardBody.append(miNodoTitle);
    miNodoCardBody.append(miNodoPrecio);
    miNodoCardBody.append(miNodoBoton);
    miNodo.append(miNodoCardBody);
    DOMitems.append(miNodo);
  });
}

// Inicio
cargarCarritoDeLocalStorage();
renderizarProductos();
cargarEventListeners();

function cargarEventListeners() {
  // Cuando agregas una Hamburguesa presionando "agregar al carrito"
  DOMitems.addEventListener("click", agregarHamburguesa);
  // Elimina cursos del carrito
  DOMcarrito.addEventListener("click", eliminarHamburguesa);
  // Finalizar Compra
  DOMfinalizarcompra.addEventListener("click", () => {
    alert("Compra Finalizada")
  
  });
  // Vaciar el Carrito
  DOMvaciarcarrito.addEventListener("click", () => {
    // Reseteamos el array
    carrito = [];
    // Eliminamos todo el HTML
    limpiarHTML();
  });
}

function agregarHamburguesa(e) {
  if (e.target.classList.contains("agregar-carrito")) {
    const hamburguesaSeleccionada = e.target.parentElement;
    leerDatosHamburguesa(hamburguesaSeleccionada);
  }
}

//Elimina una hamburguesa del carrito
function eliminarHamburguesa(e) {
  if (e.target.classList.contains("borrar-hamburguesa")) {
    const hamburguesaId = e.target.getAttribute("marcador");

    // Elimina del arreglo de carrito por el marcador
    carrito = carrito.filter((hamburguesa) => hamburguesa.id !== hamburguesaId);

    carritoHTML(); //iterar sobre el carrito y mostrar su HTML
  }
}
// Lee el contenido del HTML al que le dimos click y extrae la informacion de la hamburguesa
function leerDatosHamburguesa(hamburguesa) {
  // Crear un objeto con el contenido de la hamburguesa actual
  const infoHamburguesa = {
    imagen: hamburguesa.querySelector("img").src,
    titulo: hamburguesa.querySelector("h5").textContent,
    precio: hamburguesa.querySelector("p").textContent,
    id: hamburguesa.querySelector("button").getAttribute("marcador"),
    cantidad: 1,
  };

  if (carrito.some((hamburguesa) => hamburguesa.id === infoHamburguesa.id)) {
    const hamburguesas = carrito.map((hamburguesa) => {
      if (hamburguesa.id === infoHamburguesa.id) {
        hamburguesa.cantidad++;
        return hamburguesa;
      } else {
        return hamburguesa;
      }
    });
    carrito = [...hamburguesas];
  } else {
    carrito = [...carrito, infoHamburguesa];
  }

  carritoHTML();

  guardarCarritoEnLocalStorage();
}

// Muestra el Carrito de compras en el HTML
function carritoHTML() {
  // Limpiar el HTML
  limpiarHTML();

  // Recorre el carrito y genera el HTML
  carrito.forEach((hamburguesa) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
        <img src="${hamburguesa.imagen}" width="100">
    </td>
    <td>${hamburguesa.titulo}</td>
    <td>${hamburguesa.precio}</td>
    <td>${hamburguesa.cantidad}</td>
    <td>
        <a href="#" class="borrar-hamburguesa" marcador="${hamburguesa.id}"> X </a>
    </td>
    `;

    // Agrega el HTML del carrito en el tbody
    DOMcontenedorcarrito.appendChild(row);
  });
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
  // ¿Existe un carrito previo guardado en LocalStorage?
  if (localStorage.getItem("carrito") !== null) {
    // Carga la información
    carrito = JSON.parse(localStorage.getItem("carrito"));
  }
}

function limpiarHTML() {
  while (DOMcontenedorcarrito.firstChild) {
    DOMcontenedorcarrito.removeChild(DOMcontenedorcarrito.firstChild);
  }
}
