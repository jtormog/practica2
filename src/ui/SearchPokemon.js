import { useState } from 'react';
import { usePokemon } from '../manager/pokemonManager';

export function SearchPokemon() {
    const [nombrePokemon, setNombrePokemon] = useState('');
    const [buscarPokemon, setBuscarPokemon] = useState('');
    
    const handleSearch = () => {
        setBuscarPokemon(nombrePokemon);
    };

    return {
        searchComponent: (
            <div className="flex flex-col sm:flex-row gap-2">
                <input 
                    className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="Introduce un Pokémon"
                    onChange={(e) => setNombrePokemon(e.target.value)}
                    value={nombrePokemon}
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