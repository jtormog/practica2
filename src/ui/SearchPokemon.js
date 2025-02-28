import { useRef, useState } from 'react';

export function SearchPokemon({ onSearch }) {
    const pokemonRef = useRef(null);
    const [searchTimestamp, setSearchTimestamp] = useState(Date.now());

    const handleSearch = () => {
        const pokemonName = pokemonRef.current.value.toLowerCase();
        //al intentar buscar dos veces al mismo pokemon la llamada a la API no se realiza, por lo que se añade un timestamp para que se realice la llamada
        setSearchTimestamp(Date.now());
        onSearch(pokemonName + `?t=${searchTimestamp}`);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-2">
            <input
                className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Introduce un Pokémon"
                ref={pokemonRef}
            />
            <button
                onClick={handleSearch}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors font-semibold shadow-md whitespace-nowrap"
            >
                Buscar
            </button>
        </div>
    );
}
