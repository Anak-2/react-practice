import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import SnackMsg from './SnackMsg';

export default function Favorites() {
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
    const [likes, setDisLikes] = React.useState({});
    const [list, setList] = React.useState([]);
    let [snackState, setSnackState] = React.useState({ open: false, msg: '' });

    const getFavoriteList = () => {
        fetch(`likes`)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setList(response);
            }).catch(e => console.log('error when access to server'));
    }

    React.useEffect(() => {
        getFavoriteList();
    }, []);

    const toggleFavorite = (item) => () => {
        // handle favorite with backend (only delete func)
        console.log(item.collectionId);
        fetch(`likes/${item.collectionId}`, {
            method: 'DELETE'
        }).then(() => {
            setDisLikes({ ...likes, [item.collectionId]: !likes[item.collectionId] });
            setSnackState({ ...snackState, open: true, msg: `${item.artistName} is clicked` })
            getFavoriteList();
        })
            .catch(e => console.log('error when access to server'));
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
                list.map(item => {
                    return (
                        <Card sx={styles.card} key={item.collectionId}>
                            <CardContent>
                                <Typography variant="subtitle1">{item.artistName}</Typography>
                                <Typography variant="subtitle2">{item.collectionName}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={toggleFavorite(item)}>
                                    {(likes[item.collectionId] === true) ? <FavoriteBorder /> : <Favorite />}
                                </IconButton>
                            </CardActions>
                        </Card>
                    )
                })}
            <SnackMsg open={snackState.open} message={snackState.msg} onClose={handleSnackbarClose} />
        </div>
    )
}