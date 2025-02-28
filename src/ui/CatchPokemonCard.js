import { useContext } from 'react';
import { useCatchPokemon } from '../manager/catchManager';
import PokemonContext from '../context/PokemonContext';

export function CatchPokemonCard({ pokemon, isShiny, gender, image }) {
    const { addPokemon } = useContext(PokemonContext);
    const catchRate = pokemon?.catch_rate; // Using the correct catch_rate property
    const { isCaught, catchMessage, hasEscaped, attemptCatch, POKEBALLS } = useCatchPokemon(pokemon, catchRate, isShiny, gender, image);

    return (
        <div className="mt-4 text-center space-y-4">
            {!isCaught ? (
                <div className="flex justify-center">
                    {Object.entries(POKEBALLS).map(([key, ball]) => (
                        <button
                            key={key}
                            onClick={() => attemptCatch(key)}
                            className={`${hasEscaped ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} aspect-square w-12 h-12 m-2 rounded-lg transition-colors font-semibold shadow-md text-sm`}
                            disabled={hasEscaped}
                        >
                           <img className='block m-auto ' src={`./${ball.name}.png`} alt={ball.name}></img> 
                        </button>
                    ))}
                </div>
            ) : (
                <></>
            )}
            {catchMessage && (
                <p className={`text-sm font-medium ${isCaught ? 'text-green-600' : 'text-red-600'}`}>
                    {catchMessage}
                </p>
            )}
        </div>
    );
}