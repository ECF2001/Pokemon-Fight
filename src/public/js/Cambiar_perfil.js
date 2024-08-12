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
document.getElementById('saveButton').addEventListener('click', function() {
    var email = document.getElementById('textbox1').value;
    var password = document.getElementById('textbox2').value;
    var name = document.getElementById('textbox3').value;
    var identificacion = document.getElementById('textbox4').value;
    var username = document.getElementById('textbox5').value;
    var profileImage = document.getElementById('foto_perfil').src;

    // Remueve el prefijo de la URL si está presente
    profileImage = profileImage.replace(window.location.origin + '/', '');

    // Validar formato de correo electrónico
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, introduzca un correo electrónico válido.');
        return; // No continuar si el correo no es válido
    }

    // Validar longitud de la contraseña
    if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return; // No continuar si la contraseña es demasiado corta
    }

    var profileData = {
        email: email,
        password: password,
        name: name,
        identificacion: identificacion,
        username: username, 
        profileImage: profileImage
    };

    console.log('Datos del perfil guardados:', profileData);
    alert('Datos guardados con éxito'); 
    // Actualiza la foto de perfil en el header
    document.getElementById('foto_perfil').src = profileImage;
});
