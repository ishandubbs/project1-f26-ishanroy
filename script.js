let pokemonId = 1;
let currentTab = "info";
let currentPokemon = null;

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
};

async function getPokemon() {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );

        if (!response.ok) {
            throw new Error("Pokemon not found.")
        }

        const data = await response.json();

        currentPokemon = data;

        document.getElementById("pokemon-name").textContent = data.name;

        document.getElementById("pokemon-img").src = data.sprites.front_default;

        const typesContainer = document.getElementById("pokemon-types");

        typesContainer.innerHTML = "";

        data.types.forEach(typeInfo => {
            const type = document.createElement("span");

            type.textContent = typeInfo.type.name;

            type.style.backgroundColor = typeColors[typeInfo.type.name];

            typesContainer.appendChild(type);
        });

        if (currentTab === "info") {
            showInfo();
        } else {
            showMoves();
        }
    } catch (error) {
        console.error(error);
    }
}

getPokemon();

function showInfo() {
    currentTab = "info";
    document.getElementById("info-button").classList.add("active");
    document.getElementById("moves-button").classList.remove("active");

    document.getElementById("panel-title").textContent = "Info";

    const statsPanel = document.getElementById("stats-panel");

    statsPanel.innerHTML = `
        <p>height: ${currentPokemon.height / 10}m</p>
        <p>weight: ${currentPokemon.weight / 10}kg</p>
        <p>hp: ${currentPokemon.stats[0].base_stat}</p>
        <p>attack: ${currentPokemon.stats[1].base_stat}</p>
        <p>defense: ${currentPokemon.stats[2].base_stat}</p>
        <p>special-attack: ${currentPokemon.stats[3].base_stat}</p>
        <p>special-defense: ${currentPokemon.stats[4].base_stat}</p>
        <p>speed: ${currentPokemon.stats[5].base_stat}</p>
    `;
}

function showMoves() {
    currentTab = "moves";
    document.getElementById("moves-button").classList.add("active");
    document.getElementById("info-button").classList.remove("active");

    document.getElementById("panel-title").textContent = "Moves";

    const statsPanel = document.getElementById("stats-panel");

    statsPanel.innerHTML = "";

    currentPokemon.moves.forEach(moveInfo => {
        const move = document.createElement("p");

        move.textContent = moveInfo.move.name;

        statsPanel.appendChild(move);
    });
}

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

document.getElementById("info-button").addEventListener("click", showInfo);
document.getElementById("moves-button").addEventListener("click", showMoves);