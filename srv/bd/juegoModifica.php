<?php

require_once __DIR__ . "/../../lib/php/validaNombre.php";
require_once __DIR__ . "/../../lib/php/update.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_VIDEOJUEGO.php";
require_once __DIR__ . "/../modelo/validaId.php";

/**
 * @param array{
 *   JUE_ID: string,
 *   JUE_NOMBRE: string,
 *   JUE_GENERO: string,
 *   JUE_PLATFORMA: string,
 *   JUE_MODIFICACION: int,
 *   JUE_ELIMINADO: int
 *  } $modelo
 */
function juegoModifica(array $modelo)
{
 validaId($modelo[JUE_ID]);
 validaNombre($modelo[JUE_NOMBRE]);
 validaNombre($modelo[JUE_GENERO]);
 validaNombre($modelo[JUE_PLATAFORMA]);
 update(
  pdo: Bd::pdo(),
  table: VIDEOJUEGO,
  set: $modelo,
  where: [JUE_ID => $modelo[JUE_ID]]
 );
}
