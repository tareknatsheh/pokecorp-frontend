import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard';
import PokemonDisplayFilter from './PokemonDisplayFilter';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const apiUrl = process.env.REACT_APP_API_URL;

const PokemonsList = () => {
    const [poks, setPoks] = useState([])
    const [pokType, setPokType] = useState("grass")
    const [error, setError] = useState(null); // State to handle error

    useEffect(() => {
        const getPokemonsData = async () => {
            try {
                let result = await fetch(`${apiUrl}/pokemons/?type=${pokType}`);
                if (!result.ok) {
                    throw new Error(`Error: ${result.statusText}`); // Throw an error if response is not ok
                }
                result = await result.json();
                setPoks(result);
                setError(null); // Reset error state if fetch is successful
            } catch (err) {
                setError(err.message); // Set error state if fetch fails
            }
        }
        getPokemonsData()
    }, [pokType])


    return (
        <>
            <PokemonDisplayFilter handleFilterChoice={(value) => {setPokType(value)}} />
            {error && <Alert severity="error">{error}</Alert>} {/* Display error message */}
            <Box sx={{ display: 'inline-flex', flexWrap: 'wrap' }}>
                {poks.length !== 0 && poks.map(pokemon => <PokemonCard key={pokemon["id"]} pokemon={pokemon} />)}
            </Box>
        </>
    )
}

export default PokemonsList
