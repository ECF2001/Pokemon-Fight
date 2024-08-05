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
