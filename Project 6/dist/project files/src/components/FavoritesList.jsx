//list of the pokemon the user favorited, shows under the main card
function FavoritesList(props) {
    const favorites = props.favorites;

    //if no favorites yet show a message instead of an empty box
    if (favorites.length === 0) {
        return (
            <div className="favorites-box">
                <h3>Favorites</h3>
                <p className="no-favs">no favorites yet, click "Add to Favorites" above</p>
            </div>
        );
    }

    return (
        <div className="favorites-box">
            <h3>Favorites</h3>
            <ul className="favorites-list">
                {favorites.map((fav) => (
                    <li key={fav.id} className="favorite-item">
                        <img src={fav.sprites.front_default} alt={fav.name} />
                        <span onClick={() => props.onSelect(fav.name)} className="fav-name">
                            {fav.name}
                        </span>
                        <button onClick={() => props.onRemove(fav.id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FavoritesList;
