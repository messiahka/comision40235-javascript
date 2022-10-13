class Cliente {
    constructor(nombreApellido, email, direccion, ciudad, provincia, codigoPostal) {
        this.nombreApellido = nombreApellido;
        this.email = email;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.provincia = provincia;
        this.codigoPostal = codigoPostal;
    }
}

const btnFinalizarCompra = document.getElementById("checkout");

btnFinalizarCompra.addEventListener('click', cargarCliente);

function cargarCliente() {
    const nombreApellido = document.getElementById("nombrecompleto").value;
    const email = document.getElementById("email").value;
    const direccion = document.getElementById("address").value;
    const ciudad = document.getElementById("city").value;
    const provincia = document.getElementById("province").value;
    const codigoPostal = document.getElementById("cp").value;
    const cliente1 = new Cliente (nombreApellido, email,  direccion, ciudad, provincia, codigoPostal)
    console.log(cliente1);
    mostrarCliente(cliente1);
}

function mostrarCliente(cliente) {
    const formulario = document.getElementById("customer");
    formulario.innerHTML = " ";
    // formulario.innerHTML = `Gracias ${cliente.nombreApellido} muy pronto llegara su pedido a ${cliente.direccion}, 
    // le enviaremos un mail a ${cliente.email}`
    let nuevoContenido = document.createElement("div");
    nuevoContenido.innerHTML = `<h3 style="margin: 3em; color: #ff3aad; text-shadow: 2px 1px 3px black">Gracias ${cliente.nombreApellido} muy pronto llegara su pedido a ${cliente.direccion}, 
    le enviaremos un mail a ${cliente.email}</h3>`
    formulario.appendChild(nuevoContenido);
    
    
    // `Gracias ${cliente.nombreApellido} muy pronto llegara su pedido a ${cliente.direccion}, 
    // // le enviaremos un mail a ${cliente.email}`;
    // nuevoContenido.className("info-cliente");
    // formulario.appendChild(nuevoContenido);
}




// const nombreApellido = document.getElementById("nombrecompleto") 

// nombreApellido.addEventListener('click', mostrar);

// function mostrar() {
//     console.log(nombreApellido.value);
// }

