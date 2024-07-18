document.addEventListener('DOMContentLoaded', function() {
    const rowsPerPage = 10;
    let rows;
    let currentPage = 1;
    let totalPages;

    function displayRows(page) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        rows.forEach((row, index) => {
            row.style.display = (index >= start && index < end) ? '' : 'none';
        });
    }

    function setupPagination() {
        document.getElementById('prev').addEventListener('click', function(event) {
            event.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                displayRows(currentPage);
            }
        });

        document.getElementById('next').addEventListener('click', function(event) {
            event.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                displayRows(currentPage);
            }
        });
    }

    async function getlista() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1012');
            const data = await response.json();
            const lista = data.results;
            const cuerpo = document.getElementById("cuerpo");

            lista.forEach((pokemon, index) => {
                const tr = document.createElement('tr');
                
                const numero = document.createElement('td');
                numero.textContent = index + 1;

                const nombre = document.createElement('td');
                nombre.textContent = pokemon.name;

                const imagen = document.createElement('td');
                const img = document.createElement('img');
                img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
                imagen.appendChild(img);

                tr.appendChild(numero);
                tr.appendChild(nombre);
                tr.appendChild(imagen);

                cuerpo.appendChild(tr);
            });

            rows = document.querySelectorAll('tbody tr');
            displayRows(1);
            setupPagination();

        } catch (error) {
            console.error(error);
        }
    }

    getlista();
});
