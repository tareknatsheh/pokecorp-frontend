import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

const allTypes = [
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

const PokemonDisplayFilter = ({ handleFilterChoice }) => {
    const [type, setType] = useState('grass');

    const handleSelect = (event) => {
        console.log(event.target.value);
        setType(event.target.value)
        handleFilterChoice(event.target.value)
    }

    return (
        <FormControl>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={handleSelect}
                defaultValue={type}
            >
                { allTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default PokemonDisplayFilter
