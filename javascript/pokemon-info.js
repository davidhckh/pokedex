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
    const evolution_chain = await reponseEvolutions.json()

    setupPokemonAbout(pokemon, species)
    setupPokemonStats(pokemon)
    setupPokemonAbilities(pokemon)
    setupEvolutionChain(evolution_chain)
    slideInPokemonInfo()
}

function updateCurrentPokemonImage(id) {
    /**adjust height to varying sprite dimensions ---> (to position directly above info) */
    const currentPokemonImage = document.getElementById('current-pokemon-image')
    const img = new Image()

    img.onload = function() {
        currentPokemonImage.src = this.src
        currentPokemonImage.style.height = this.height * 3 + 'px'
    }

    if(id >= 650) {
        img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/' + id + '.png'
    } else {
        img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' + id + '.gif'
    }
}

function setupPokemonAbout(pokemon, species) {
    document.getElementById('current-pokemon-info').classList.remove('hide')
    document.getElementById('current-pokemon-id').innerHTML = 'N° ' + pokemon.id
    document.getElementById('current-pokemon-name').innerHTML = dressUpPayloadValue(pokemon.name)
    document.getElementById('current-pokemon-types').innerHTML = getTypeContainers(pokemons[pokemon.id].types)
    document.getElementById('current-pokemon-height').innerHTML = pokemon.height / 10 + 'm'
    document.getElementById('current-pokemon-weight').innerHTML = pokemon.weight / 10 + 'kg'

    /**description */
    for(i = 0; i < species.flavor_text_entries.length; i++) {
        if(species.flavor_text_entries[i].language.name == 'en'){
            document.getElementById('current-pokemon-description').innerHTML = dressUpPayloadValue(species.flavor_text_entries[i].flavor_text.replace('', ' '))
            break
        }
    }
}

function setupPokemonStats(pokemon) {
    document.getElementById('current-pokemon-stats-atk').innerHTML = pokemon.stats[0].base_stat
    document.getElementById('current-pokemon-stats-hp').innerHTML = pokemon.stats[1].base_stat
    document.getElementById('current-pokemon-stats-def').innerHTML = pokemon.stats[2].base_stat
    document.getElementById('current-pokemon-stats-spa').innerHTML = pokemon.stats[3].base_stat
    document.getElementById('current-pokemon-stats-spd').innerHTML = pokemon.stats[4].base_stat
    document.getElementById('current-pokemon-stats-speed').innerHTML = pokemon.stats[5].base_stat
    document.getElementById('current-pokemon-stats-total').innerHTML = pokemon.stats[0].base_stat + pokemon.stats[1].base_stat + pokemon.stats[2].base_stat + pokemon.stats[3].base_stat + pokemon.stats[4].base_stat + pokemon.stats[5].base_stat
}

function setupPokemonAbilities(pokemon) {
    document.getElementById('current-pokemon-abilitiy-0').innerHTML = dressUpPayloadValue(pokemon.abilities[0].ability.name)
    if(pokemon.abilities[1]){
        document.getElementById('current-pokemon-abilitiy-1').classList.remove('hide')
        document.getElementById('current-pokemon-abilitiy-1').innerHTML = dressUpPayloadValue(pokemon.abilities[1].ability.name)
    } else {
        document.getElementById('current-pokemon-abilitiy-1').classList.add('hide')
    }

}

function setupEvolutionChain(evolution_chain) {

}


/**------------------------- Animations ---------------------------------------------------------------- */
function slideOutPokemonInfo(){
    document.getElementById('current-pokemon-container').classList.remove('slide-in')
    document.getElementById('current-pokemon-container').classList.add('slide-out')
}

function slideInPokemonInfo(){
    document.getElementById('current-pokemon-container').classList.replace('slide-out', 'slide-in')
}