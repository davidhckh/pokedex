let minPokemonIdToShow = 1
let maxPokemonIdToShow = 30
let currentlyShowingAmount = 0

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
    'shadow':'#0E2E4C'
}

function updatePokemonList() {
    if(currentlyShowingAmount + minPokemonIdToShow <= maxPokemonIdToShow) {
        renderPokemonListItem(minPokemonIdToShow + currentlyShowingAmount)
    }
}

function renderPokemonListItem(id) {
    document.getElementById('pokedex-list-render-container').insertAdjacentHTML('beforeend',    `<div onclick="openInfo(${id})" class="pokemon-render-result-container container center column">
                                                                                                    <img class="search-pokemon-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
                                                                                                    <span class="bold font-size-12">N° ${id}</span>
                                                                                                    <h3>${dressUpPayloadValue(pokemons[id].name)}</h3>
                                                                                                    ${getTypeContainers(pokemons[id].types)}
                                                                                                </div>`)

    currentlyShowingAmount += 1

    updatePokemonList()
}

function getTypeContainers(typesArray){
    let htmlToReturn = '<div class="row">'

    for (let i = 0; i < typesArray.length; i++) {
        htmlToReturn +=     `<div class="type-container" style="background: ${typeColors[typesArray[i]]};">
                                ${dressUpPayloadValue(typesArray[i])}
                            </div>`
    }

    return htmlToReturn + '</div>'
}

function increasePokemonToShow(by) {
    if(maxPokemonIdToShow + by < 898) {
        maxPokemonIdToShow += by
    } else {
        maxPokemonIdToShow = 898
    }
}



/**add new pokemons when scroll bottom is reached */
window.addEventListener('scroll', function(){
    if(window.scrollY + 100 >= document.documentElement.scrollHeight - document.documentElement.clientHeight && currentlyShowingAmount + minPokemonIdToShow >= maxPokemonIdToShow) {
        increasePokemonToShow(30)
        updatePokemonList()
    }
})






function dressUpPayloadValue(string) {
    var splitStr = string.toLowerCase().split(' ')
    var splitStr = string.toLowerCase().split('-')
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    return splitStr.join(' ')
}