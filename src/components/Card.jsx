import { useState, useEffect } from "react";
import "../css/Card.css";
import loadingGif from "../assets/loading.gif";
import specialPokemonNames from "./specialPokemonNames";

const API_LINK = "https://pokeapi.co/api/v2/";

function Card({ number, id, hardMode, callback }) {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({
    name: "",
    sprites: {
      normal: null,
      shiny: null,
    },
    id: null,
  });

  const sanitizePokemonName = (name, index) => {
    //special cases
    if (specialPokemonNames[index]) {
      return specialPokemonNames[index];
    }
    //normal cases
    let sanitizedName = name;
    if (index !== 782 && index !== 783 && index !== 784) {
      sanitizedName = sanitizedName.replace(/-/, " ");
    }
    sanitizedName = sanitizedName.split(" ");
    sanitizedName = sanitizedName.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return sanitizedName.join(" ");
  };

  useEffect(() => {
    setLoading(true);
    let pokemon = {
      name: "",
      sprites: {
        normal: [],
        shiny: [],
      },
      index: null,
    };
    fetch(`${API_LINK}pokemon-species/${number}`)
      .then((response) => response.json())
      .then((data) => {
        pokemon.name = sanitizePokemonName(data.name, data.id);
        pokemon.index = data.id - 1;
        data.varieties.map((form) => {
          const id = form.pokemon.url.slice(34, -1);
          pokemon.sprites.normal.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`)
          pokemon.sprites.shiny.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`)
        })
      })
      .then(() => setPokemon(pokemon))
      .then(() => setLoading(false));
  }, [number]);

  const handleClick = (e) => {
    callback(e);
  };

  const getRandomSprite = (spriteArray) => {
    return hardMode ? spriteArray[Math.floor(Math.random() * spriteArray.length)] : spriteArray[0];
  };

  return (
    <div
      key={id}
      className="card"
      onClick={handleClick}
      name={pokemon.name}
      id={pokemon.index}
    >
      {loading ? "Loading..." : pokemon.name}
      <img
        src={
          loading
            ? loadingGif
            : Math.floor(Math.random() * 1024) > 0
            ? getRandomSprite(pokemon.sprites.normal)
            : getRandomSprite(pokemon.sprites.shiny)
        }
        alt={loading ? "loading" : pokemon.name}
        className="pokemon-image"
        onClick={null}
      />
    </div>
  );
}

export default Card;
