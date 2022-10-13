let carrito = [];
const domItems = document.getElementById("items");
const domCarrito = document.querySelector("#carrito");
const domContenedorCarrito = document.querySelector("#lista-carrito tbody");
const domFinalizarCompra = document.querySelector("#finalizar-compra");
const domVaciarCarrito = document.querySelector("#vaciar-carrito");


function renderizarProductos() {
  const url = './js/hamburguesas.json'
  fetch(url)
  .then ((res) => res.json())
  .then ((hamburguesas) => {
  hamburguesas.forEach((info) => {
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
    domItems.append(miNodo);
  });
})

}

// Inicio
cargarCarritoDeLocalStorage();
renderizarProductos();
cargarEventListeners();

function cargarEventListeners() {
  // Cuando agregas una Hamburguesa presionando "agregar al carrito"
  domItems.addEventListener("click", agregarHamburguesa);
  // Elimina hamburguesa del carrito
  domCarrito.addEventListener("click", eliminarHamburguesa);
  // Finalizar Compra
  domFinalizarCompra.addEventListener("click", () => {
    Swal.fire({
      title: '¿Desea Finalizar la Compra?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
          
          window.location.href = "../pages/payment.html"
        
      } else if (result.isDenied) {
        Swal.fire('La compra ha sido cancelada', '', 'info')
      }
    })
    
    // Reseteamos el array
    carrito = [];
    // Eliminamos todo el HTML
    limpiarHTML();
  });
  // Vaciar el Carrito
  domVaciarCarrito.addEventListener("click", () => {
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
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Agregaste Hamburguesa al Carrito",
      showConfirmButton: false,
      width: 400,
      padding: "3em",
      timer: 750,
    });
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

function limpiarHTML() {
  while (domContenedorCarrito.firstChild) {
    domContenedorCarrito.removeChild(domContenedorCarrito.firstChild);
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
    domContenedorCarrito.appendChild(row);
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







