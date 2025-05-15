const HOJA_ID = '1X05lwQReZFPxpAVqVB7oREFhjz5WnvAsFpXrttoWVQY';
const NOMBRE_HOJA = 'Matriz jurídico-políticos';

/**
 * Punto de entrada HTTP GET
 */
function doGet(e) {
  if (e && e.parameter) {
    if (e.parameter.ultimo === 'true') {
      return respuestaJson(obtenerUltimoDato());
    } else if (e.parameter.fecha === 'true') {
      return respuestaJson({ ultimaActualizacion: obtenerFechaUltimaModificacion() });
    }
  }

  return respuestaJson(obtenerTodaLaMatriz());
}

/**
 * Devuelve todas las filas de la hoja de cálculo
 */
function obtenerTodaLaMatriz() {
  const hoja = SpreadsheetApp.openById(HOJA_ID).getSheetByName(NOMBRE_HOJA);
  const datos = hoja.getDataRange().getValues();
  const resultados = [];

  for (let i = 2; i < datos.length; i++) { // Saltar encabezados (fila 3 en adelante)
    const fila = datos[i];
    resultados.push(procesarFila(fila));
  }

  return resultados;
}

/**
 * Devuelve solo la última fila con datos
 */
function obtenerUltimoDato() {
  const hoja = SpreadsheetApp.openById(HOJA_ID).getSheetByName(NOMBRE_HOJA);
  const ultimaFila = hoja.getLastRow();
  const fila = hoja.getRange(ultimaFila, 1, 1, hoja.getLastColumn()).getValues()[0];
  return procesarFila(fila);
}

/**
 * Devuelve la fecha de la última actualización del archivo
 */
function obtenerFechaUltimaModificacion() {
  const archivo = DriveApp.getFileById(HOJA_ID);
  return archivo.getLastUpdated();
}

/**
 * Procesa una fila individual a formato de objeto
 */
function procesarFila(fila) {
  return {
    tema: fila[0],           // Columna A
    tipo: fila[1],           // Columna B
    nombre: fila[2],         // Columna C
    link: fila[3],           // Columna D
    articulo: fila[4],       // Columna E
    nucleo: fila[5],         // Columna F
    titulo1: fila[9],        // Columna J
    subtitulo: fila[10],     // Columna K
    titulo2: fila[11],       // Columna L
    criterio: fila[12],      // Columna M
    Cita_textual: fila[14],  // Columna O
    descripcion: fila[15],   // Columna P
    palabras: fila[16]       // Columna Q
  };
}

/**
 * Devuelve una respuesta en formato JSON
 */
function respuestaJson(datos) {
  return ContentService
    .createTextOutput(JSON.stringify(datos))
    .setMimeType(ContentService.MimeType.JSON);
}
