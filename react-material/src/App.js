import React from 'react';
// import Typography from '@mui/material/Typography';
import { Box, Tabs, Tab, Typography, AppBar, CssBaseline } from '@mui/material';
import MusicList from './MusicList';
import music_list from './data';
import SearchPage from './SearchPage';
import Favorites from './Favorites';

export default function App() {

    const [currentTab, setCurrentTab] = React.useState(0);
    const [searchResult, setSearchResult] = React.useState([]);
    const [likes, setLikes] = React.useState([]);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    }
    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Typography aling="center" variant="h3" color="inherit">
                    Kim's Favorite Music
                </Typography>
            </AppBar>
            <div style={{ height: 60, width: '100%' }}></div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentTab} onChange={handleTabChange} aria-label="basic tabs" centered>
                    <Tab label="Search Music" value={0} />
                    <Tab label="Favorites" value={1} />
                    <Tab label="Move Contents" value={2} />
                </Tabs>
            </Box>

            {currentTab == 0 && <SearchPage searchResult={searchResult} setSearchResult={setSearchResult} likes={likes} setLikes={setLikes} />}
            {currentTab == 1 &&
                <Favorites />}
            {currentTab == 2 &&
                <Typography align="center" variant="h2">Item Three</Typography>}
        </React.Fragment>
    )
}

