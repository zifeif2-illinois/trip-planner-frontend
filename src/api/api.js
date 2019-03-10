import axios from 'axios'

const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const TYPE_BASE_URL = 'https://pokeapi.co/api/v2/type/';
const ITEM_BASE_URL = 'https://pokeapi.co/api/v2/item/';

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
  let url = `${POKEMON_BASE_URL}?offset=60&limit=100`;

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

export function getAllFilterAttributes() {
  return Promise.all([axios.get(`${TYPE_BASE_URL}`), axios.get(`${ITEM_BASE_URL}`)]).then((response) => {
    let types = response[0].data['results'].map(result => result.name)
    let items = response[1].data['results'].map(result => result.name)
    return {types, items}
  }).catch((error) => {
    console.log(error)
  })
}
