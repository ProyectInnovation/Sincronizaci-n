<?php

class Bd
{
  private static ?PDO $pdo = null;

  static function pdo(): PDO
  {
    if (self::$pdo === null) {

      self::$pdo = new PDO(
        // cadena de conexión
        "sqlite:sincronizacion.db",
        // usuario
        null,
        // contraseña
        null,
        // Opciones: pdos no persistentes y lanza excepciones.
        [PDO::ATTR_PERSISTENT => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
      );

      self::$pdo->exec(
        "CREATE TABLE IF NOT EXISTS VIDEOJUEGO (
      JUE_ID TEXT NOT NULL,
      JUE_NOMBRE TEXT NOT NULL,
      JUE_GENERO TEXT NOT NULL,
      JUE_PLATAFORMA TEXT NOT NULL,
      JUE_MODIFICACION INTEGER NOT NULL,
      JUE_ELIMINADO INTEGER NOT NULL,
      CONSTRAINT JUE_PK
       PRIMARY KEY(JUE_ID),
      CONSTRAINT JUE_NOM_UNQ
       UNIQUE(JUE_NOMBRE),
      CONSTRAINT JUE_NOM_NV
       CHECK(LENGTH(JUE_NOMBRE) > 0)
     )"
      );
    }

    return self::$pdo;
  }
}
