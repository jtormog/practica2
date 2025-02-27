import { createContext } from 'react';
import { useFetch } from './useFetch';
import { GET_POKEMON_SPECIES_URL, GET_POKEMON_URL } from '../env_variables';

const PokemonContext = createContext();

const Pokemon = await useFetch(GET_POKEMON_URL, id);
const PokemonSpecies = await useFetch(GET_POKEMON_SPECIES_URL, id);

export function PokemonProvider({ children }) {
  return (
    <PokemonContext.Provider value={{Pokemon, PokemonSpecies}}>
      {children}
    </PokemonContext.Provider>
  );
}

export default PokemonContext;