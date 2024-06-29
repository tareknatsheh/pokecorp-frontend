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
        let isMounted = true; // flag to check if the component is still mounted
    
        const getAllTrainers = async () => {
            try {
                const result = await fetch(`${apiUrl}/trainers`);
                if (!result.ok) {
                    throw new Error(`Error: ${result.statusText}`);
                }
                const data = await result.json();
                if (isMounted) {
                    setTrainers(data);
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
