import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

const TrainerCard = ({ trainer }) => {

    return (
        <Card sx={{ m: 1 }}>
            <CardActionArea>
                <CardContent>
                    <p>{trainer["name"]}</p>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default TrainerCard
