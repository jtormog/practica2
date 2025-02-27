import { createContext, useReducer, useEffect } from 'react';
import { usePokemon } from '../manager/pokemonManager';
import { pokemonReducer, loadState, ADD_POKEMON, REMOVE_POKEMON } from '../reducers/PokemonReducer';

const PokemonContext = createContext();

export function PokemonProvider({ children }) {

  const [state, dispatch] = useReducer(pokemonReducer, loadState());
  const { pokemon, image, isShiny, gender, loading, error, catch_rate } = usePokemon('');
  
  useEffect(() => {
    localStorage.setItem('capturedPokemons', JSON.stringify(state.capturedPokemons));
  }, [state.capturedPokemons]);
  
  const addPokemon = (pokemon, isShiny, gender, image) => {
    dispatch({
      type: ADD_POKEMON,
      payload: { pokemon, isShiny, gender, image }
    });
  };
  
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
      catch_rate,
      capturedPokemons: state.capturedPokemons,
      addPokemon,
      removePokemon
    }}>
      {children}
    </PokemonContext.Provider>
  );
}

export default PokemonContext;