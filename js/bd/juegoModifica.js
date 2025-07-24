import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaId } from "../modelo/validaId.js"
import { validaNombre } from "../modelo/validaNombre.js"
import { ALMACEN_VIDEOJUEGO, Bd } from "./Bd.js"
import { videojuegoBusca } from "./juegoBusca.js"

/**
 * @param { import("../modelo/VIDEOJUEGO.js").VIDEOJUEGO } modelo
 */
export async function videojuegoModifica(modelo) {
 validaNombre(modelo.JUE_NOMBRE)
 if (modelo.JUE_ID === undefined)
  throw new Error(`Falta JUE_ID de ${modelo.JUE_NOMBRE}.`)
 validaId(modelo.JUE_ID)
 const anterior = await videojuegoBusca(modelo.JUE_ID)
 if (anterior !== undefined) {
  modelo.JUE_MODIFICACION = Date.now()
  modelo.JUE_ELIMINADO = 0
  return bdEjecuta(Bd, [ALMACEN_VIDEOJUEGO], transaccion => {
   const almacenVideojuego = transaccion.objectStore(ALMACEN_VIDEOJUEGO)
   almacenVideojuego.put(modelo)
  })
 }
}

exportaAHtml(videojuegoModifica)
