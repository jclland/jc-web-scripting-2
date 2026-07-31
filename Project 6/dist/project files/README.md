# PokeLookup | Final Project

## What it does
Lets you search for a pokemon by name or id number and shows its picture, type,
height, weight, and base stats. You can also save pokemon to a favorites list
that stays saved even if you refresh the page.

## Option chosen
Option 1 - API-Powered React App (uses the PokeAPI: https://pokeapi.co)

## Features completed
- fetch with useEffect (fetches on load and every time you search)
- loading state
- error state (shows a message if the pokemon isnt found)
- state and events (search form, favorite button, remove button)
- conditional rendering (loading / error / card / empty favorites)
- props and reusable components (PokemonCard, FavoritesList, etc)
- custom CSS styling
- 7 components total (App, Header, Footer, SearchForm, PokemonCard,
  LoadingMessage, ErrorMessage, FavoritesList)

## Known issues
- if you search a pokemon that doesnt exist it just shows the error message,
  no suggestions or anything

## How to run
```
npm install
npm run dev
```
