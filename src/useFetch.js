async function useFetch(URL, id){
    let data;
    try {
        if (!id.trim()) {
            console.error('Introduce el nombre de un pokémon');
            return;
        }
        const response = await fetch(URL + id.toLowerCase());
        if (!response.ok) {
            throw new Error('Pokemon no encontrado');
        }
        data = await response.json();
    } catch (error) {
        console.error('Error obteniendo el Pokémon:', error);
    }
    return data;
}