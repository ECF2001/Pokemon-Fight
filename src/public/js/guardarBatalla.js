async function guardarBatalla(datosBatalla) {
    try {
        const respuesta = await fetch('/api/batallas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosBatalla),
        });
        if (!respuesta.ok) {
            throw new Error('Error al guardar la batalla');
        }
        const datos = await respuesta.json();
        console.log('Batalla guardada:', datos);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Ejemplo de uso
const datosBatalla = {
    idBatalla: 'id_de_batalla',
    nombreUsuario1: 'usuario1',
    nombreEquipo1: 'equipo1',
    nombreUsuario2: 'usuario2',
    nombreEquipo2: 'equipo2',
    nombreUsuarioVencedor: 'usuario_vencedor'
};

guardarBatalla(datosBatalla);