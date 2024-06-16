import { useState, useEffect } from 'react';

export const GetMediaTrailer = ({ url }) => {
    const [trailer, setTrailer] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {   
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjQ1NGI1OWJiYTVjODUyY2M2MDk1YmE1NzQ2NzI1ZSIsInN1YiI6IjY2MTU5YmE1MDQ4NjM4MDE3YzFjODE4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nBhprPiOqS-L3mdofzOEqIwIj_12sxO-2nPKQ1dXId8'
                    }
                });

                if (!response.ok) {
                    throw new Error('Falha ao carregar os dados do filme');
                }

                const json = await response.json();
                setTrailer(json.results);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [url]);

    // Retorna um objeto com os dados do filme e o erro
    return { trailer, error };
};
