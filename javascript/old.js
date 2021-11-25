let minPokemonIdToShow = 1
let maxPokemonIdToShow = 30
let currentlyShowingAmount = 0
let allPokemonNames = []
let searchListHtmlToAdd= ''

const typeColors = {
    'normal':'#BCBCAC',
    'fighting':'#BC5442',
    'flying':'#669AFF',
    'poison':'#AB549A',
    'ground':'#DEBC54',
    'rock':'#BCAC66',
    'bug':'#ABBC1C',
    'ghost':'#6666BC',
    'steel':'#ABACBC',
    'fire':'#FF421C',
    'water':'#2F9AFF',
    'grass':'#78CD54',
    'electric':'#FFCD30',
    'psychic':'#FF549A',
    'ice':'#78DEFF',
    'dragon':'#7866EF',
    'dark':'#785442',
    'fairy':'#FFACFF',
    'shadow':'#0E2E4C',
}

async function getAllNames(){
    fetchJsonFromUrl('https://pokeapi.co/api/v2/pokemon/?limit=1118')
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
        updateSearchListLoadingProgress()
    }
}

function updateSearchListLoadingProgress() {
    const searchListPokeball = document.getElementById('pokedex-list-loading-ball')

    if(currentlyShowingAmount + minPokemonIdToShow <= maxPokemonIdToShow) {
        searchListPokeball.classList.remove('hide')
    } else {
        document.getElementById('pokedex-list-render-container').innerHTML += searchListHtmlToAdd
        searchListHtmlToAdd = ''
        searchListPokeball.classList.add('hide')
    }
}

async function renderSearchPokemon(id){
    let url = 'https://pokeapi.co/api/v2/pokemon/' + id
    let response = await fetch(url)
    let responseAsJson = await response.json()
        .then(responseAsJson => {
            searchListHtmlToAdd +=      `<div class="pokemon-render-result-container container center column">
                                            <img class="search-pokemon-image" src="${responseAsJson.sprites.versions['generation-v']['black-white']['front_default']}">
                                            <span class="bold font-size-12">N° ${id}</span>
                                            <h3>${capitalizeFirstLetter(responseAsJson.name)}</h3>
                                            ${getTypeContainers(responseAsJson.types)} 
                                        </div>`
            
            updateSearchPokemons()
        })
}

async function fetchJsonFromUrl(url) {
    return responseAsJson = await fetch(url).json
}

function getTypeContainers(typesArray){
    let htmlToReturn = '<div class="row">'

    for (let i = 0; i < typesArray.length; i++) {
        htmlToReturn +=     `<div class="type-container" style="background: ${typeColors[typesArray[i].type.name]};">
                                ${capitalizeFirstLetter(typesArray[i].type.name)}
                            </div>`
    }

    return htmlToReturn + '</div>'
}

function increasePokemonToShow(by) {
    if(maxPokemonIdToShow + by < 889) {
        maxPokemonIdToShow += by
    } else {
        maxPokemonIdToShow = 889
    }
}


/** load new pokemons when bottom is reached */
window.addEventListener('scroll', function(){
    if(window.scrollY + 100 >= document.documentElement.scrollHeight - document.documentElement.clientHeight && currentlyShowingAmount + minPokemonIdToShow >= maxPokemonIdToShow) {
        increasePokemonToShow(20)
        updateSearchPokemons()
    }
})


/**capitalize first letter (mainly for payload) */
function capitalizeFirstLetter(string) {
    var splitStr = string.toLowerCase().split(' ')
    var splitStr = string.toLowerCase().split('-')
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    return splitStr.join(' ')
}