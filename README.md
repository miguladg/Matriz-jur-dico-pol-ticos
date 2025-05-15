# 📚 Buscador Jurídico-Político

Este proyecto es una herramienta web que permite consultar y filtrar registros jurídicos y políticos extraídos de una matriz alojada en Google Sheets. El objetivo es facilitar el acceso a criterios, documentos normativos y descripciones mediante una interfaz sencilla y funcional.

---

## 🧱 Estructura del Proyecto

- **`index.html`**: Página principal del buscador.
- **`app.js`**: Lógica de frontend que obtiene, filtra y muestra los datos.
- **`manual.html`**: Manual de usuario para orientación general.
- **Google Apps Script (`Code.gs`)**: Sirve como API REST desde Google Sheets.

---

## 🚀 Funcionalidad principal

### 🔍 Búsqueda de registros
- El usuario puede buscar por palabra clave.
- El sistema muestra resultados coincidentes con detalles como título, tipo, criterio, cita textual, etc.
- Se incluye opción para expandir citas largas (“Ver más…”).

### 🕒 Fecha de actualización
- Se muestra automáticamente la última vez que el archivo fue modificado en Google Drive.

### 📘 Manual de usuario
- Disponible vía `manual.html` o enlace dentro de la interfaz.

---

## 🧠 Tecnologías utilizadas

- **HTML5 + CSS3**
- **JavaScript (vanilla)**
- **Google Apps Script**
- **Google Sheets como base de datos**

---

## 🔗 API pública (Apps Script)

El backend expone los siguientes endpoints:

- `/exec`: Todos los registros
- `/exec?ultimo=true`: Último registro
- `/exec?fecha=true`: Fecha de última modificación

> 📌 Ejemplo:  
> `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?fecha=true`

---

## 📄 Agregar nuevos datos

1. Abre el Google Sheet:  
   `https://docs.google.com/spreadsheets/d/1X05lwQReZFPxpAVqVB7oREFhjz5WnvAsFpXrttoWVQY/edit`

2. Agrega nuevos registros a partir de la fila 3.
3. Cada columna representa un campo relevante del registro (ver columnas en el manual o Apps Script).

---

## 🧰 Desarrolladores

### 🛠️ Cómo mantener el sistema

- Actualiza el archivo `Code.gs` para reflejar cambios en el esquema de la hoja.
- Reemplaza `API_URL` en `app.js` si cambias el ID del despliegue del Apps Script.
- Añade columnas nuevas tanto en el Google Sheet como en el procesamiento (`procesarFila` y frontend).
- Para extender funcionalidades, considera filtros por campo o paginación.

---

## 📞 Contacto

**Equipo de Innovación Legal y Política**  
📧 contacto@ejemplo.com

---

## 📄 Licencia

Uso institucional interno. Todos los derechos reservados © 2025.
