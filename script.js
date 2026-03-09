const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (e) {
    if (!validaciones()) {
        e.preventDefault(); 
    }
});


function validaciones() {

    limpiarValidaciones();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (nombre.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        mostrarValidaciones(
            'nombre',
            'El nombre debe ser alfabético y mínimo dos caracteres'
        );
        return false;
    }

    if (apellido.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido)) {
        mostrarValidaciones(
            'apellido',
            'El apellido debe ser alfabético y mínimo dos caracteres'
        );
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarValidaciones(
            'email',
            'Por favor ingresa un email válido'
        );
        return false;
    }

    if (mensaje.length < 10) {
        mostrarValidaciones(
            'mensaje',
            'El mensaje debe tener al menos 10 caracteres'
        );
        return false;
    }

    mostrarAlerta(
        'success',
        '<strong>¡Éxito!</strong> Todos los campos son válidos. Enviando formulario...'
    );

    return true; 
}


function mostrarValidaciones(id, mensaje) {
    const field = document.getElementById(id);
    const formFloating = field.closest('.form-floating');

    const errorElement = document.createElement('div');
    errorElement.className = 'error-message text-danger mt-1 small';
    errorElement.textContent = mensaje;

    formFloating.appendChild(errorElement);
    field.classList.add('is-invalid');
}

function limpiarValidaciones() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
}

function mostrarAlerta(tipo, mensaje) {
    const alertContainer = document.getElementById('alertContainer');

    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.role = 'alert';
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    alertContainer.innerHTML = '';
    alertContainer.appendChild(alerta);
}

window.addEventListener("load", () => {
    const formulario = document.getElementById("formulario");
    if (formulario) {
        formulario.reset();
    }
});