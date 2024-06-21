import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';


const apiUrl = process.env.REACT_APP_API_URL;

const TrainersList = () => {
    const [trainers, setTrainers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAllTrainers = async () => {
            try {
                let result = await fetch(`${apiUrl}/trainers`)
                if (!result.ok) {
                    throw new Error(`Error: ${result.statusText}`);
                }
                result = await result.json();
                setTrainers(result)
                setError(null);
            } catch (err) {
                setError(err.message);
            }
        }
        getAllTrainers()
    }, [])


    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}
            <Box sx={{ display: 'inline-flex', flexWrap: 'wrap' }}>
                <List sx={{ bgcolor: 'background.paper' }}>
                    {
                        trainers.length !== 0 && trainers.map(tr =>
                            <ListItem key={tr["id"]}>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar alt="Pokemon trainer img" src="/trainer.png" />
                                    </ListItemAvatar>
                                    <ListItemText primary={tr["name"] + " - " + tr["town"]} />
                                </ListItemButton>
                            </ListItem>
                        )
                    }
                </List>
            </Box>
        </>
    )
}

export default TrainersList
