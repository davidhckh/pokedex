let minPokemonIdToShow = 1
let maxPokemonIdToShow = 30
let currentlyShowingAmount = 0
let allPokemonNames = []

async function loadAllNames(){
    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=1118'
    let response = await fetch(url)
    let responseAsJson = await response.json()

    for (let i = 0; i < responseAsJson.results.length; i++) {
        allPokemonNames.push(responseAsJson.results[i])
    }

    updateSearchPokemons()
}

function updateSearchPokemons() {
    const renderContainer = document.getElementById('pokedex-list-render-container')

    if(currentlyShowingAmount + minPokemonIdToShow <= maxPokemonIdToShow) {
        renderSearchPokemon(minPokemonIdToShow + currentlyShowingAmount)
        currentlyShowingAmount += 1
    }
}

async function renderSearchPokemon(id){
    let url = 'https://pokeapi.co/api/v2/pokemon/' + id
    let response = await fetch(url)
    let responseAsJson = await response.json()
        .then(responseAsJson => {
            const renderContainer = document.getElementById('pokedex-list-render-container')

            renderContainer.innerHTML +=    `<div class="pokemon-render-result-container container center column">
                                                <img class="search-pokemon-image" src="${responseAsJson.sprites.versions['generation-v']['black-white'].animated['front_default']}">
                                                <span class="bold font-size-12">N° ${id}</span>
                                                <h3>${capitalizeFirstLetter(responseAsJson.name)}</h3>
                                            </div>`
            
            updateSearchPokemons()
        })
}


/** load new pokemons when bottom is reached */
window.addEventListener('scroll', function(){
    if(window.scrollY + 100 >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
        maxPokemonIdToShow += 30
        updateSearchPokemons()
    }
})


/**capitalize first letter (mainly for payload) */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}