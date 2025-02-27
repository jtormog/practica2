import { GET_POKEMON_SPECIES_URL, GET_POKEMON_URL } from "../env_variables";
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

export function usePokemon(pokemonId) {
    const [pokemon, setPokemon] = useState(null);
    const [isShiny, setIsShiny] = useState(false);
    const [gender, setGender] = useState('');
    const [image, setImage] = useState('');
    
    const { data: dataPokemon, loading: loadingPokemon, error: errorPokemon } = useFetch(GET_POKEMON_URL, pokemonId);
    const { data: dataPokemonSpecies, loading: loadingSpecies, error: errorSpecies } = useFetch(GET_POKEMON_SPECIES_URL, pokemonId);

    useEffect(() => {
        if (dataPokemonSpecies) {
            const genderRate = dataPokemonSpecies.gender_rate;
            if (genderRate === -1) {
                setGender('');
            } else {
                const femaleChance = (genderRate / 8) * 100;
                const randomNumber = Math.random() * 100;
                setGender(randomNumber < femaleChance ? '♀' : '♂');
            }
        }
    }, [dataPokemonSpecies]);

    useEffect(() => {
        if (dataPokemon) {
            const shinyNumber = 1;
            const shinyChances = 8192; //8192 ratio original
            const generateRandomNumber = Math.floor(Math.random() * shinyChances + 1);
            
            setIsShiny(generateRandomNumber === shinyNumber);
        }
    }, [dataPokemon]);

    useEffect(() => {
        if (dataPokemon) {
            let spriteToUse = '';
            if (isShiny) {
                if (gender === '♀' && dataPokemon.sprites.front_shiny_female) {
                    spriteToUse = dataPokemon.sprites.front_shiny_female;
                } else if (gender === '♂' && dataPokemon.sprites.front_shiny) {
                    spriteToUse = dataPokemon.sprites.front_shiny;
                } else {
                    spriteToUse = dataPokemon.sprites.front_shiny;
                }
            } else {
                if (gender === '♀' && dataPokemon.sprites.front_female) {
                    spriteToUse = dataPokemon.sprites.front_female;
                } else if (gender === '♂' && dataPokemon.sprites.front_default) {
                    spriteToUse = dataPokemon.sprites.front_default;
                } else {
                    spriteToUse = dataPokemon.sprites.front_default;
                }
            }
            setImage(spriteToUse);
        }
    }, [dataPokemon, gender, isShiny]);

    useEffect(() => {
        if (dataPokemon && dataPokemonSpecies) {
            setPokemon({
                name: dataPokemon.name,
                height: dataPokemon.height,
                weight: dataPokemon.weight,
                gender: gender,
                isShiny: isShiny,
                sprites: dataPokemon.sprites
            });
        }
    }, [dataPokemon, dataPokemonSpecies, gender, isShiny]);

    return {
        pokemon,
        image,
        isShiny,
        gender,
        loading: loadingPokemon || loadingSpecies,
        error: errorPokemon || errorSpecies
    };
}