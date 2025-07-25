<?php

require_once __DIR__ . "/../../lib/php/BAD_REQUEST.php";
require_once __DIR__ . "/../../lib/php/validaJson.php";
require_once __DIR__ . "/../../lib/php/ProblemDetails.php";
require_once __DIR__ . "/TABLA_VIDEOJUEGO.php";

function validaJuego($objeto)
{
  $objeto = validaJson($objeto);

  if (!isset($objeto->JUE_ID) || !is_string($objeto->JUE_ID))
    throw new ProblemDetails(
      status: BAD_REQUEST,
      title: "El id debe ser texto.",
      type: "/error/idincorrecto.html",
    );

  if (!isset($objeto->JUE_NOMBRE) || !is_string($objeto->JUE_NOMBRE))
    throw new ProblemDetails(
      status: BAD_REQUEST,
      title: "El nombre debe ser texto.",
      type: "/error/nombreincorrecto.html",
    );

  if (!isset($objeto->JUE_GENERO) || !is_string($objeto->JUE_GENERO))
    throw new ProblemDetails(
      status: BAD_REQUEST,
      title: "El género debe ser texto.",
      type: "/error/generoincorrecto.html",
    );

  if (!isset($objeto->JUE_PLATAFORMA) || !is_string($objeto->JUE_PLATAFORMA))
    throw new ProblemDetails(
      status: BAD_REQUEST,
      title: "La plataforma debe ser texto.",
      type: "/error/plataformaincorrecta.html",
    );

  if (!isset($objeto->JUE_MODIFICACION)  || !is_int($objeto->JUE_MODIFICACION))
    throw new ProblemDetails(
      status: BAD_REQUEST,
      title: "La modificación debe ser número.",
      type: "/error/modificacionincorrecta.html",
    );

  if (!isset($objeto->JUE_ELIMINADO) || !is_int($objeto->JUE_ELIMINADO))
    throw new ProblemDetails(
      status: BAD_REQUEST,
      title: "El campo eliminado debe ser entero.",
      type: "/error/eliminadoincorrecto.html",
    );

  return [
    JUE_ID => $objeto->JUE_ID,
    JUE_NOMBRE => $objeto->JUE_NOMBRE,
    JUE_GENERO => $objeto->JUE_GENERO,
    JUE_PLATAFORMA => $objeto->JUE_PLATAFORMA,
    JUE_MODIFICACION => $objeto->JUE_MODIFICACION,
    JUE_ELIMINADO => $objeto->JUE_ELIMINADO
  ];
}
