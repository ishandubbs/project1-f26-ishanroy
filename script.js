let pokemonId = 1;

const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC"
}

async function getPokemon() {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    const data = await response.json();

    document.getElementById("pokemon-name").textContent = data.name;

    document.getElementById("pokemon-img").src = data.sprites.front_default;

    const typesContainer = document.getElementById("pokemon-types");

    typesContainer.innerHTML = "";

    data.types.forEach(typeInfo => {
        const type = document.createElement("span");

        type.textContent = typeInfo.type.name;

        type.style.backgroundColor = typeColors[typeInfo.type.name];

        typesContainer.appendChild(type);
    })
}

getPokemon();

document.getElementById("next-button").addEventListener("click", () => {
    pokemonId++;
    getPokemon();
});

document.getElementById("previous-button").addEventListener("click", () => {
    if (pokemonId > 1) {
        pokemonId--;
        getPokemon();
    }
});