import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';

const apiUrl = process.env.REACT_APP_API_URL;

const allTypes = [
    "all",
    "grass",
    "poison",
    "fire",
    "flying",
    "water",
    "bug",
    "normal",
    "electric",
    "ground",
    "fairy",
    "fighting",
    "psychic",
    "rock",
    "steel",
    "ice",
    "ghost",
    "dragon"
]

const PokemonFilter = ({ onFilterSubmit }) => {
    const [type, setType] = useState('all');
    const [chosenTrainerId, setChosenTrainerId] = useState(0);

    const [trainers, setTrainers] = useState([{ "id": 0, "name": "all" }]);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // flag to check if the component is still mounted

        const getAllTrainers = async () => {
            try {
                const result = await fetch(`${apiUrl}/trainers`);
                if (!result.ok) {
                    throw new Error(`Error: ${result.statusText}`);
                }
                const data = await result.json();

                if (isMounted) {
                    setTrainers([{ "id": 0, "name": "all" }, ...data]);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                }
            }
        };

        getAllTrainers();

        return () => {
            isMounted = false; // Cleanup the flag when component unmounts
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        onFilterSubmit({ type, chosenTrainerId });
    };

    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 2 }}>
                <FormControl sx={{ mx: 1 }}>
                    <InputLabel id="select-by-type">Type</InputLabel>
                    <Select
                        labelId="select-by-type"
                        value={type}
                        label="Type"
                        onChange={(event) => setType(event.target.value)}
                        defaultValue={type}
                    >
                        {allTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                    </Select>
                </FormControl>

                {trainers.length && <FormControl sx={{ mx: 1, minWidth: 100 }}>
                    <InputLabel id="select-by-trainer">Trainer</InputLabel>
                    <Select
                        labelId="select-by-trainer"
                        value={chosenTrainerId ? chosenTrainerId : 0}
                        label="Trainer"
                        onChange={(event) => setChosenTrainerId(event.target.value)}
                        defaultValue={chosenTrainerId ? chosenTrainerId : 0}
                    >
                        {trainers.map(tr => <MenuItem key={tr["id"]} value={tr["id"]}>{tr["name"]}</MenuItem>)}
                    </Select>
                </FormControl>
                }
                <Button type="submit" variant="contained" color="primary">
                    Filter
                </Button>
            </Box>
        </>
    )
}

export default PokemonFilter
