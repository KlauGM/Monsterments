// === REFERENCIAS A ELEMENTOS DEL DOM ===
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("Reiniciar")   // puede no existir, no pasa nada
//const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-Reiniciar")

const botonMascotaJugador = document.getElementById('boton-mascota')

const contenedorTarjetas = document.getElementById('contenedorTarjetas')
//const contenedorAtaques = document.getElementById('contenedorAtaques')

// 📌 Mensajes y ataques
const resultado = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

// 📌 Vidas
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")


const sectionMensajes = document.getElementById("mensajes")
const ataquesJugadorDiv = document.getElementById("ataques-del-jugador")
const ataquesEnemigoDiv = document.getElementById("ataques-del-enemigo")


const sectionVerMapa = document.getElementById("ver-mapa")
// 🌎 Variables globales, al inicio del archivo JS
const mapa = document.getElementById("mapa")
const lienzo = mapa.getContext("2d")

const mapaBackGround = new Image()
mapaBackGround.src = "./imagenes/Monstermap.png"   // ajusta el nombre del archivo
mapa.width = 800
mapa.height = 600

const mapaBackground = new Image()
mapaBackground.src = "/imagenes/Monstermap.png"
sectionVerMapa.style.display = "none"

// 👇 importantísimo: solo tocamos .style si el elemento existe
if (sectionSeleccionarAtaque) sectionSeleccionarAtaque.style.display = "none"
if (sectionVerMapa) sectionVerMapa.style.display = "none"
if (sectionReiniciar) sectionReiniciar.style.display = "none"

