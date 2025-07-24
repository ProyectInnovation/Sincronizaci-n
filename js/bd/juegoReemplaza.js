import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { ALMACEN_VIDEOJUEGO, Bd } from "./Bd.js"

/**
 * Borra el contenido del almacén VIDEOJUEGO y guarda nuevos videojuegos.
 * @param {import("../modelo/VIDEOJUEGO.js").VIDEOJUEGO[]} nuevosVideojuegos
 */
export async function videojuegosReemplaza(nuevosVideojuegos) {
 return bdEjecuta(Bd, [ALMACEN_VIDEOJUEGO], transaccion => {
  const almacenVideojuego = transaccion.objectStore(ALMACEN_VIDEOJUEGO)
  almacenVideojuego.clear()
  for (const objeto of nuevosVideojuegos) {
   almacenVideojuego.add(objeto)
  }
 })
}
