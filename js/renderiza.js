import { exportaAHtml } from "../lib/js/exportaAHtml.js"
import { htmlentities } from "../lib/js/htmlentities.js"

/**
 * @param {HTMLUListElement} lista
 * @param {import("./modelo/VIDEOJUEGO.js").VIDEOJUEGO[]} videojuegos
 */
export function renderiza(lista, videojuegos) {
 let render = ""
 for (const modelo of videojuegos) {
  if (modelo.JUE_ID === undefined)
   throw new Error(`Falta JUE_ID de ${modelo.JUE_NOMBRE}.`)
  const nombre = htmlentities(modelo.JUE_NOMBRE)
  const searchParams = new URLSearchParams([["id", modelo.JUE_ID]])
  const params = htmlentities(searchParams.toString())
  render += /* html */
   `<li>
     <p><a href="modifica.html?${params}">${nombre}</a></p>
    </li>`
 }
 lista.innerHTML = render
}

exportaAHtml(renderiza)
