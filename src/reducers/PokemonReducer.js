export const ADD_POKEMON = 'ADD_POKEMON';
export const REMOVE_POKEMON = 'REMOVE_POKEMON';

export const initialState = {
  capturedPokemons: []
};

export const loadState = () => {
  try {
    const storedPokemons = localStorage.getItem('capturedPokemons');
    if (storedPokemons === null) {
      return initialState;
    }
    return { capturedPokemons: JSON.parse(storedPokemons) };
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return initialState;
  }
};

export const pokemonReducer = (state, action) => {
  switch (action.type) {
    case ADD_POKEMON:
      const captureDate = new Date();
      const newPokemon = {
        id: `${action.payload.pokemon.name}-${Date.now()}`,
        name: action.payload.pokemon.name,
        height: action.payload.pokemon.height,
        weight: action.payload.pokemon.weight,
        isShiny: action.payload.isShiny,
        gender: action.payload.gender,
        image: action.payload.image,
        captureDate: captureDate.toISOString(),
      };
      return {
        ...state,
        capturedPokemons: [...state.capturedPokemons, newPokemon]
      };
    case REMOVE_POKEMON:
      return {
        ...state,
        capturedPokemons: state.capturedPokemons.filter(pokemon => pokemon.id !== action.payload)
      };
    default:
      return state;
  }
};