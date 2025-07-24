export const ALMACEN_VIDEOJUEGO = "VIDEOJUEGO"
export const JUE_ID = "JUE_ID"
export const INDICE_NOMBRE = "INDICE_NOMBRE"
export const JUE_NOMBRE = "JUE_NOMBRE"
export const JUE_GENERO = "JUE_GENERO"
export const JUE_PLATAFORMA = "JUE_PLATAFORMA"
const BD_NOMBRE = "sincronizacion"
const BD_VERSION = 1

/** @type { Promise<IDBDatabase> } */
export const Bd = new Promise((resolve, reject) => {

 /* Se solicita abrir la base de datos, indicando nombre y
  * número de versión. */
 const solicitud = indexedDB.open(BD_NOMBRE, BD_VERSION)

 // Si se presenta un error, rechaza la promesa.
 solicitud.onerror = () => reject(solicitud.error)

 // Si se abre con éxito, devuelve una conexión a la base de datos.
 solicitud.onsuccess = () => resolve(solicitud.result)

 // Si es necesario, se inicia una transacción para cambio de versión.
 solicitud.onupgradeneeded = () => {

  const bd = solicitud.result

  // Como hay cambio de versión, borra el almacén si es que existe.
  if (bd.objectStoreNames.contains(ALMACEN_VIDEOJUEGO)) {
   bd.deleteObjectStore(ALMACEN_VIDEOJUEGO)
  }

  // Crea el almacén "VIDEOJUEGO" con el campo llave "JUE_ID".
  const almacenVideojuego =
   bd.createObjectStore(ALMACEN_VIDEOJUEGO, { keyPath: JUE_ID })

  // Crea un índice ordenado por el campo "JUE_NOMBRE" que no acepta duplicados.
  almacenVideojuego.createIndex(INDICE_NOMBRE, "JUE_NOMBRE")

  // Crea índices adicionales para "JUE_GENERO" y "JUE_PLATAFORMA"
  almacenVideojuego.createIndex(JUE_GENERO, "JUE_GENERO")
  almacenVideojuego.createIndex(JUE_PLATAFORMA, "JUE_PLATAFORMA")
 }

})
