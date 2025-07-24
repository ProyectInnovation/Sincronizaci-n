<?php

require_once __DIR__ . "/../../lib/php/selectFirst.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_VIDEOJUEGO.php";

/**
 * @return false | array{
 *   PAS_ID: string,
 *   JUE_NOMBRE: string,
 *   JUE_GENERO: string,
 *   JUE_PLATFORMA: string,
 *   JUE_MODIFICACION: int,
 *   JUE_ELIMINADO: int
 *  }
 */
function juegoBusca(string $id): false|array
{
 return selectFirst(
  pdo: Bd::pdo(),
  from: VIDEOJUEGO,
  where: [JUE_ID => $id]
 );
}
