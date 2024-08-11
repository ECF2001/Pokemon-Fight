const obtenerFotos = (listaPokemon) => {
    const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
    return {
        bulbasaur: baseUrl + "1.png",
        ivysaur: baseUrl + "2.png",
        venusaur: baseUrl + "3.png",
        charmander: baseUrl + "4.png",
        charmeleon: baseUrl + "5.png",
        charizard: baseUrl + "6.png",
        squirtle: baseUrl + "7.png",
        wartortle: baseUrl + "8.png",
        blastoise: baseUrl + "9.png",
        caterpie: baseUrl + "10.png",
        metapod: baseUrl + "11.png",
        butterfree: baseUrl + "12.png",
        "roaring-moon": baseUrl + "1005.png",
        "great-tusk": baseUrl + "984.png",
        eternatus: baseUrl + "890.png",
        zacian: baseUrl + "888.png",
        dragapult: baseUrl + "887.png"
    }
}
module.exports = {
    obtenerFotos
}