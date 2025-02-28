import { GET_POKEMON_SPECIES_URL, GET_POKEMON_URL } from "../env_variables";
import { useState, useEffect, useRef } from "react";
import { useFetch } from "../hooks/useFetch";

export function usePokemon(pokemonId) {
    const [pokemon, setPokemon] = useState(null);
    const [isShiny, setIsShiny] = useState(false);
    const [gender, setGender] = useState('');
    const [image, setImage] = useState('');
    
    const processedPokemonIdRef = useRef('');
    const processingRef = useRef(false);
    
    useEffect(() => {
        setPokemon(null);
        setIsShiny(false);
        setGender('');
        setImage('');
        processedPokemonIdRef.current = '';
        processingRef.current = false;
    }, [pokemonId]);
    
    const { data: dataPokemon} = useFetch(GET_POKEMON_URL, pokemonId);
    const { data: dataPokemonSpecies} = useFetch(GET_POKEMON_SPECIES_URL, pokemonId);

    useEffect(() => {
        if (pokemonId && pokemonId !== processedPokemonIdRef.current) {
            console.log('Se ha cambiado el id del Pokemon:', pokemonId);
        }
    }, [pokemonId]);

    useEffect(() => {
        if (dataPokemon && dataPokemonSpecies && pokemonId) {
            const cleanPokemonId = pokemonId.split('?')[0];
            
            if (dataPokemon.name === cleanPokemonId || dataPokemon.name === pokemonId) {
                processingRef.current = true;
                
                let newGender = '';
                const genderRate = dataPokemonSpecies.gender_rate;
                if (genderRate !== -1) {
                    const femaleChance = (genderRate / 8) * 100;
                    const randomNumber = Math.random() * 100;
                    newGender = randomNumber < femaleChance ? '♀' : '♂';
                }
                
                const shinyNumber = 1;
                const shinyChances = 8192; // 8192 ratio original
                const generateRandomNumber = Math.floor(Math.random() * shinyChances + 1);
                const newIsShiny = generateRandomNumber === shinyNumber;
                
                setGender(newGender);
                setIsShiny(newIsShiny);
                
                let spriteToUse = '';
                if (newIsShiny) {
                    if (newGender === '♀' && dataPokemon.sprites.front_shiny_female) {
                        spriteToUse = dataPokemon.sprites.front_shiny_female;
                    } else if (newGender === '♂' && dataPokemon.sprites.front_shiny) {
                        spriteToUse = dataPokemon.sprites.front_shiny;
                    } else {
                        spriteToUse = dataPokemon.sprites.front_shiny;
                    }
                } else {
                    if (newGender === '♀' && dataPokemon.sprites.front_female) {
                        spriteToUse = dataPokemon.sprites.front_female;
                    } else if (newGender === '♂' && dataPokemon.sprites.front_default) {
                        spriteToUse = dataPokemon.sprites.front_default;
                    } else {
                        spriteToUse = dataPokemon.sprites.front_default;
                    }
                }
                setImage(spriteToUse);
                
                console.log(`Se ha actualizado dataPokemon, se espera ${pokemonId}, se ha obtenido ${dataPokemon.name}`);
                setPokemon({
                    name: dataPokemon.name,
                    height: dataPokemon.height,
                    weight: dataPokemon.weight,
                    catch_rate: dataPokemonSpecies.capture_rate,
                    gender: newGender,
                    isShiny: newIsShiny,
                    sprites: dataPokemon.sprites
                });
                
                processedPokemonIdRef.current = pokemonId;
                processingRef.current = false;
            }
        }
    }, [dataPokemon, dataPokemonSpecies, pokemonId]);
    
    // Reset processing flag when pokemonId changes
    useEffect(() => {
        if (pokemonId !== processedPokemonIdRef.current) {
            processingRef.current = false;
        }
    }, [pokemonId]);
    
    // Add loading and error states from useFetch
    const { loading: pokemonLoading, error: pokemonError } = useFetch(GET_POKEMON_URL, pokemonId);
    const { loading: speciesLoading, error: speciesError } = useFetch(GET_POKEMON_SPECIES_URL, pokemonId);
    
    const loading = pokemonLoading || speciesLoading;
    const error = pokemonError || speciesError;

    return {
        pokemon,
        image,
        isShiny,
        gender,
        loading,
        error
    };
}