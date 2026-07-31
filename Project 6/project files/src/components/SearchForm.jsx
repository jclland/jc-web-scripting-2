import { useState } from "react";

//controlled form for typing in a pokemon name or id number
function SearchForm(props) {
    //keeps track of what the user is typing
    const [searchInput, setSearchInput] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        //dont search if the box is empty
        if (searchInput.trim() === "") {
            return;
        }

        //send the search term up to App.jsx so it can fetch
        props.onSearch(searchInput.trim().toLowerCase());
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="ex: pikachu or 25"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;
