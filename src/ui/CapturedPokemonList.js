import { useContext } from 'react';
import PokemonContext from '../context/PokemonContext';
import clsx from 'clsx';

export function CapturedPokemonList({ onClose }) {
    const { capturedPokemons, removePokemon } = useContext(PokemonContext);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
                    <h2 className="text-xl font-bold">Pokémon Capturados</h2>
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-gray-200 text-2xl"
                    >
                        &times;
                    </button>
                </div>
                
                <div className="overflow-y-auto p-4 flex-grow">
                    {capturedPokemons.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No has capturado ningún Pokémon todavía.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {capturedPokemons.map((pokemon) => (
                                <div 
                                    key={pokemon.id} 
                                    className="border rounded-lg p-4 flex flex-col items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <h3 className={clsx('text-lg font-bold capitalize', { 'text-red-500': pokemon.isShiny })}>
                                        {pokemon.isShiny ? '✨ ' : ''}{pokemon.name}
                                        <span className={clsx('font-mono text-[1rem] align-middle', 
                                            pokemon.gender === '♀' ? 'text-pink-700' : 
                                            pokemon.gender === '♂' ? 'text-blue-700' : '')}
                                        >
                                            {pokemon.gender}
                                        </span>
                                        {pokemon.isShiny ? ' ✨' : ''}
                                    </h3>
                                    
                                    <div className="bg-white rounded-lg p-2 my-2 w-32 h-32 flex items-center justify-center">
                                        <img src={pokemon.image} alt={pokemon.name} className="w-full h-full object-contain" />
                                    </div>
                                    
                                    <div className="text-sm text-gray-600 w-full">
                                        <p>Altura: {(pokemon.height / 10)}m</p>
                                        <p>Peso: {(pokemon.weight / 10)}kg</p>
                                        <p>Capturado: {formatDate(pokemon.captureDate)}</p>
                                    </div>
                                    
                                    <button
                                        onClick={() => removePokemon(pokemon.id)}
                                        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm transition-colors"
                                    >
                                        Liberar
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}