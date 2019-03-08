import axios from 'axios'

const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const TYPE_BASE_URL = 'https://pokeapi.co/api/v2/type/';

export function getPokemonDetail(index) {
  // Form the URL
  let url = `${POKEMON_BASE_URL}${index}/`;

  // GET some data back!
  return axios.get(url).then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error);
  });
}

function getPokemonList() {
  console.log("call getPokemonList")
  let url = `${POKEMON_BASE_URL}?offset=20&limit=10`;

  // GET some data back!
  return axios.get(url).then((response) => {
    return response.data['results']
  }).catch((error) => {
    console.log(error);
  });
}

function queryURL(url) {
  return axios.get(url).then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error);
  });
}

export function getAllPokemon() {
  return getPokemonList().then((listOfPokemon) => {
    let listOfPromise = listOfPokemon.map(pokemon => new Promise((resolve, reject) => {
      resolve(queryURL(pokemon['url']).then((pokemon) =>
       Object.assign(pokemon,
         {'types': pokemon.types.map(type=>type.type.name),
          'abilities': pokemon.abilities.map(ability=>ability.ability.name),
          'held_items': pokemon.held_items.map(item=>item.item.name)})))
    }))

    return Promise.all(listOfPromise).then(results => {
      return results
    })
  })
}

export function getAllTypes() {
  return axios.get(`${TYPE_BASE_URL}`).then((response) => {
    return response.data['results'].map(result => result.name)
  }).catch((error) => {
    console.log(error)
  })
}
