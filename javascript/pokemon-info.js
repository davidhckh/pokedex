function openInfo(id) {
    document.getElementById('current-pokemon-container').classList.remove('slide-in')
    document.getElementById('current-pokemon-container').classList.add('slide-out')
    document.getElementById('current-pokemon-empty').classList.add('hide')
    setTimeout(function(){
        slideOutCurrentPokemon()
        fetchPokemonInfo(id)
    }, 350)
}

async function fetchPokemonInfo(id) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + id
    let response = await fetch(url)
    setupPokemonInfo(await response.json())
    document.getElementById('current-pokemon-container').classList.replace('slide-out', 'slide-in')
}

function setupPokemonInfo(pokemonJson) {
    document.getElementById('current-pokemon-info').classList.remove('hide')

    document.getElementById('current-pokemon-id').innerHTML = 'N° ' + pokemonJson.id
    document.getElementById('current-pokemon-name').innerHTML = dressUpPayloadValue(pokemonJson.name)
    updateCurrentPokemonImage(pokemonJson.id)
}


function updateCurrentPokemonImage(id) {
    /** make some height and top style changes to adjust to varying sprite aspect ratios*/
    const currentPokemonImage = document.getElementById('current-pokemon-image')
    document.getElementById('current-pokemon-image').classList.remove('hide')
    const img = new Image()

    img.onload = function() {
        currentPokemonImage.src = this.src

        currentPokemonImage.style.width = this.width * 3 + 'px'

        const maxHeight = (window.innerHeight * 0.25) + 40

        if(this.height * 3 <= maxHeight) {
            currentPokemonImage.style.height = this.height * 3 + 'px'
            currentPokemonImage.style.top = 40 - (this.height * 3) + 'px'
        } else {
            currentPokemonImage.style.height = maxHeight + 'px'
            currentPokemonImage.style.top =  40 - maxHeight + 'px'
        }
    }

    if(id >= 650) {
        img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/' + id + '.png'
    } else {
        img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' + id + '.gif'
    }
}


function slideOutCurrentPokemon () {

}