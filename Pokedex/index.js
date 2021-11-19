'use strict'
comenzar();
const pokeApi = 'https://pokeapi.co/api/v2/pokemon/';
const pokeName = document.getElementById('pokemon-name');
const atrapaloBtn = document.getElementById('atrapalo-btn');
const pokemonDisplayData = document.getElementById('pokemon-display-data');
const historialList = document.getElementById('historial');
const clearHistorial= document.getElementById('clear-historial');
const errorMessage = document.getElementById('error-message');
const consultasHistoricas = [];


const handleApi = async () => {
    const response = await fetch (pokeApi + pokeName.value.toLowerCase());
    const pokemonData = await response.json(); 
    // console.log(pokemonData);
    displayData(pokemonData);
}

const displayData = (data) => {
    pokemonDisplayData.innerHTML = ` 
    <img src= ${data.sprites.front_default}>
    <h2>${data.name.toUpperCase()}</h2>
    <p>Nº Pokedex: ${data.id}</p>
    <p>Tipo: ${data.types[0].type.name.toUpperCase()}</p>
    `;
    let date = new Date();
    consultasHistoricas.push({Nombre: data.name, Numero: data.id, Time: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`});
    const historialJson = JSON.stringify(consultasHistoricas);
    localStorage.setItem("showHistorial", historialJson);
    showHistorial();
}



const showHistorial = () => {
    historialList.innerHTML = ' ';
    const listaPokemonJson = localStorage.getItem('showHistorial');
    const listaPokemon = JSON.parse(listaPokemonJson);
    listaPokemon.forEach(function(element){
        historialList.innerHTML += `<li>${element.Nombre.toUpperCase()} #${element.Numero} ${element.Time}</li>`;
        console.log(element)
    });
  

}

function comenzar() {
    window.onload = () => {
        showHistorial();
    } 
}



//INVOCAR FUNCIONES
atrapaloBtn.addEventListener('click', handleApi);