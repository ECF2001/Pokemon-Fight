let mostrar = 1;

function carrousel() {
    const caja1 = document.querySelector('.caja_1');
    const caja2 = document.querySelector('.caja_2');
    transicion = document.querySelector('caja_1.mostrar',
        'caja_2.mostrar'); 

    if (mostrar === 1) {
        caja1.style.display = 'block';
        caja2.style.display = 'none';
        transicion = 'none';
        
        mostrar = 0;
    } else {
        caja1.style.display = 'none';
        caja2.style.display = 'block';
        transicion = 'none';
        mostrar = 1;
    }
}


