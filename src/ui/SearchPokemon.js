import { useState, useRef } from 'react';
import { usePokemon } from '../manager/pokemonManager';

export function SearchPokemon() {
    // Using useRef to prevent re-renders on each keystroke
    const nombrePokemonRef = useRef('');
    const [buscarPokemon, setBuscarPokemon] = useState('');
    
    const handleSearch = () => {
        setBuscarPokemon(nombrePokemonRef.current);
    };

    // Handle input change without triggering re-renders
    const handleInputChange = (e) => {
        nombrePokemonRef.current = e.target.value;
    };

    return {
        searchComponent: (
            <div className="flex flex-col sm:flex-row gap-2">
                <input 
                    className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="Introduce un Pokémon"
                    onChange={handleInputChange}
                    defaultValue={nombrePokemonRef.current}
                />
                <button 
                    onClick={handleSearch}
                    className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors font-semibold shadow-md whitespace-nowrap"
                >
                    Buscar
                </button>
            </div>
        ),
        buscarPokemon
    };
}