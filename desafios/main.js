// DESAFIO COMPLEMENTARIO 1


let nombre = ""

for (let i = 1; i < 5; i++) {
    if (i == 5) {
        break;
    }
    console.log(i)

    let nombre = prompt("Ingrese su nombre:")
    let apellido = prompt("Ingrese su apellido")
    let nombreCompleto = nombre + " " + apellido

    alert(`Bienvenido ${nombreCompleto} su turno es el N°: ${i}`)
}
alert("Nos quedamos sin turno por hoy")
