function openInfo(id) {
    document.getElementById('current-pokemon-empty').classList.add('hide')

    slideOutPokemonInfo()

    setTimeout(function(){
        fetchPokemonInfo(id)
        updateCurrentPokemonImage(id)
    }, 350)
}

async function fetchPokemonInfo(id) {
    const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/' + id
    const urlSpecies = 'https://pokeapi.co/api/v2/pokemon-species/' + id
    const responsePokemon = await fetch(urlPokemon)
    const responseSpecies = await fetch(urlSpecies)
    
    const pokemon = await responsePokemon.json()
    const species = await responseSpecies.json()

    const reponseEvolutions = await fetch(species.evolution_chain.url)
    const evolutions = await reponseEvolutions.json()

    slideInPokemonInfo()
    setupPokemonInfo(pokemon, species, evolutions)
}
 
function setupPokemonInfo(pokemon, species, evolutions) {
    document.getElementById('current-pokemon-info').classList.remove('hide')
    document.getElementById('current-pokemon-id').innerHTML = 'N° ' + pokemon.id
    document.getElementById('current-pokemon-name').innerHTML = dressUpPayloadValue(pokemon.name)
    document.getElementById('current-pokemon-types').innerHTML = getTypeContainers(pokemons[pokemon.id].types)
    document.getElementById('current-pokemon-height').innerHTML = pokemon.height / 10 + 'm'
    document.getElementById('current-pokemon-weight').innerHTML = pokemon.weight / 10 + 'kg'

    /**abilities */
    document.getElementById('current-pokemon-abilitiy-0').innerHTML = dressUpPayloadValue(pokemon.abilities[0].ability.name)
    if(pokemon.abilities[1]){
        document.getElementById('current-pokemon-abilitiy-1').classList.remove('hide')
        document.getElementById('current-pokemon-abilitiy-1').innerHTML = dressUpPayloadValue(pokemon.abilities[1].ability.name)
    } else {
        document.getElementById('current-pokemon-abilitiy-1').classList.add('hide')
    }

    /**description */
    for(i = 0; i < species.flavor_text_entries.length; i++) {
        if(species.flavor_text_entries[i].language.name == 'en'){
            document.getElementById('current-pokemon-description').innerHTML = dressUpPayloadValue(species.flavor_text_entries[i].flavor_text.replace('', ' '))
            break
        }
    }

    console.log(pokemon)
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


function slideOutPokemonInfo(){
    document.getElementById('current-pokemon-container').classList.remove('slide-in')
    document.getElementById('current-pokemon-container').classList.add('slide-out')
}

function slideInPokemonInfo(){
    document.getElementById('current-pokemon-container').classList.replace('slide-out', 'slide-in')
}