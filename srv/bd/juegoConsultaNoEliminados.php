<?php

require_once __DIR__ . "/../../lib/php/select.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_VIDEOJUEGO.php";

/**
 * @return array{
 *   JUE_ID: string,
 *   JUE_NOMBRE: string,
 *   JUE_GENERO: string,
 *   JUE_PLATFORMA: string,
 *   JUE_MODIFICACION: int,
 *   JUE_ELIMINADO: int
 *  }[]
 */
function juegoConsultaNoEliminados()
{
 return select(
  pdo: Bd::pdo(),
  from: VIDEOJUEGO,
  where: [JUE_ELIMINADO => 0],
  orderBy: JUE_NOMBRE
 );
}
