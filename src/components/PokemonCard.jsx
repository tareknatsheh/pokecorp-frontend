import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const apiUrl = process.env.REACT_APP_API_URL;

const PokemonCard = ({ pokemon }) => {

    return (
        <Card sx={{ m: 1, minWidth: 120, maxWidth: 150 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={`${apiUrl}/pokemons/images/${pokemon["id"]}`}
                />
                <CardContent>
                    <p>{pokemon["name"]}</p>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default PokemonCard
