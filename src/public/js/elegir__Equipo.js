let mostrar = 1;

function carrousel() {
    const caja1 = document.querySelector('.caja_1');
    const caja2 = document.querySelector('.caja_2');
    

    if (mostrar === 1) {
        caja1.style.display = 'block';
        caja2.style.display = 'none';
    
        
        mostrar = 0;
    } else {
        caja1.style.display = 'none';
        caja2.style.display = 'block';
        
        mostrar = 1;
    }
}


