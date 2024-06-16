import { useState, useEffect } from 'react';

export const MoviesList = ({ url }) => {
    const [movies, setMovies] = useState([]);
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
                const json = await response.json();
                setMovies(json.results);  
            } catch (err) {
                setError(err);
            }
        };

        fetchData();
    }, [url]);
    // Retorna o vetor de filmes e o erro
    return [movies, error];
};