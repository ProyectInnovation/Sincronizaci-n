import { validaVideojuego } from "./validajuego.js"

/**
 * @param { any } objetos
 * @returns {import("./VIDEOJUEGO.js").VIDEOJUEGO[]}
 */
export function validaVideojuegos(objetos) {
 if (!Array.isArray(objetos))
  throw new Error("no se recibió un arreglo.")
 /**
  * @type {import("./VIDEOJUEGO.js").VIDEOJUEGO[]}
  */
 const arreglo = []
 for (const objeto of objetos) {
  arreglo.push(validaVideojuego(objeto))
 }
 return arreglo
}
