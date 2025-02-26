import { useState, useEffect } from "react";
import "../css/Card.css";
import loadingGif from "../assets/loading.gif";

const API_LINK = "https://pokeapi.co/api/v2/";

function Card({ number, id, callback }) {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({
    name: "",
    sprites: {
      normal: null,
      shiny: null,
    },
  });

  useEffect(() => {
    fetch(`${API_LINK}pokemon/${number}`)
      .then((response) => response.json())
      .then((data) =>
        setPokemon({
          name: data.name,
          sprites: {
            normal: data.sprites.other["official-artwork"].front_default,
            shiny: data.sprites.other["official-artwork"].front_shiny,
          },
        })
      )
      .then(() => setLoading(false));
  }, [number]);

  const handleClick = () => {
    setLoading(true);
    callback();
  };

  return (
    <div key={id} className="card" onClick={handleClick}>
      {loading ? "Loading..." : pokemon.name}
      <img
        src={
          loading
            ? loadingGif
            : Math.floor(Math.random() * 64) === 63
            ? pokemon.sprites.shiny
            : pokemon.sprites.normal
        }
        alt={loading ? "loading" : pokemon.name}
        className="pokemon-image"
      />
    </div>
  );
}

export default Card;
