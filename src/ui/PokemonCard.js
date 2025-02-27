import clsx from "clsx"
import { SearchPokemon } from "./SearchPokemon"
import { useState } from "react"
import { usePokemon } from "../manager/pokemonManager"
import { CatchPokemonCard } from "./CatchPokemonCard"

export function PokemonCard() {
    const [showCapturedList, setShowCapturedList] = useState(false);
    const { searchComponent, buscarPokemon } = SearchPokemon();
    const { pokemon, image, isShiny, gender, loading, error } = usePokemon(buscarPokemon);
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6 space-y-4 border-2 border-blue-200">
                {searchComponent}
                {loading && <p className="text-center text-gray-600">Cargando...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {pokemon && (
                    <div className="text-center space-y-4">
                        <h1 className={clsx('text-2xl font-bold capitalize', { 'text-red-500': isShiny })}>
                            {isShiny ? '✨ ' : ''}{pokemon.name}<span className={clsx('font-mono text-[1.25rem] align-middle', gender === '♀' ? 'text-pink-700' : 'text-blue-700')}>{gender}</span>{isShiny ? ' ✨' : ''}
                        </h1>
                        <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 aspect-square transition-colors w-48 h-48 mx-auto flex items-center justify-center">
                            <img src={image} alt={pokemon.name} className="w-full h-full object-contain" />
                        </div>
                        <p className="text-gray-600 font-medium">Altura: {(pokemon.height / 10)}m</p>
                        <p className="text-gray-600 font-medium">Peso: {(pokemon.weight / 10)}kg</p>
                        <CatchPokemonCard />
                    </div>
                )}
                <div className="flex justify-center">
                    <button
                        onClick={() => setShowCapturedList(true)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors font-semibold shadow-md"
                    >
                        Ver equipo Pokémon
                    </button>
                </div>
            </div>
        </div>
    )
}