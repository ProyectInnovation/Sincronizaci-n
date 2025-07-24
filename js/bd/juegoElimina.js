import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { ALMACEN_VIDEOJUEGO, Bd } from "./Bd.js"
import { videojuegoBusca } from "./juegoBusca.js"

/**
 * @param { string } id
 */
export async function videojuegoElimina(id) {
 const modelo = await videojuegoBusca(id)
 if (modelo !== undefined) {
  modelo.JUE_MODIFICACION = Date.now()
  modelo.JUE_ELIMINADO = 1
  return bdEjecuta(Bd, [ALMACEN_VIDEOJUEGO], transaccion => {
   const almacenVideojuego = transaccion.objectStore(ALMACEN_VIDEOJUEGO)
   almacenVideojuego.put(modelo)
  })
 }
}

exportaAHtml(videojuegoElimina)