let jugadorId = null
let enemigoId = null
let Monsters = []
let monstersEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMonsters
let inputWatty
let inputWindy
let inputDirty
let inputSmokey
let inputWamokey
let inputWatirty
let inputWandy
let mascotaJugador
let mascotaJugadorObjeto = null
let mascotaEnemigoObjeto
let ataquesMonster
let ataquesMonsterEnemigo = []   // 👈 IMPORTANTE: que exista y sea array
let ataquesMostrados = false   // 👈 bandera global
let botonAgua
let botonAire
let botonTierra
let botonFuego
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let intervalo
let intervaloMapa       // para pintar el canvas
let intervaloAtaques    // para hacer fetch a /ataques
let combateIniciado = false
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Monsterments {
    constructor(nombre, foto, vida, fotoMapa, id = 0) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = "/imagenes/Monstermap.png"
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMonsterment() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let Watty = new Monsterments("Watty", "./imagenes/Watty.jpg", 5, "./imagenes/Watty.jpg")

let Windy = new Monsterments("Windy", "./imagenes/Windy.jpg", 5, "./imagenes/Windy.jpg")

let Dirty = new Monsterments("Dirty", "./imagenes/Dirty.jpg", 5, "./imagenes/Dirty.jpg")

let Smokey = new Monsterments("Smokey", "./imagenes/Smokey.jpg", 5, "./imagenes/Smokey.jpg")

let Wamokey = new Monsterments("Wamokey", "./imagenes/Wamokey.jpg", 5, "./imagenes/Wamokey.jpg")

let Watirty = new Monsterments("Watirty", "./imagenes/Watirty.jpg", 5, "./imagenes/Watirty.jpg")

let Wandy = new Monsterments("Wandy", "./imagenes/Wandy.jpg", 5, "./imagenes/Wandy.jpg")

// si ya tenías let Monsters = [] arriba, aquí lo rellenamos:
Monsters = [Watty, Windy, Dirty, Smokey, Wamokey, Watirty, Wandy]

// Diccionario nombre -> objeto Monsterments
const MONSTERS_POR_NOMBRE = {
    Watty,
    Windy,
    Dirty,
    Smokey,
    Wamokey,
    Watirty,
    Wandy
}

const WATTY_ATAQUES = [
    { nombre: "🌊", id: "boton-Agua" },
    { nombre: "🌊", id: "boton-Agua" },
    { nombre: "🌪", id: "boton-Aire" },
    { nombre: "🌋", id: "boton-Fuego" },
    { nombre: "🌍", id: "boton-Tierra" },
]

const WINDY_ATAQUES = [
    { nombre: "🌍", id: "boton-Tierra" },
    { nombre: "🌍", id: "boton-Tierra" },
    { nombre: "🌪", id: "boton-Aire" },
    { nombre: "🌋", id: "boton-Fuego" },
    { nombre: "🌊", id: "boton-Agua" },
]

const DIRTY_ATAQUES = [
    { nombre: "🌋", id: "boton-Agua" },
    { nombre: "🌋", id: "boton-Agua" },
    { nombre: "🌪", id: "boton-Aire" },
    { nombre: "🌊", id: "boton-Agua" },
    { nombre: "🌍", id: "boton-Tierra" },
]

const SMOKEY_ATAQUES = [
    { nombre: "🌪", id: "boton-Aire" },
    { nombre: "🌪", id: "boton-Aire" },
    { nombre: "🌋", id: "boton-Fuego" },
    { nombre: "🌊", id: "boton-Agua" },
    { nombre: "🌍", id: "boton-Tierra" },
]

const WAMOKEY_ATAQUES = [
    { nombre: "🌊", id: "boton-Agua" },
    { nombre: "🌪", id: "boton-Aire" },
    { nombre: "🌋", id: "boton-Fuego" },
    { nombre: "🌊", id: "boton-Agua" },
    { nombre: "🌍", id: "boton-Tierra" },
]

const WATIRTY_ATAQUES = [
    { nombre: "🌍", id: "boton-Tierra" },
    { nombre: "🌊", id: "boton-Agua" },
    { nombre: "🌪", id: "boton-Aire" },
    { nombre: "🌋", id: "boton-Fuego" },
    { nombre: "🌊", id: "boton-Agua" },
]

const WANDY_ATAQUES = [
    { nombre: "🌊", id: "boton-Agua" },
    { nombre: "🌋", id: "boton-Fuego" },
    { nombre: "🌍", id: "boton-Tierra" },
    { nombre: "🌊", id: "boton-Agua" },
    { nombre: "🌪", id: "boton-Aire" },
]
Watty.ataques.push(...WATTY_ATAQUES)
Windy.ataques.push(...WINDY_ATAQUES)
Dirty.ataques.push(...DIRTY_ATAQUES)
Smokey.ataques.push(...SMOKEY_ATAQUES)
Wamokey.ataques.push(...WAMOKEY_ATAQUES)
Watirty.ataques.push(...WATIRTY_ATAQUES)
Wandy.ataques.push(...WANDY_ATAQUES)

Monsters.push(Watty, Windy, Dirty, Smokey, Wamokey, Watirty, Wandy)

function iniciarJuego() {
    if (sectionSeleccionarAtaque) sectionSeleccionarAtaque.style.display = "none"
    if (sectionVerMapa) sectionVerMapa.style.display = "none"
    if (sectionReiniciar) sectionReiniciar.style.display = "none"

    // limpiamos contenedor por si acaso
    contenedorTarjetas.innerHTML = ""

    Monsters.forEach((monster) => {
        const opcionDeMonsters = `
      <label class="tarjeta-monster">
        <input type="radio" name="mascota" id="${monster.nombre}" />
        <img src="${monster.foto}" alt="${monster.nombre}" />
        <p>${monster.nombre}</p>
      </label>
    `
        contenedorTarjetas.innerHTML += opcionDeMonsters
    })

    // referencias a los inputs ya creados
    inputWatty = document.getElementById("Watty")
    inputWindy = document.getElementById("Windy")
    inputDirty = document.getElementById("Dirty")
    inputSmokey = document.getElementById("Smokey")
    inputWamokey = document.getElementById("Wamokey")
    inputWatirty = document.getElementById("Watirty")
    inputWandy = document.getElementById("Wandy")

    if (botonMascotaJugador) {
        botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    }

    if (botonReiniciar) {
        botonReiniciar.addEventListener("click", reiniciarJuego)
    }

    // si usas backend/servidor:
    if (typeof unirseAlJuego === "function") {
        unirseAlJuego()
    }
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then((res) => {
            if (res.ok) {
                res.text()
                    .then((respuesta) => {
                        console.log(respuesta);
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {
    console.log("CLICK en Seleccionar mascota")

    if (inputWatty.checked) {
        mascotaJugador = "Watty"
        mascotaJugadorObjeto = Watty
    } else if (inputWindy.checked) {
        mascotaJugador = "Windy"
        mascotaJugadorObjeto = Windy
    } else if (inputDirty.checked) {
        mascotaJugador = "Dirty"
        mascotaJugadorObjeto = Dirty
    } else if (inputSmokey.checked) {
        mascotaJugador = "Smokey"
        mascotaJugadorObjeto = Smokey
    } else if (inputWamokey.checked) {
        mascotaJugador = "Wamokey"
        mascotaJugadorObjeto = Wamokey
    } else if (inputWatirty.checked) {
        mascotaJugador = "Watirty"
        mascotaJugadorObjeto = Watirty
    } else if (inputWandy.checked) {
        mascotaJugador = "Wandy"
        mascotaJugadorObjeto = Wandy
    } else {
        alert("Selecciona una Mascota")
        return
    }
    spanMascotaJugador.innerHTML = mascotaJugador

    sectionSeleccionarMascota.style.display = "none"
    //sectionVerMapa.style.display = "flex"
    sectionSeleccionarAtaque.style.display = "block"

    seleccionarMonster(mascotaJugador)
    extraerAtaques(mascotaJugador)
    iniciarMapa()

    //console.log("Mascota elegida:", mascotaJugador)
    //console.log("Objeto mascota:", mascotaJugadorObjeto)

    // 👇 SOLO SE EJECUTA UNA VEZ, pase lo que pase en el mapa
    if (!ataquesMostrados) {
        mostrarAtaques()
        ataquesMostrados = true
    }
}


function seleccionarMonster(mascotaJugador) {
    fetch(`http://localhost:8080/monster/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            monster: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < Monsters.length; i++) {
        if (mascotaJugador === Monsters[i].nombre) {
            ataques = Monsters[i].ataques
        }
    }
    mostrarAtaques(ataques)
}


function mostrarAtaques(ataques) {
    // Limpia el contenedor por si acaso
    contenedorAtaques.innerHTML = ''

    // Crear los botones dinámicamente
    ataques.forEach((ataque) => {
        const boton = document.createElement('button')
        boton.id = ataque.id              // por si lo usas
        boton.textContent = ataque.nombre // el texto del botón
        boton.classList.add('boton-de-ataque', 'BAtaque')
        // Guardamos el tipo de ataque en un data-attribute
        boton.dataset.tipo = ataque.id || ataque.nombre

        contenedorAtaques.appendChild(boton)
    })

    // Seleccionamos los botones que acabamos de crear
    botones = document.querySelectorAll('.BAtaque')

    // LES PONEMOS LOS EVENT LISTENERS AQUÍ
    botones.forEach((boton) => {
        boton.addEventListener('click', () => {
            const tipo = boton.dataset.tipo
            console.log('Jugador eligió:', tipo)

            // Guardas el ataque del jugador
            ataqueJugador.push(tipo)

            // Deshabilitas visualmente el botón si quieres
            boton.disabled = true

            // Cuando ya eligió 5 ataques, los mandas al backend
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}



function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🌍") {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "🌊") {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "🌪") {
                ataqueJugador.push("AIRE")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                secuenciaAtaque()
            }
        })
    })

}
const sectionseleccionarAtaque = document.getElementById('seleccionar-ataque')
const contenedorAtaques = document.getElementById('contenedorAtaques')

//let boton = []
const ATAQUES_BASE = [
    { nombre: 'FUEGO', emoji: '🔥', id: 'boton-fuego' },
    { nombre: 'AGUA', emoji: '💧', id: 'boton-agua' },
    { nombre: 'AIRE', emoji: '🌪️', id: 'boton-aire' },
    { nombre: 'TIERRA', emoji: '🌱', id: 'boton-tierra' }
]
// 👉 El jugador debe elegir TODOS estos una sola vez:
const MAX_ATAQUES = ATAQUES_BASE.length   // = 4

// crea los botones dentro de #contenedorAtaques
// NO uses let boton = [] global
// deja solo estas variables globales si las necesitas:

function mostrarAtaques(ataques = []) {
    // Si por alguna razón NO es un arreglo, salimos y avisamos
    if (!Array.isArray(ataques)) {
        console.error('⚠️ mostrarAtaques esperaba un ARRAY, llegó:', ataques)
        return
    }

    // Limpia el contenedor y el arreglo global de ataques del jugador
    contenedorAtaques.innerHTML = ''
    ataqueJugador = []

    // 1. Crear un botón por cada ataque
    ataques.forEach((ataque) => {
        const btn = document.createElement('button')

        btn.classList.add('boton-de-ataque', 'BAtaque')
        btn.textContent = `${ataque.nombre} ${ataque.emoji ?? ''}`.trim()

        // guardamos el tipo de ataque en data-tipo
        btn.dataset.tipo = ataque.id || ataque.nombre

        contenedorAtaques.appendChild(btn)
    })

    // 2. Poner los listeners de click
    const botonesAtaque = contenedorAtaques.querySelectorAll('.BAtaque')

    botonesAtaque.forEach((btn) => {
        btn.addEventListener('click', () => {
            const tipo = btn.dataset.tipo      // "FUEGO", "AGUA", etc.
            console.log('Jugador eligió:', tipo)

            // guardamos el ataque
            ataqueJugador.push(tipo)

            // lo mostramos en "Tus ataques"
            const p = document.createElement('p')
            p.textContent = tipo
            document.getElementById('ataques-del-jugador').appendChild(p)

            // desactivar botón
            btn.disabled = true

            // cuando tenga 5 ataques, los enviamos al backend
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}


function seleccionarMascotaJugador() {
    if (inputWatty.checked) {
        mascotaJugador = "Watty"
        mascotaJugadorObjeto = Watty
    } else if (inputWindy.checked) {
        mascotaJugador = "Windy"
        mascotaJugadorObjeto = Windy
    } else if (inputDirty.checked) {
        mascotaJugador = "Dirty"
        mascotaJugadorObjeto = Dirty
    } else if (inputSmokey.checked) {
        mascotaJugador = "Smokey"
        mascotaJugadorObjeto = Smokey
    } else {
        alert("Selecciona una Mascota")
        return
    }

    console.log("Objeto mascotaJugadorObjeto:", mascotaJugadorObjeto)

    spanMascotaJugador.innerHTML = mascotaJugador

    sectionSeleccionarMascota.style.display = "none"
    sectionSeleccionarAtaque.style.display = "block"

    mostrarAtaques()
    seleccionarMonster(mascotaJugador)
    extraerAtaques(mascotaJugador)
    iniciarMapa()
}


function enviarAtaques() {
    console.log("Enviar ataques", ataqueJugador)

    // por si acaso: no lances el combate si aún no eligió los 5
    if (ataqueJugador.length !== 5) {
        console.warn("Aún no tienes los 5 ataques, length:", ataqueJugador.length)
        return
    }

    // 👉 asegurarnos de que ataquesMonsterEnemigo sea un array válido
    if (!Array.isArray(ataquesMonsterEnemigo) || ataquesMonsterEnemigo.length === 0) {
        console.warn(
            "ataquesMonsterEnemigo viene vacío/undefined, uso ataques por defecto"
        )

        // ataques de respaldo por si no llegaron desde la mascota enemiga
        ataquesMonsterEnemigo = ["FUEGO", "AGUA", "AIRE", "TIERRA"]
    }

    // limpiamos el array global de ataques enemigos
    ataqueEnemigo = []

    // generamos 5 ataques aleatorios del enemigo
    for (let i = 0; i < 5; i++) {
        const indice = aleatorio(0, ataquesMonsterEnemigo.length - 1)
        const posible = ataquesMonsterEnemigo[indice]
        // por si en algún momento son objetos { nombre: "AGUA" }
        const ataque = posible && posible.nombre ? posible.nombre : posible

        ataqueEnemigo.push(ataque)
    }

    console.log("Ataques enemigo (generados):", ataqueEnemigo)

    // ahora sí, lanzamos el combate
    combate()
}
function registrarAtaque(tipo) {
    ataqueJugador.push(tipo)
    console.log("ataqueJugador:", ataqueJugador)

    // dibuja el ataque del jugador en el área de mensajes si quieres
    // crearMensajeAtaqueJugador(tipo)

    if (ataqueJugador.length === 5) {
        // desactiva botones
        const botones = document.querySelectorAll('.boton-de-ataque')
        botones.forEach(b => b.disabled = true)

        enviarAtaques()
    }
}



//ataqueJugador.push("FUEGO");  // o "AGUA", etc.

//if (ataqueJugador.length === 5) {
//  botones.forEach(b => b.disabled = true); // desactiva botones
// enviarAtaques();
//}


function generarAtaquesEnemigoLocal() {
    // ataquesMonsterEnemigo ya debería ser el array de ataques de la mascota enemiga
    // (lo llenas cuando haces seleccionarMascotaEnemigo)
    ataqueEnemigo = []

    for (let i = 0; i < 5; i++) {
        const indice = aleatorio(0, ataquesMonsterEnemigo.length - 1)
        const ataque = ataquesMonsterEnemigo[indice].nombre || ataquesMonsterEnemigo[indice]
        ataqueEnemigo.push(ataque)
    }

    console.log("Ataques enemigo (local):", ataqueEnemigo)
}


function obtenerObjetoMascota(mascotaJugador) {  // ✅ AGREGA EL PARÁMETRO
    for (let i = 0; i < Monsters.length; i++) {
        if (mascotaJugador === Monsters[i].nombre) {
            return Monsters[i]
        }
    }
}
function seleccionarMascotaEnemigo(enemigo) {
    mascotaEnemigoObjeto = enemigo
    spanMascotaEnemigo.innerHTML = enemigo.nombre

    // 👇 aquí llenamos el array global
    ataquesMonsterEnemigo = enemigo.ataques || []

    console.log("ataquesMonsterEnemigo asignado:", ataquesMonsterEnemigo)
}


// ⛔️ Si vas a usar el BACKEND para los ataques,
//    ya NO necesitas el código que genera ataques aleatorios aquí.
//    Puedes comentar TODO esto:
/*
let ataqueAleatorio = aleatorio(0, ataquesMonsterEnemigo.length - 1)
 
if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
  ataqueEnemigo.push("AGUA")
} else if (ataqueAleatorio == 2 || ataqueAleatorio == 3) {
  ataqueEnemigo.push("AIRE")
} else if (ataqueAleatorio == 4 || ataqueAleatorio == 5) {
  ataqueEnemigo.push("TIERRA")
} else {
  ataqueEnemigo.push("FUEGO")
}
secuenciaAtaque()
*/


function iniciarBatalla() {
    ataqueJugador = []
    ataqueEnemigo = []
    indiceAtaque = 0
    combateIniciado = false
    // 👇 reinicia vidas
    vidasJugador = 3
    vidasEnemigo = 3
    spanVidasJugador.innerHTML = vidasJugador
    spanVidasEnemigo.innerHTML = vidasEnemigo

    sectionSeleccionarMascota.style.display = "none"
    sectionSeleccionarAtaque.style.display = "block"

    mostrarAtaques()  // crea los botones FUEGO/AGUA/AIRE/TIERRA
}
resultado.innerHTML = ''   // si tienes un div con los mensajes



function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    console.log("COMBATE");
    console.log("ataqueJugador:", ataqueJugador);
    console.log("ataqueEnemigo:", ataqueEnemigo);

    // Asegúrate de no pasarte del tamaño de alguno de los arrays
    const rondas = Math.min(ataqueJugador.length, ataqueEnemigo.length);

    for (let index = 0; index < rondas; index++) {
        const ataqueJ = ataqueJugador[index];
        const ataqueE = ataqueEnemigo[index];

        console.log(`Ronda ${index + 1}: J=${ataqueJ}, E=${ataqueE}`);

        // Si por alguna razón alguno es undefined, saltamos esa ronda
        if (!ataqueJ || !ataqueE) continue;

        if (ataqueJ === ataqueE) {
            // EMPATE
            indexAmbosOponentes(index, index);
            crearMensaje("EMPATE 🤝");
        } else if (
            // GANA JUGADOR
            (ataqueJ === "AGUA" && ataqueE === "TIERRA") ||
            (ataqueJ === "AIRE" && ataqueE === "FUEGO") ||
            (ataqueJ === "TIERRA" && ataqueE === "AGUA")
        ) {
            indexAmbosOponentes(index, index);
            crearMensaje("GANASTE 🏆");

            victoriasJugador++;
            // si quieres manejar vidas:
            vidasEnemigo--;
            spanVidasEnemigo.innerHTML = vidasEnemigo;
        } else {
            // GANA ENEMIGO
            indexAmbosOponentes(index, index);
            crearMensaje("PERDISTE 🥲");

            victoriasJugador++;
            vidasEnemigo--;
            spanVidasEnemigo.innerHTML = vidasEnemigo;

            victoriasEnemigo++;
            vidasJugador--;
            spanVidasJugador.innerHTML = vidasJugador;
        }
    }

    revisarVidas();
}


function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("It´s a Tie! 👊🏼")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICIDADES! Ganaste 🥳")
    } else {
        crearMensajeFinal("Perdiste! 😢")
    }
}
// Opcional: al terminar, deshabilita los botones de ataque
if (botones && botones.length) {
    botones.forEach((boton) => {
        boton.disabled = true
    })
}

// Opcional: muestra el botón de reiniciar si lo tienes
if (sectionReiniciar) {
    sectionReiniciar.style.display = "block"
}
function crearMensaje(texto) {
    if (!resultado) {
        console.error('⚠️ No se encontró el elemento con id="resultado"')
        return
    }

    resultado.innerHTML = texto
}

function indexAmbosOponentes(ataqueJ, ataqueE) {
    if (!ataquesDelJugador || !ataquesDelEnemigo) {
        console.error('⚠️ Faltan los contenedores de ataques en el HTML')
        return
    }

    const nuevoAtaqueJ = document.createElement('p')
    const nuevoAtaqueE = document.createElement('p')

    nuevoAtaqueJ.textContent = ataqueJ
    nuevoAtaqueE.textContent = ataqueE

    ataquesDelJugador.appendChild(nuevoAtaqueJ)
    ataquesDelEnemigo.appendChild(nuevoAtaqueE)
}


function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = "block"
}
function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    // 1. Actualizar posición de tu mascota según la velocidad
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY

    // 2. Limpiar todo el canvas
    lienzo.clearRect(0, 0, mapa.width, mapa.height)

    // 3. Dibujar el fondo
    lienzo.drawImage(
        mapaBackGround,
        0,
        0,
        mapa.width,
        mapa.height
    )
    // ✅ Solo dibuja si el método existe
    if (
        mascotaJugadorObjeto &&
        typeof mascotaJugadorObjeto.pintarMonsterment === "function"
    ) {
        mascotaJugadorObjeto.pintarMonsterment()
    } else {
        console.warn("mascotaJugadorObjeto no tiene pintarMonsterment:", mascotaJugadorObjeto)
    }

    // Dibujar enemigos + revisar colisión
    monstersEnemigos.forEach((enemigo) => {
        enemigo.pintarMonsterment()
        revisarColision(enemigo)
    })
}


//if (!mascotaJugadorObjeto) {
// Si por alguna razón aún no está definida, salimos
//   return
//}
//enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
//  revisarColision(monster)



function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/monster/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ x, y })
    })
        .then(function (res) {
            if (!res.ok) return

            return res.json()
        })
        .then(function (data) {
            if (!data) return

            const { enemigos = [] } = data

            monstersEnemigos = enemigos
                // descartar enemigos que todavía no tienen monster asignado
                .filter((enemigo) => enemigo.monster && enemigo.monster.nombre)
                .map(function (enemigo) {
                    console.log({ enemigo })

                    let monsterEnemigo = null
                    const monsterNombre = enemigo.monster.nombre

                    if (monsterNombre === "Watty") {
                        monsterEnemigo = new Monsterments("Watty", "./imagenes/Watty.jpg", 5, "./imagenes/Watty.jpg", enemigo.id)
                    } else if (monsterNombre === "Windy") {
                        monsterEnemigo = new Monsterments("Windy", "./imagenes/Windy.jpg", 5, "./imagenes/Windy.jpg", enemigo.id)
                    } else if (monsterNombre === "Dirty") {
                        monsterEnemigo = new Monsterments("Dirty", "./imagenes/Dirty.jpg", 5, "./imagenes/Dirty.jpg", enemigo.id)
                    } else if (monsterNombre === "Smokey") {
                        monsterEnemigo = new Monsterments("Smokey", "./imagenes/Smokey.jpg", 5, "./imagenes/Smokey.jpg", enemigo.id)
                    } else if (monsterNombre === "Wamokey") {
                        monsterEnemigo = new Monsterments("Wamokey", "./imagenes/Wamokey.jpg", 5, "./imagenes/Wamokey.jpg", enemigo.id)
                    } else if (monsterNombre === "Watirty") {
                        monsterEnemigo = new Monsterments("Watirty", "./imagenes/Watirty.jpg", 5, "./imagenes/Watirty.jpg", enemigo.id)
                    } else if (monsterNombre === "Wandy") {
                        monsterEnemigo = new Monsterments("Wandy", "./imagenes/Wandy.jpg", 5, "./imagenes/Wandy.jpg", enemigo.id)
                    }

                    // por seguridad, si no pudimos crear nada devolvemos null y luego lo filtramos
                    return monsterEnemigo
                })
                .filter((m) => m) // quitar nulls por si acaso
        })
        .catch((err) => {
            console.error("Error al obtener enemigos:", err)
        })
}


function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = - 5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = - 5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break;
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)  // ✅ FALTA PASAR EL PARÁMETRO
    console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", sePresionaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function jugadorTerminoDeElegir() {
    if (ataqueJugador.length === 5) {
        combateIniciado = false          // por si es una batalla nueva
        intervaloAtaques = setInterval(obtenerAtaques, 50)
    }
}

//function obtenerObjetoMascota() {
//   function obtenerObjetoMascota(nombreMascota) {
// Busca en el arreglo Monsters el objeto cuya propiedad nombre coincida
//     const monster = Monsters.find((m) => m.nombre === nombreMascota)
//      return monster || null
//    }

function revisarColision(enemigo) {
    // límites del enemigo
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    // límites de tu mascota
    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    // 👉 SI se cumple alguna de estas condiciones => NO hay colisión
    if (
        abajoMascota < arribaEnemigo || // la mascota está por arriba
        arribaMascota > abajoEnemigo || // la mascota está por abajo
        derechaMascota < izquierdaEnemigo || // la mascota está a la izquierda
        izquierdaMascota > derechaEnemigo    // la mascota está a la derecha
    ) {
        // No hay choque, seguimos pintando y moviendo
        return
    }
    console.log("enemigoId global ahora:", enemigoId)
    detenerMovimiento()
    clearInterval(intervalo)
    window.removeEventListener('keydown', sePresionaTecla)
    window.removeEventListener('keyup', detenerMovimiento)

    seleccionarMascotaEnemigo(enemigo)
    iniciarBatalla()
}

//    seleccionarMascotaEnemigo(enemigo)
//    enemigoId = enemigo.id
//    sectionVerMapa.style.display = "none"
//    sectionSeleccionarAtaque.style.display = "flex"
//}

window.addEventListener("load", iniciarJuego)
