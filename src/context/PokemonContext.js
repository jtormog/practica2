import { createContext, useReducer, useEffect } from 'react';
import { usePokemon } from '../manager/pokemonManager';
import { pokemonReducer, initialState, loadState, ADD_POKEMON, REMOVE_POKEMON } from '../reducers/PokemonReducer';

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  // Use useReducer with the pokemonReducer and load initial state from localStorage
  const [state, dispatch] = useReducer(pokemonReducer, loadState());
  const { pokemon, image, isShiny, gender, loading, error } = usePokemon('');
  
  // Sync state with localStorage whenever capturedPokemons changes
  useEffect(() => {
    localStorage.setItem('capturedPokemons', JSON.stringify(state.capturedPokemons));
  }, [state.capturedPokemons]);
  
  // Add a Pokemon to the captured list
  const addPokemon = (pokemon, isShiny, gender, image) => {
    dispatch({
      type: ADD_POKEMON,
      payload: { pokemon, isShiny, gender, image }
    });
  };
  
  // Remove a Pokemon from the captured list
  const removePokemon = (pokemonId) => {
    dispatch({
      type: REMOVE_POKEMON,
      payload: pokemonId
    });
  };
  
  return (
    <PokemonContext.Provider value={{
      pokemon, 
      image, 
      isShiny, 
      gender, 
      loading, 
      error, 
      capturedPokemons: state.capturedPokemons,
      addPokemon,
      removePokemon
    }}>
      {children}
    </PokemonContext.Provider>
  );
}

export default PokemonContext;