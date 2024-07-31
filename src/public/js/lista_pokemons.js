document.addEventListener('DOMContentLoaded', function() {
    const rowsPerPage = 10; // Define cuántas filas se mostrarán por página
    let rows; // Variable para almacenar las filas de la tabla
    let currentPage = 1; // Página actual, empieza en 1
    let totalPages; // Total de páginas calculadas

    // Función para mostrar las filas correspondientes a la página actual
    function displayRows(page) {
        const start = (page - 1) * rowsPerPage; // Índice de inicio para las filas a mostrar
        const end = start + rowsPerPage; // Índice de fin para las filas a mostrar
        rows.forEach((row, index) => {
            row.style.display = (index >= start && index < end) ? '' : 'none'; // Muestra u oculta filas según el índice
        });
    }

    // Configura la paginación, manejando los botones 
    function setupPagination() {
        document.getElementById('prev').addEventListener('click', function(event) {
            event.preventDefault(); // Previene el comportamiento por defecto del enlace
            if (currentPage > 1) { // Si no estamos en la primera página
                currentPage--; // Retrocede una página
                displayRows(currentPage); // Muestra las filas de la nueva página
            }
        });

        document.getElementById('next').addEventListener('click', function(event) {
            event.preventDefault(); // Previene el comportamiento por defecto del enlace
            if (currentPage < totalPages) { // Si no estamos en la última página
                currentPage++; // Avanza una página
                displayRows(currentPage); // Muestra las filas de la nueva página
            }
        });
    }

    // Función asíncrona para obtener y mostrar una lista de Pokémon
    async function getlista() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1012'); // Solicita los datos de Pokémon
            const data = await response.json(); // Convierte la respuesta a JSON
            const lista = data.results; // Obtiene la lista de Pokémon
            const cuerpo = document.getElementById("cuerpo"); // Obtiene el cuerpo de la tabla donde se mostrarán los Pokémon

            // Crea una fila en la tabla para cada Pokémon
            lista.forEach((pokemon, index) => {
                const tr = document.createElement('tr'); // Crea una fila

                const numero = document.createElement('td'); // Crea una celda para el número
                numero.textContent = index + 1; // Asigna el número del Pokémon

                const nombre = document.createElement('td'); // Crea una celda para el nombre
                nombre.textContent = pokemon.name; // Asigna el nombre del Pokémon

                const imagen = document.createElement('td'); // Crea una celda para la imagen
                const img = document.createElement('img'); // Crea una imagen
                img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`; // Asigna la URL de la imagen del Pokémon
                imagen.appendChild(img); // Agrega la imagen a la celda

                tr.appendChild(numero); // Agrega la celda del número a la fila
                tr.appendChild(nombre); // Agrega la celda del nombre a la fila
                tr.appendChild(imagen); // Agrega la celda de la imagen a la fila

                cuerpo.appendChild(tr); // Agrega la fila al cuerpo de la tabla
            });

            rows = document.querySelectorAll('tbody tr'); // Selecciona todas las filas del cuerpo de la tabla
            totalPages = Math.ceil(rows.length / rowsPerPage); // Calcula el total de páginas
            displayRows(currentPage); // Muestra las filas de la primera página
            setupPagination(); // Configura la paginación

        } catch (error) {
            console.error(error); // Muestra errores en la consola
        }
    }

    getlista(); // Llama a la función para obtener y mostrar la lista de Pokémon
});
