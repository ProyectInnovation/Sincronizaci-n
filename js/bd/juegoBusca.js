import { bdConsulta } from "../../lib/js/bdConsulta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaVideojuego } from "../modelo/validajuego.js"
import { ALMACEN_VIDEOJUEGO, Bd } from "./Bd.js"

/**
 * @param {string} id
 */
export async function videojuegoBusca(id) {

 return bdConsulta(Bd, [ALMACEN_VIDEOJUEGO],
  /**
   * @param {(resultado: import("../modelo/VIDEOJUEGO.js").VIDEOJUEGO|undefined)
   *                                                            => any} resolve 
   */
  (transaccion, resolve) => {

   /* Pide el primer objeto de ALMACEN_VIDEOJUEGO que tenga como llave
    * primaria el valor del parámetro id. */
   const consulta = transaccion.objectStore(ALMACEN_VIDEOJUEGO).get(id)

   // onsuccess se invoca solo una vez, devolviendo el objeto solicitado.
   consulta.onsuccess = () => {
    /* Se recupera el objeto solicitado usando
     *  consulta.result
     * Si el objeto no se encuentra se recupera undefined. */
    const objeto = consulta.result
    if (objeto !== undefined) {
     const modelo = validaVideojuego(objeto)
     if (modelo.JUE_ELIMINADO === 0) {
      resolve(modelo)
      return
     }
    }
    resolve(undefined)

   }

  })

}

exportaAHtml(videojuegoBusca)
