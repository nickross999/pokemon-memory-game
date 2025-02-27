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
    id: null,
  });

  useEffect(() => {
    setLoading(true);
    fetch(`${API_LINK}pokemon/${number}`)
      .then((response) => response.json())
      .then((data) =>
        setPokemon({
          name: data.name[0].toUpperCase() + data.name.slice(1),
          sprites: {
            normal: data.sprites.other["official-artwork"].front_default,
            shiny: data.sprites.other["official-artwork"].front_shiny,
          },
          index: data.id - 1,
        })
      )
      .then(() => setLoading(false));
  }, [number]);

  const handleClick = (e) => {
    callback(e);
  };

  return (
    <div key={id} className="card" onClick={handleClick} name={pokemon.name} id={pokemon.index}>
      {loading ? "Loading..." : pokemon.name}
      <img
        src={
          loading
            ? loadingGif
            : Math.floor(Math.random() * 64) > 0
            ? pokemon.sprites.normal
            : pokemon.sprites.shiny
        }
        alt={loading ? "loading" : pokemon.name}
        className="pokemon-image"
        onClick={null}
      />
    </div>
  );
}

export default Card;
