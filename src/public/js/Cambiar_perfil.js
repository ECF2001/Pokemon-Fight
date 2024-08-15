async function consultarUsuario() {
    try {
        const response = await fetch('http://localhost:3000/BajarUsuario', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json(); 

            // Actualiza los campos del formulario con los datos del usuario
            document.getElementById('textbox1').value = data.correo || '';
            document.getElementById('textbox2').value = data.nombre || '';
            document.getElementById('textbox3').value = data.primerApellido || '';
            document.getElementById('textbox4').value = data.segundoApellido || '';
            document.getElementById('usernameDisplay').textContent = data.nombreUsuario || '';
            document.getElementById('foto_perfil').src = data.profileImage || '';
            document.getElementById('foto_perfilGrande').src = data.profileImage || '';

        } else {
            alert('Error obteniendo datos del usuario');
        }
    } catch (error) {
        console.error('Error enviando solicitud:', error);
        alert('No se pudieron obtener los datos del usuario');
    }
}

// Llama a la función para cargar los datos al iniciar
window.addEventListener('load', consultarUsuario);


// Tu código existente para manejar la visibilidad del menú y guardar los datos del perfil
document.getElementById('foto_perfilGrande').addEventListener('click', function(event) {
    event.preventDefault();
    var menu = document.getElementById('profile-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

function changeProfileImage(imagePath) {
    document.getElementById('foto_perfil').src = imagePath;
    document.getElementById('foto_perfilGrande').src = imagePath;
    document.getElementById('profile-menu').style.display = 'none';
}

window.addEventListener('click', function(event) {
    var menu = document.getElementById('profile-menu');
    var profileImage = document.getElementById('foto_perfilGrande');
    if (event.target !== profileImage && !profileImage.contains(event.target) && event.target !== menu && !menu.contains(event.target)) {
        menu.style.display = 'none';
    }
});


document.getElementById('saveButton').addEventListener('click', async function() {
    const correo = document.getElementById('textbox1').value;
    const nombre = document.getElementById('textbox2').value;
    const primerApellido = document.getElementById('textbox3').value;
    const segundoApellido = document.getElementById('textbox4').value;
    const profileImage = document.getElementById('foto_perfil').src;

    // Remueve el prefijo de la URL si está presente
    const profileImagePath = profileImage.replace(window.location.origin + '/', '');

    // Validar formato de correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(correo)) {
        alert('Por favor, introduzca un correo electrónico válido.');
        return; // No continuar si el correo no es válido
    }

    const profileData = {
        correo: correo,
        nombre: nombre,
        primerApellido: primerApellido,
        segundoApellido: segundoApellido,
        profileImage: profileImagePath
    };

    try {
        const response = await fetch('http://localhost:3000/ActualizarUsuario', {
            method: 'POST', // Usa POST para enviar los datos
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
        });

        if (response.ok) {
            alert('Datos guardados con éxito');
        } else {
            alert('Error al guardar los datos');
        }
    } catch (error) {
        console.error('Error enviando solicitud:', error);
        alert('No se pudo guardar la información');
    }
});
