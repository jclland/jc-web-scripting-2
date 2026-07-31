import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SearchForm from "./components/SearchForm.jsx";
import PokemonCard from "./components/PokemonCard.jsx";
import LoadingMessage from "./components/LoadingMessage.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import FavoritesList from "./components/FavoritesList.jsx";

function App() {
    //the pokemon that is currently being shown
    const [pokemon, setPokemon] = useState(null);

    //what to search for, defaults to pikachu so the page isnt empty on load
    const [searchTerm, setSearchTerm] = useState("pikachu");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //list of favorited pokemon, loads from localStorage if there is any saved
    const [favorites, setFavorites] = useState(() => {
        let saved = localStorage.getItem("savedFavorites");
        if (saved !== null) {
            return JSON.parse(saved);
        }
        return [];
    });

    //runs the fetch whenever searchTerm changes
    useEffect(() => {
        setLoading(true);
        setError("");

        fetch("https://pokeapi.co/api/v2/pokemon/" + searchTerm)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not find that pokemon.");
                }
                return response.json();
            })
            .then((data) => {
                setPokemon(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setPokemon(null);
                setLoading(false);
            });
    }, [searchTerm]);

    //save favorites to localStorage every time they change
    useEffect(() => {
        localStorage.setItem("savedFavorites", JSON.stringify(favorites));
    }, [favorites]);

    //called from SearchForm when the user hits search
    function handleSearch(term) {
        setSearchTerm(term);
    }

    //adds or removes the current pokemon from favorites
    function toggleFavorite(poke) {
        //check if its already in there
        let alreadyFav = false;
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id === poke.id) {
                alreadyFav = true;
                break;
            }
        }

        if (alreadyFav) {
            //remove it
            let updated = [];
            for (let i = 0; i < favorites.length; i++) {
                if (favorites[i].id !== poke.id) {
                    updated.push(favorites[i]);
                }
            }
            setFavorites(updated);
        } else {
            //add it
            setFavorites([...favorites, poke]);
        }
    }

    function removeFavorite(id) {
        let updated = [];
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id !== id) {
                updated.push(favorites[i]);
            }
        }
        setFavorites(updated);
    }

    //checks if the pokemon currently shown is already favorited
    function checkIsFavorite() {
        if (pokemon === null) return false;
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id === pokemon.id) {
                return true;
            }
        }
        return false;
    }

    return (
        <div className="app-container">
            <Header />

            <SearchForm onSearch={handleSearch} />

            {loading && <LoadingMessage />}

            {error && !loading && <ErrorMessage message={error} />}

            {pokemon && !loading && !error && (
                <PokemonCard
                    pokemon={pokemon}
                    isFavorite={checkIsFavorite()}
                    onToggleFavorite={toggleFavorite}
                />
            )}

            <FavoritesList
                favorites={favorites}
                onRemove={removeFavorite}
                onSelect={handleSearch}
            />

            <Footer />
        </div>
    );
}

export default App;
