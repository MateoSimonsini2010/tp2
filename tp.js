const cuerpo = document.body;
const articulo = document.querySelector('main');
const subtitulos = document.querySelectorAll('main h2');
const listaIndice = document.querySelector('#lista-indice');
const botonModo = document.querySelector('#boton-modo');
const botonesTamano = document.querySelectorAll('.boton-tamano');
const formulario = document.querySelector('#form-comentario');
const campoNombre = document.querySelector('#campo-nombre');
const campoComentario = document.querySelector('#campo-comentario');
const contador = document.querySelector('#contador');
const avisoFormulario = document.querySelector('#aviso-formulario');
const listaComentarios = document.querySelector('#lista-comentarios');
 
const MINIMO = 10;
const MAXIMO = 200;

//   1. ÍNDICE AUTOMÁTICO
subtitulos.forEach(function (subtitulo) {
    const item = document.createElement('li');
    const enlace = document.createElement('a');
    enlace.href = `#${subtitulo.id}`;
    enlace.textContent = subtitulo.textContent.trim();
    item.append(enlace);
    listaIndice.append(item);
});

//   2. MODO OSCURO
botonModo.addEventListener('click', function () {
    cuerpo.classList.toggle('modo-oscuro');
    if (cuerpo.classList.contains('modo-oscuro')) {
        botonModo.textContent = 'Modo claro';
    } else {
        botonModo.textContent = 'Modo oscuro';
    }
});

//   3. PANEL APARIENCIA 
botonesTamano.forEach(function (boton) {
    boton.addEventListener('click', function () {
        articulo.classList.remove('texto-pequeno');
        articulo.classList.remove('texto-estandar');
        articulo.classList.remove('texto-grande');
        articulo.classList.add(boton.getAttribute('data-clase'));
        botonesTamano.forEach(function (otroBoton) {
            otroBoton.classList.remove('activo');
        });
        boton.classList.add('activo');
    });
});

//   4. SECCIONES PLEGABLES
subtitulos.forEach(function (subtitulo) {
    subtitulo.addEventListener('click', function () {
        subtitulo.parentElement.classList.toggle('plegada');
    });
});

//   5. DISCUSIÓN 
campoComentario.addEventListener('input', function () {
    actualizarContador();
});
campoComentario.addEventListener('input', actualizarContador);

//   6. DISCUSIÓN 
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    avisoFormulario.textContent = '';
    avisoFormulario.classList.remove('aviso-error');
    campoNombre.classList.remove('campo-invalido');
    campoComentario.classList.remove('campo-invalido');
    const nombre = campoNombre.value.trim();
    const comentario = campoComentario.value.trim();
    if (nombre === '') {
        avisoFormulario.textContent = 'El nombre no puede estar vacío';
        avisoFormulario.classList.add('aviso-error');
        campoNombre.classList.add('campo-invalido');
        return;
    }
    if (comentario.length < MINIMO || comentario.length > MAXIMO) {
        avisoFormulario.textContent = `El comentario debe tener entre ${MINIMO} y ${MAXIMO} caracteres`;
        avisoFormulario.classList.add('aviso-error');
        campoComentario.classList.add('campo-invalido');
        return;
    }
    crearComentario(nombre, comentario);
    formulario.reset();
    actualizarContador();
});

//   7. DISCUSIÓN 
listaComentarios.addEventListener('click', function (e) {
    if (e.target.classList.contains('boton-borrar')) {
        e.target.parentElement.remove();
    }
});

function crearComentario(nombre, texto) {
    const item = document.createElement('li');
    item.classList.add('comentario');
    const autor = document.createElement('strong');
    autor.textContent = nombre; 
    autor.classList.add('comentario-autor');
    const contenido = document.createElement('p');
    contenido.textContent = texto;
    contenido.classList.add('comentario-texto');
    const borrar = document.createElement('button');
    borrar.textContent = 'Borrar';
    borrar.classList.add('boton-borrar');
    item.append(autor);
    item.append(contenido);
    item.append(borrar);
    listaComentarios.append(item);
}

function actualizarContador() {
    const usados = campoComentario.value.length;
    contador.textContent = `${usados} / ${MAXIMO}`;
    if (usados > MAXIMO) {
        contador.classList.add('contador-excedido');
    } else {
        contador.classList.remove('contador-excedido');
    }
}