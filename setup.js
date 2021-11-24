let currentPokemon = ''
let totalPokemon = 0
let minPokemonIdToShow = 1
let currentlyShowingAmount

async function fetchSetup(){
    let url = 'https://pokeapi.co/api/v2/pokemon/'
    let response = await fetch(url)
    let responseAsJson = await response.json()

    totalPokemon = responseAsJson.count
    addPokemonsToShow(20)
}

async function addPokemonsToShow(amount){

    for (let i = 0; i < amount; i++) {
        renderPokemon(minPokemonIdToShow + i)
    }

    minPokemonIdToShow += amount
}

async function renderPokemon(id){
    currentlyShowingAmount += 1

    let url = 'https://pokeapi.co/api/v2/pokemon/' + id
    let response = await fetch(url)
    let responseAsJson = await response.json()

    const renderContainer = document.getElementById('pokedex-list-render-container')

    renderContainer.innerHTML +=    `<div class="pokemon-render-result-container container center column">
                                        <img class="search-pokemon-image" src="${responseAsJson.sprites.versions['generation-v']['black-white'].animated['front_default']}">
                                        <span class="bold font-size-12">N° ${id}</span>
                                        <h3>${capitalizeFirstLetter(responseAsJson.name)}</h3>
                                    </div>`

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}