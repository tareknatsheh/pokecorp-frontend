import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard';
import PokemonFilter from './PokemonFilter';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const apiUrl = process.env.REACT_APP_API_URL;

const PokemonsList = () => {
    const [poks, setPoks] = useState([])
    const [pokType, setPokType] = useState("grass")
    const [trainerId, setTrainerId] = useState(0)
    const [cache, setCache] = useState({})
    const [error, setError] = useState(null); // State to handle error
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(`In useEffect in PokemonsList, ${pokType} - ${trainerId}`);
        let isMounted = true; // flag to check if component is still mounted
        const getPokemonsData = async () => {
            try {
                const cacheName = `${pokType}-${trainerId}`;
                if (cache[cacheName]) {
                    console.log(`Found ${cacheName} in the cache`);
                    setPoks(cache[cacheName]);
                }
                else {
                    console.log(`Fetching ${cacheName}`);
                    setIsLoading(true);
                    const response = await fetch(`${apiUrl}/pokemons/?type=${pokType}&trainer_id=${trainerId}`);
                    // console.log(response);
                    if (!response.ok) {
                        if (response.status === 404) {
                            throw new Error(`No pokemons found.`);
                        }
                        throw new Error(`Error: ${response.statusText}`);
                    }
                    const result = await response.json();
                    if (isMounted) {
                        setIsLoading(false);
                        setPoks(result);
                        setCache(prevVal => ({ ...prevVal, [cacheName]: result }));
                        setError(null);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setIsLoading(false);
                }
            }
        };

        getPokemonsData();
        return () => {
            isMounted = false; // clean up the flag when component unmounts
        };
    }, [pokType, trainerId]);

    const handleFilterChange = (filterData) => {
        setError(null);
        setPokType(filterData["type"]);
        setTrainerId(filterData["chosenTrainerId"])
    }

    return (
        <>
            <PokemonFilter
                onFilterSubmit={handleFilterChange}
            />
            {isLoading && <p>Loading....</p>}
            {error && <Alert severity="error">{error}</Alert>}
            <Box sx={{ display: 'inline-flex', flexWrap: 'wrap' }}>
                {poks.length !== 0 && poks.map(pokemon => <PokemonCard key={pokemon["id"]} pokemon={pokemon} />)}
            </Box>
        </>
    )
}

export default PokemonsList
