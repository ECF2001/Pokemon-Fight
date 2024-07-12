document.addEventListener('DOMContentLoaded', function () {
    const filas = document.querySelectorAll('.decoracionTabla');

    filas.forEach(function (fila) {
        fila.addEventListener('click', function () {
            filas.forEach(function (f) {
                f.classList.remove('seleccionada');
            });

            fila.classList.add('seleccionada');
        });
    });
});