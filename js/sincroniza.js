import { enviaJson } from "../lib/js/enviaJson.js"
import { exportaAHtml } from "../lib/js/exportaAHtml.js"
import { muestraError } from "../lib/js/muestraError.js"
import { videojuegoConsultaTodos } from "./bd/juegoConsultaTodos.js"
import { videojuegosReemplaza } from "./bd/juegoReemplaza.js"
import { esperaUnPocoYSincroniza } from "./esperaUnPocoYSincroniza.js"
import { validaVideojuegos } from "./modelo/validaJuegos.js"
import { renderiza } from "./renderiza.js"

/**
 * @param {HTMLUListElement} lista
 */
export async function sincroniza(lista) {
 try {
  if (navigator.onLine) {
   const todos = await videojuegoConsultaTodos()
   const respuesta = await enviaJson("srv/sincroniza.php", todos)
   const videojuegos = validaVideojuegos(respuesta.body)
   await videojuegosReemplaza(videojuegos)
   renderiza(lista, videojuegos)
  }
 } catch (error) {
  muestraError(error)
 }
 esperaUnPocoYSincroniza(lista)
}

exportaAHtml(sincroniza)
