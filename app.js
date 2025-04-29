const API_URL = 'https://script.googleusercontent.com/a/macros/movilidadbogota.gov.co/echo?user_content_key=AehSKLhb5zuhgkeaZ9NjQreihoK2RyHwlZWsimYOXn4wO7nk66kj6fA7gCOc9HAJ04A5xONXiLlcReqBRF-9uHVL_W5lwx69bNulTVwD3n7GB_uRqerpOEx60OB2IesE6Oyd1egKm8Ai-Ccrz1l_olN07HGiREMAiN8-M78a1oDszW-wcaJc202licZSNtuLg7OUwhonyr-v4h8pCcxfqbTZUVhCCq8zWBjOAKA1v3zjZkxXG6QJMGjIlp38YYh5cpcS2Azj3Bq6WFX37M_IQx9UqLP1CPD2whybdnU0CJFzjClSKgukQLO_UNqEhRNyUgygIhem56Ra&lib=MkGBoayCfw7WB5Jg8ogz5i2yJe74qvHP_';

let datos = [];

window.onload = async function () {
  try {
    const response = await fetch(API_URL);
    datos = await response.json();
    prepararAutocompletado();
  } catch (error) {
    document.getElementById('resultados').innerHTML = '<p>⚠️ Error al cargar los datos.</p>';
    console.error('Error al cargar datos:', error);
  }

  // Activar búsqueda con Enter
  const inputBusqueda = document.getElementById('busqueda');
  inputBusqueda.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('botonBuscar').click();
    }
  });
};

function buscar() {
  const palabra = document.getElementById('busqueda').value.trim().toLowerCase();
  const contenedor = document.getElementById('resultados');
  contenedor.innerHTML = '';
  document.getElementById('sugerencias').innerHTML = '';

  if (!palabra) {
    contenedor.innerHTML = '<p>⚠️ Por favor ingresa una palabra clave para buscar.</p>';
    return;
  }

  const resultados = datos.filter(item =>
    Object.values(item).some(valor =>
      typeof valor === 'string' && valor.toLowerCase().includes(palabra)
    )
  );

  if (resultados.length === 0) {
    contenedor.innerHTML = '<p>❌ No se encontraron resultados.</p>';
    return;
  }

  resultados.forEach((r, index) => {
    const div = document.createElement('div');
    div.className = 'resultado';

    const citaCompleta = r.Cita_textual || '';
    const citaCorta = citaCompleta.length > 300
      ? citaCompleta.substring(0, 300) + '...'
      : citaCompleta;

    const citaId = `cita-${index}`;
    const botonId = `boton-${index}`;
    const mostrarBoton = citaCompleta.length > 300;

    div.innerHTML = `
      <h3>${r.nombre || 'Sin título'}</h3>
      <p><strong>📄 Tipo:</strong> ${r.tipo || ''}</p>
      <p><strong>📌 Tema:</strong> ${r.tema || ''}</p>
      <p><strong>🔖 Título 1:</strong> ${r.titulo1 || ''}</p>
      <p><strong>🔖 Subtítulo:</strong> ${r.subtitulo || ''}</p>
      <p><strong>🔖 Título 2:</strong> ${r.titulo2 || ''}</p>
      <p><strong>🔎 Criterio:</strong> ${r.criterio || ''}</p>
      <p><strong>🔎 Núcleo:</strong> ${r.nucleo || ''}</p>
      <p><strong>📑 Artículo:</strong> ${r.articulo || ''}</p>
      <p><strong>📝 Aporte:</strong> <span class="justificado">${r.descripcion || ''}</span></p>
      <p><strong>📝 Cita:</strong> <span id="${citaId}" class="justificado">${citaCorta}</span>
        ${mostrarBoton ? `<br><button id="${botonId}" onclick="toggleCita('${citaId}', '${botonId}', \`${citaCompleta.replace(/`/g, '\\`')}\`)">Ver más...</button>` : ''}
      </p>
      ${r.link ? `<p><a href="${r.link}" target="_blank">🔗 Ver documento</a></p>` : ''}
    `;
    contenedor.appendChild(div);
  });
}

function toggleCita(idTexto, idBoton, textoCompleto) {
  const span = document.getElementById(idTexto);
  const boton = document.getElementById(idBoton);
  const expandido = boton.innerText === 'Ver menos';
  span.innerText = expandido ? textoCompleto.substring(0, 300) + '...' : textoCompleto;
  boton.innerText = expandido ? 'Ver más...' : 'Ver menos';
}

// Función de autocompletado
function prepararAutocompletado() {
  const input = document.getElementById('busqueda');
  const sugerenciasDiv = document.getElementById('sugerencias');

  input.addEventListener('input', function () {
    const texto = this.value.toLowerCase();
    sugerenciasDiv.innerHTML = '';

    if (texto.length < 2) return;

    const sugerencias = datos
      .flatMap(item => [item.nombre, item.tema, item.titulo1, item.subtitulo, item.titulo2, item.criterio, item.nucleo, item.palabras])
      .filter(Boolean)
      .filter(textoCampo => textoCampo.toLowerCase().includes(texto))
      .slice(0, 10); // Máximo 10 sugerencias

    sugerencias.forEach(s => {
      const div = document.createElement('div');
      div.className = 'autocomplete-suggestion';
      div.textContent = s;
      div.onclick = function () {
        input.value = s;
        sugerenciasDiv.innerHTML = '';
        buscar();
      };
      sugerenciasDiv.appendChild(div);
    });
  });
}
