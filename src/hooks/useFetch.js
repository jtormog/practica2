import { useState, useEffect } from 'react';

export function useFetch(URL, id) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Reset states when id changes
        setData(null);
        setError(null);
        
        // Validate id
        if (!id || !id.trim()) {
            setError('');
            return;
        }
        
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(URL + id.toLowerCase());
                if (!response.ok) {
                    throw new Error('Pokemon no encontrado');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message || 'Error obteniendo el Pokémon');
                console.error('Error obteniendo el Pokémon:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [URL, id]);

    return { data, loading, error };
}