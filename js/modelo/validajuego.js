/**
 * @param { any } objeto
 * @returns {import("./VIDEOJUEGO.js").VIDEOJUEGO}
 */
export function validaVideojuego(objeto) {

    if (typeof objeto.JUE_ID !== "string")
        throw new Error("El id debe ser texto.")

    if (typeof objeto.JUE_NOMBRE !== "string")
        throw new Error("El nombre debe ser texto.")

    if (typeof objeto.JUE_GENERO !== "string")
        throw new Error("El género debe ser texto.")

    if (typeof objeto.JUE_PLATAFORMA !== "string")
        throw new Error("La plataforma debe ser texto.")

    if (typeof objeto.JUE_MODIFICACION !== "number")
        throw new Error("El campo modificacion debe ser número.")

    if (typeof objeto.JUE_ELIMINADO !== "number")
        throw new Error("El campo eliminado debe ser número.")

    return objeto

}
