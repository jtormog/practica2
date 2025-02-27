import { createContext, useState } from 'react';
import { usePokemon } from '../manager/pokemonManager';

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemonList, setPokemonList] = useState([]);
  const { pokemon, image, isShiny, gender, loading, error } = usePokemon('');
  
  const addPokemon = (pokemon, isShiny, gender, image) => {
    setPokemonList(prevList => [...prevList, { pokemon, isShiny, gender, image }]);
  };
  
  return (
    <PokemonContext.Provider value={{pokemon, image, isShiny, gender, loading, error, pokemonList, setPokemonList, addPokemon}}>
      {children}
    </PokemonContext.Provider>
  );
}

export default PokemonContext;