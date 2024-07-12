function loadPage(pageNumber) {
    
    console.log('Loading page' + pageNumber);
}

document.addEventListener('DOMContentLoaded',function(){

    const prevLink = document.getElementById('prev');
    const nextLink = document.getElementById('next');
    const currentPage = 1;

    prevLink.addEventListener('click', function(event){
        event.preventDefault();

        console.log('Ir a la pagina anterior');
    });

    nextLink.addEventListener('click', function(event) {
        event.preventDefault();

        console.log('Ir a la siguiente pagina');
    });
});