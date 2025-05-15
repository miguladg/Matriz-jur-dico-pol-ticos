const API_URL = 'https://script.google.com/macros/s/AKfycbyZrl9ZfmqSa9BBJKmCVr9nUhfzwFLbM-32jIR16GabkWvHnzuWT8BUpN6WHGEeOOSmpQ/exec';

let datos = [];

window.onload = async function () {
  try {
    const response = await fetch(API_URL);
    datos = await response.json();
    prepararDatalist();
  } catch (error) {
    document.getElementById('resultados').innerHTML = '<p>⚠️ Error al cargar los datos.</p>';
    console.error('Error al cargar datos:', error);
  }

  document.getElementById('busqueda').addEventListener('keypress', function (e) {
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
    const citaCorta = citaCompleta.length > 200
      ? citaCompleta.substring(0, 200) + '...'
      : citaCompleta;

    const citaId = `cita-${index}`;
    const botonId = `boton-${index}`;
    const mostrarBoton = citaCompleta.length > 200;

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
  span.innerText = expandido ? textoCompleto.substring(0, 200) + '...' : textoCompleto;
  boton.innerText = expandido ? 'Ver más...' : 'Ver menos';
}

function prepararDatalist() {
  const datalist = document.getElementById('palabrasClaves');
  const palabrasSet = new Set();

  datos.forEach(item => {
    if (item.palabras) {
      item.palabras.split('\n').forEach(p => {
        const palabra = p.trim();
        if (palabra) palabrasSet.add(palabra);
      });
    }
  });

  [...palabrasSet].sort().forEach(palabra => {
    const option = document.createElement('option');
    option.value = palabra;
    datalist.appendChild(option);
  });
}
