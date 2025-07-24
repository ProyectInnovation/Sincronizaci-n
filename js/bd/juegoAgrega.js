import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { creaIdCliente } from "../../lib/js/creaIdCliente.js"
import { ALMACEN_VIDEOJUEGO, Bd } from "./Bd.js"
import { validaNombre } from "../modelo/validaNombre.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"

/**
 * @param {import("../modelo/VIDEOJUEGO.js").VIDEOJUEGO} modelo
 */
export async function videojuegoAgrega(modelo) {
 validaNombre(modelo.JUE_NOMBRE)
 modelo.JUE_MODIFICACION = Date.now()
 modelo.JUE_ELIMINADO = 0
 // Genera id único en internet.
 modelo.JUE_ID = creaIdCliente(Date.now().toString())
 return bdEjecuta(Bd, [ALMACEN_VIDEOJUEGO], transaccion => {
  const almacenVideojuego = transaccion.objectStore(ALMACEN_VIDEOJUEGO)
  almacenVideojuego.add(modelo)
 })
}

exportaAHtml(videojuegoAgrega)
