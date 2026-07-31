//shows all the info for the pokemon that was searched
function PokemonCard(props) {
    const pokemon = props.pokemon;

    //build a string of all the types like "grass / poison"
    let typeText = "";
    for (let i = 0; i < pokemon.types.length; i++) {
        typeText += pokemon.types[i].type.name;
        if (i < pokemon.types.length - 1) {
            typeText += " / ";
        }
    }

    return (
        <div className="pokemon-card">
            <h2 className="pokemon-name">
                #{pokemon.id} {pokemon.name}
            </h2>

            <img src={pokemon.sprites.front_default} alt={pokemon.name} />

            <p className="pokemon-type">Type: {typeText}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>

            <div className="stats-box">
                {pokemon.stats.map((s) => (
                    <p key={s.stat.name}>
                        {s.stat.name}: {s.base_stat}
                    </p>
                ))}
            </div>

            <button className="fav-btn" onClick={() => props.onToggleFavorite(pokemon)}>
                {props.isFavorite ? "Remove Favorite" : "Add to Favorites"}
            </button>
        </div>
    );
}

export default PokemonCard;
