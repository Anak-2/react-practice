import React from 'react';
// import { Card, CardContent, Typography } from '@mui/material';
import { Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import SnackMsg from './SnackMsg';

export default function MusicList({ searchResult, setSearchResult, likes, setLikes }) {
    const styles = {
        content: {},
        layout: {
            display: 'flex',
            justifyContent: 'center'
        },
        card: {
            minWidth: 275,
            maxWidth: 600,
            marginBottom: "20pt",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    };
    let [snackState, setSnackState] = React.useState({ open: false, msg: '' })

    const toggleFavorite = (item) => () => {
        let isPresent = false;

        // handle favorite with backend (only add func)
        fetch(`likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
            }).catch(e => console.log('error when access to server'));

        setLikes({ ...likes, [item.collectionId]: !likes[item.collectionId] });
        setSnackState({ ...snackState, open: true, msg: `${item.artistName} is clicked` })
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackState({ open: false, msg: '' });
    }


    return (
        <div>
            {
                searchResult.map(item => {
                    return (
                        <Card sx={styles.card} key={item.collectionId}>
                            <CardContent>
                                <Typography variant="subtitle1">{item.artistName}</Typography>
                                <Typography variant="subtitle2">{item.collectionName}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={toggleFavorite(item)}>
                                    {(likes[item.collectionId] === true) ? <Favorite /> : <FavoriteBorder />}
                                </IconButton>
                            </CardActions>
                        </Card>
                    )
                })
            }
            <SnackMsg open={snackState.open} message={snackState.msg} onClose={handleSnackbarClose} />
        </div>
    )
}