<?php
require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaJson.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/../lib/php/ProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveErrorInterno.php";
require_once __DIR__ . "/modelo/TABLA_VIDEOJUEGO.php";
require_once __DIR__ . "/modelo/validaJuego.php";
require_once __DIR__ . "/bd/juegoAgregar.php";
require_once __DIR__ . "/bd/juegoBusca.php";
require_once __DIR__ . "/bd/juegoConsultaNoEliminados.php";
require_once __DIR__ . "/bd/juegoModifica.php";

ejecutaServicio(function () {

 $lista = recuperaJson();

 if (!is_array($lista)) {
  $lista = [];
 }

 foreach ($lista as $modelo) {
  $modeloEnElCliente = validaJuego($modelo);
  $modeloEnElServidor = juegoBusca($modeloEnElCliente[JUE_ID]);

  if ($modeloEnElServidor === false) {

   /* CONFLICTO: El modelo no ha estado en el servidor.
    * AGREGARLO solamente si no está eliminado. */
   if ($modeloEnElCliente[JUE_ELIMINADO] === 0) {
    juegoAgrega($modeloEnElCliente);
   }
  } elseif (
   $modeloEnElServidor[JUE_ELIMINADO] === 0
   && $modeloEnElCliente[JUE_ELIMINADO] === 1
  ) {

   /* CONFLICTO: El registro está en el servidor, donde no se ha eliminado, pero
    * ha sido eliminado en el cliente.
    * Gana el cliente, porque optamos por no revivir lo eliminado. */
   juegoModifica($modeloEnElCliente);
  } else if (
   $modeloEnElCliente[JUE_ELIMINADO] === 0
   && $modeloEnElServidor[JUE_ELIMINADO] === 0
  ) {

   /* CONFLICTO: Registros en el servidor y en el cliente. Pueden ser
    * diferentes.
    * GANA FECHA MÁS GRANDE. Cuando gana el servidor, no se hace nada. */
   if (
    $modeloEnElCliente[JUE_MODIFICACION] >
    $modeloEnElServidor[JUE_MODIFICACION]
   ) {
    // La versión del cliente es más nueva y prevalece.
    juegoModifica($modeloEnElCliente);
   }
  }
 }

 $lista = juegoConsultaNoEliminados();

 devuelveJson($lista);
});
