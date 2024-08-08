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
    var profileImage = document.getElementById('foto_perfil').src;

    // Remueve el prefijo de la URL si está presente
    profileImage = profileImage.replace(window.location.origin + '/', '');

    var profileData = {
        email: email,
        password: password, // Guarda la contraseña real
        name: name,
        identificacion: identificacion,
        profileImage: profileImage
    };

    console.log('Datos del perfil guardados:', profileData);
    alert('Datos guardados con éxito');

    // Actualiza el contenido del <p> con el nombre ingresado
    document.getElementById('profile-name').textContent = name;
    
    // Actualiza la foto de perfil en el header
    document.getElementById('foto_perfil').src = profileImage;
});