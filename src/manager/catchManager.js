import { useState, useEffect, useContext } from 'react';
import PokemonContext from '../context/PokemonContext';

export function useCatchPokemon(pokemon, catchRate, isShiny, gender, image) {
    const [isCaught, setIsCaught] = useState(false);
    const [catchMessage, setCatchMessage] = useState('');
    const [hasEscaped, setHasEscaped] = useState(false);
    const { addPokemon } = useContext(PokemonContext);

    useEffect(() => {
        setHasEscaped(false);
        setIsCaught(false);
        setCatchMessage('');
    }, [pokemon, isShiny, gender]); // Added isShiny and gender to reset state when these change

    const POKEBALLS = {
        POKEBALL: { name: 'Pokeball', multiplier: 1 },
        SUPERBALL: { name: 'Superball', multiplier: 1.5 },
        ULTRABALL: { name: 'Ultraball', multiplier: 2 },
        MASTERBALL: { name: 'Masterball', multiplier: 255 }
    };

    const calculateCatchProbability = (ballType) => {
        if (!pokemon || !ballType ||    pokemon.catch_rate === null) return 0;

        const ball = POKEBALLS[ballType];
        if (!ball) return 0;

        if (ball.name === 'Masterball') return 1;

        const modifiedCatchRate = (pokemon.catch_rate * ball.multiplier) / 255;
        return Math.min(1, modifiedCatchRate);
    };

    const attemptCatch = (ballType) => {
        if (!ballType) {
            setCatchMessage('¡Selecciona una Pokeball!');
            return;
        }

        if (!pokemon) {
            setCatchMessage('¡Primero busca un Pokémon!');
            return;
        }
        
        // Reset escape state to allow multiple catch attempts
        setHasEscaped(false);

        const probability = calculateCatchProbability(ballType);
        const roll = Math.random();

        let name = pokemon.name
        const firstLetter = name.charAt(0)
        const firstLetterCap = firstLetter.toUpperCase()
        const remainingLetters = name.slice(1)
        name = firstLetterCap + remainingLetters

        if (roll < probability) {
            setIsCaught(true);
            setCatchMessage(`¡Felicidades! ¡Has capturado a ${name}!`);
            addPokemon(pokemon, isShiny, gender, image);
        } else {
            setHasEscaped(true);
            setCatchMessage(`¡${name} se ha escapado! Intenta con otra Pokeball.`);
        }
    };
    
    return {
        isCaught,
        catchMessage,
        hasEscaped,
        attemptCatch,
        POKEBALLS
    };
}